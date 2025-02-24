import numpy as np
import telebot
import datetime
import sqlite3
import requests
from currency_converter import CurrencyConverter
import ccxt
import pandas as pd
'''нужно сделать, нормально реализовать UE и допустим вывод когда есть несколько значений'''



bot = telebot.TeleBot('6965692929:AAEJmkqjtpmYcdec1Tg_WN4N7Cqh8VxvBLM')
'''токен'''

'''глобальные переменные'''
user_name = ''

symbol = ''
days = 0

currency = CurrencyConverter()
amount = 0

info = ''
'''///глобальные переменные///'''

'''команды'''
@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, 'Добрый день!\nЯ - Алли,ваш персональный помощник в вопросах крипты/фиатной валют\n'
                                      'Нужно вас зарегистрировать, введите свое имя!')
    bot.register_next_step_handler(message, set_user_name)

def set_user_name(message):
    global user_name

    conn = sqlite3.connect('requests.db')
    cur = conn.cursor()

    cur.execute('CREATE TABLE IF NOT EXISTS requests (id int auto_increment primary key, requester_name varchar(50), request varchar(50))')
    conn.commit()

    cur.close()
    conn.close()

    user_name = message.text.strip()
    bot.send_message(message.chat.id, 'Еще раз приветствую {}, для списка команд введите "/".'.format(user_name))


@bot.message_handler(commands=['price'])
def price(message):
    markup = telebot.types.InlineKeyboardMarkup()
    btn1 = telebot.types.InlineKeyboardButton('Крипта', callback_data='crypto')
    btn2 = telebot.types.InlineKeyboardButton('Валюта', callback_data='currency')
    btn3 = telebot.types.InlineKeyboardButton('Отмена', callback_data='cancel')
    markup.add(btn1, btn2, btn3)
    bot.send_message(message.chat.id, 'О чем нужна информация?', reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data == 'cancel')
def cancel_operation(call):
    '''останавливает работу программы'''
    bot.send_message(call.message.chat.id, 'Операция отменена. Выберите новую операцию.')

def get_crypto_code(crypto_name):
    url = f'https://api.coingecko.com/api/v3/coins/markets'
    params = {
        'vs_currency': 'usd',
        'ids': crypto_name,
        'order': 'market_cap_desc',
        'per_page': 1,
        'page': 1,
        'sparkline': False
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            if data:
                return data[0]['symbol'].upper()
    except requests.exceptions.RequestException as e:
        print(f'Ошибка при извлечении данных из Coingecko API: {e}')
    return None

@bot.callback_query_handler(func=lambda call: call.data == 'crypto')
def crypto_callback(call):
    markup = telebot.types.InlineKeyboardMarkup()
    btn1 = telebot.types.InlineKeyboardButton('Низкая цена', callback_data='low')
    btn2 = telebot.types.InlineKeyboardButton('Высокая цена', callback_data='high')
    btn3 = telebot.types.InlineKeyboardButton('Произвольная цена', callback_data='arbitrary')
    btn4 = telebot.types.InlineKeyboardButton('Отмена', callback_data='cancel')
    markup.add(btn1, btn2, btn3, btn4)
    bot.send_message(call.message.chat.id, 'Выберите ценовой диапозон', reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data == 'low')
def low_crypto_name(call):
    bot.send_message(call.message.chat.id, 'Напишите название криптовалюты')
    bot.register_next_step_handler(call.message, low_crypto_data)

def low_crypto_data(message):
    global symbol
    symbol = get_crypto_code(message.text.strip().lower())
    bot.send_message(message.chat.id, 'Введите временной период(в днях)')
    bot.register_next_step_handler(message, get_dates_low)

def get_dates_low(message):
    global symbol, user_name

    exchange = ccxt.binance()
    symbol += '/USDT'
    timeframe = '1d'
    days_ago = int(message.text)

    # Устанавливаем временные границы
    end_date = datetime.datetime.utcnow()
    start_date = end_date - datetime.timedelta(days=days_ago)

    # Преобразуем временные метки в миллисекунды
    since = int(start_date.timestamp()) * 1000
    until = int(end_date.timestamp()) * 1000

    # Получаем исторические данные за указанный период
    ohlcv = exchange.fetch_ohlcv(symbol, timeframe, since=since, limit=until)
    df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')

    # Преобразуем столбец с временем в формат даты
    df['date'] = df['timestamp'].dt.date

    min_index = df['low'].idxmin()
    min_data = df.loc[min_index, ['date', 'low']]
    data_str = min_data.to_string(index=False)


    conn = sqlite3.connect('requests.db')
    curr = conn.cursor()

    his_min_data = df.loc[min_index, ['low']]
    his_data_str = his_min_data.to_string(index=False)
    curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (user_name, his_data_str))
    conn.commit()

    curr.close()
    conn.close()

    bot.send_message(message.chat.id,
                     f"Данные с наименьшим значением low за последние {days_ago} дней:\n  {data_str} USDT")

@bot.callback_query_handler(func=lambda call: call.data == 'high')
def high_crypto_name(call):
    bot.send_message(call.message.chat.id, 'Напишите название криптовалюты')
    bot.register_next_step_handler(call.message, high_crypto_data)

def high_crypto_data(message):
    global symbol
    symbol = get_crypto_code(message.text.strip().lower())
    bot.send_message(message.chat.id, 'Введите временной период')
    bot.register_next_step_handler(message, get_dates_high)

def get_dates_high(message):
    global symbol

    exchange = ccxt.binance()
    symbol += '/USDT'
    timeframe = '1d'
    days_ago = int(message.text)

    # Устанавливаем временные границы
    end_date = datetime.datetime.utcnow()
    start_date = end_date - datetime.timedelta(days=days_ago)

    # Преобразуем временные метки в миллисекунды
    since = int(start_date.timestamp()) * 1000
    until = int(end_date.timestamp()) * 1000

    # Получаем исторические данные за указанный период
    ohlcv = exchange.fetch_ohlcv(symbol, timeframe, since=since, limit=until)
    df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')

    # Преобразуем столбец с временем в формат даты
    df['timestamp'] = df['timestamp'].dt.date

    max_index = df['high'].idxmax()
    max_data = df.loc[max_index, ['timestamp', 'high']]
    data_str = max_data.to_string(index=False)

    conn = sqlite3.connect('requests.db')
    curr = conn.cursor()

    his_min_data = df.loc[max_index, ['high']]
    his_data_str = his_min_data.to_string(index=False)
    curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (user_name, his_data_str))
    conn.commit()

    curr.close()
    conn.close()

    bot.send_message(message.chat.id, f"Данные с наибольшим значением low:\n  {data_str} USDT")


@bot.callback_query_handler(func=lambda call: call.data == 'arbitrary')
def  arb_crypto_name(call):
    bot.send_message(call.message.chat.id, 'Введите название крипты')
    bot.register_next_step_handler(call.message, arb_crypto_date)

def arb_crypto_date(message):
    global symbol

    symbol = get_crypto_code(message.text.strip().lower())
    bot.send_message(message.chat.id, 'Введите временной период(в днях)')
    bot.register_next_step_handler(message, arb_crypto_price)

def arb_crypto_price(message):
    global days
    days = int(message.text)

    bot.send_message(message.chat.id, 'Введите цену которую ищете(диапозон +-1000)')
    bot.register_next_step_handler(message, arb_find_all)

def arb_find_all(message):
    global symbol, days

    exchange = ccxt.binance()
    symbol += '/USDT'
    timeframe = '1d'
    days_ago = days
    look_price = float(message.text.strip())

    # Устанавливаем временные границы
    end_date = datetime.datetime.utcnow()
    start_date = end_date - datetime.timedelta(days=days_ago)

    # Преобразуем временные метки в миллисекунды
    since = int(start_date.timestamp()) * 1000
    until = int(end_date.timestamp()) * 1000

    # Получаем исторические данные за указанный период
    ohlcv = exchange.fetch_ohlcv(symbol, timeframe, since=since, limit=until)
    df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')

    df_str = df.to_string(index=False)
    # print(df_str)
    condition_low = np.isclose(df['low'], look_price, atol=1000)
    condition_high = np.isclose(df['high'], look_price, atol=1000)
    result_df_1 = df[condition_low][['timestamp', 'low']]
    result_df_2 = df[condition_high][['timestamp', 'high']]
    if not result_df_1.empty:
        bot.send_message(message.chat.id, "Дни когда цена была похожа на вашу")

        conn = sqlite3.connect('requests.db')
        curr = conn.cursor()

        his_df_1 = df[condition_low][['low']]
        curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (
            user_name, his_df_1.to_string(index=False, header=False)))
        conn.commit()

        curr.close()
        conn.close()

        bot.send_message(message.chat.id, result_df_1.to_string(index=False, header=False))
    elif not result_df_2.empty:
        bot.send_message(message.chat.id, "Дни когда цена была похожа на вашу")

        conn = sqlite3.connect('requests.db')
        curr = conn.cursor()

        his_df_2 = df[condition_high][['high']]
        curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (
            user_name, his_df_2.to_string(index=False, header=False)))
        conn.commit()

        curr.close()
        conn.close()

        bot.send_message(message.chat.id, result_df_2.to_string(index=False, header=False))
    else:
        bot.send_message(message.chat.id, "не найдено совпадений")


@bot.callback_query_handler(func=lambda call: call.data == 'currency')
def crypto(call):
    markup = telebot.types.InlineKeyboardMarkup(row_width=2)
    btn1 = telebot.types.InlineKeyboardButton('Обмен валют', callback_data='currency_exchange')
    btn2 = telebot.types.InlineKeyboardButton('Топ-10 валют', callback_data='top_currency')
    btn3 = telebot.types.InlineKeyboardButton('Отмена', callback_data='cancel')
    markup.add(btn1, btn2, btn3)
    bot.send_message(call.message.chat.id, 'Выберите цену:', reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data == 'currency_exchange')
def currency_start(call):
    bot.send_message(call.message.chat.id, 'Введите сумму для конвертаций! ')
    bot.register_next_step_handler(call.message, summa)

def summa(message):
    global amount
    try:
        amount = int(message.text.strip())
    except ValueError:
        bot.send_message(message.chat.id, 'Неверный формат, должна быть сумма')
        bot.register_next_step_handler(message, summa)
        return

    if amount > 0:
        markup = telebot.types.InlineKeyboardMarkup(row_width=2)
        btn1 = telebot.types.InlineKeyboardButton('USD/EUR', callback_data='usd/eur')
        btn2 = telebot.types.InlineKeyboardButton('EUR/USD', callback_data='eur/usd')
        btn3 = telebot.types.InlineKeyboardButton('USD/GBP', callback_data='usd/gbp')
        btn4 = telebot.types.InlineKeyboardButton('Другое значение', callback_data='else')
        btn5 = telebot.types.InlineKeyboardButton('Отмена', callback_data='cancel')
        markup.add(btn1, btn2, btn3, btn4, btn5)
        bot.send_message(message.chat.id, 'Выберите валюту для конвертаций', reply_markup=markup)
    else:
        bot.send_message(message.chat.id, "Сумма не может быть меньше или равна нулю, выберите правильный формат")
        bot.register_next_step_handler(message, summa)
        return

@bot.callback_query_handler(func=lambda call: call.data == 'usd/eur' or call.data == 'eur/usd' or call.data == 'usd/gbp')
def callback(call):
    values = call.data.upper().split('/')
    res = currency.convert(amount, values[0], values[1])

    conn = sqlite3.connect('requests.db')
    curr = conn.cursor()

    curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (
        user_name, round(res, 2)))
    conn.commit()

    curr.close()
    conn.close()

    bot.send_message(call.message.chat.id, 'Сумма в {} = {}'.format(values[1], round(res, 2)))
    bot.send_message(call.message.chat.id, 'Повторно введите сумму, при желаний проверки других значений')
    bot.register_next_step_handler(call.message, summa)

@bot.callback_query_handler(func=lambda call: call.data == 'else')
def callback(call):
    bot.send_message(call.message.chat.id, 'Введите пару значений через слеш\n')
    bot.send_message(call.message.chat.id, 'USD - Доллар США\n'
                                           'EUR - Евро\n'
                                           'GBP - Фунт стерлингов Великобритании\n'
                                           'JPY - Японская иена\n'
                                           'AUD - Австралийский доллар\n'
                                           'CAD - Канадский доллар\n'
                                           'CHF - Швейцарский франк\n'
                                           'CNY - Китайский юань\n'
                                           'INR - Индийская рупия\n'
                                           'RUB - Российский рубль')
    bot.register_next_step_handler(call.message, my_currency)

def my_currency(message):
    try:
        values = message.text.upper().split('/')
        res = currency.convert(amount, values[0], values[1])

        conn = sqlite3.connect('requests.db')
        curr = conn.cursor()

        curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (
            user_name, round(res, 2)))
        conn.commit()

        curr.close()
        conn.close()

        bot.send_message(message.chat.id, 'Сумма в {} = {}'.format(values[1], round(res, 2)))
        bot.send_message(message.chat.id, 'Повторно введите сумму, при желаний проверки других значений')
        bot.register_next_step_handler(message, summa)
    except:
        bot.send_message(message.chat.id, 'Что-то не так, впишите сумму заново')
        bot.register_next_step_handler(message, summa)
        return

@bot.callback_query_handler(func=lambda call: call.data == 'top_currency')
def top_curr(call):
    data = requests.get('https://www.cbr-xml-daily.ru/daily_json.js').json()
    currencies = data['Valute']

    # Сортируем валюты по значению (Value) в убывающем порядке
    sorted_currencies = sorted(currencies.items(), key=lambda x: x[1]['Value'], reverse=True)

    # Получаем топ-10 валют
    top_10_currencies = sorted_currencies[:10]

    # Выводим топ-10 валют в формате "name: value"
    index = 0
    bot.send_message(call.message.chat.id, 'Топ самых дорогих валют(RUB):')

    conn = sqlite3.connect('requests.db')
    curr = conn.cursor()

    curr.execute('INSERT INTO requests (requester_name, request) VALUES ("%s", "%s")' % (
        user_name, 'top-10 валют'))
    conn.commit()

    curr.close()
    conn.close()

    for currency in top_10_currencies:
        index += 1
        name = currency[1]['Name']
        value = currency[1]['Value']
        bot.send_message(call.message.chat.id, f"{index} {name}: {value}")

@bot.message_handler(commands=['history'])
def history(message):
    conn = sqlite3.connect('requests.db')
    curr = conn.cursor()

    curr.execute('SELECT * FROM requests')
    users = curr.fetchall()

    info = ''
    for elem in users:
        info += 'Имя : {}\nРезультат запроса:\n {}\n' \
                ''.format(elem[1], elem[2])

    curr.close()
    conn.close()

    bot.send_message(message.chat.id, info)


bot.polling(none_stop=True)
