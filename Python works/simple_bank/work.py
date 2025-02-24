# MyProfile app

SEPARATOR = '------------------------------------------'

# user profile
n = ''
a = 0
ph = ''
e = ''
i = ''
# information 
index = ''
post_adress = ''
post_index = ''
individual_identification = ''
payment_account = ''
identification_code = ''
correspondent_account = ''
bank_name = ''
ogrnip = ''


def general_info_user(n_parameter, a_parameter, ph_parameter, e_parameter, i_parameter, index, post_adress):
    print(SEPARATOR)
    print('Имя:    ', n_parameter)
    if 11 <= a_parameter % 100 <= 19: years_parameter = 'лет'
    elif a_parameter % 10 == 1: years_parameter = 'год'
    elif 2 <= a_parameter % 10 <= 4: years_parameter = 'года'
    else: years_parameter = 'лет'


    print('Возраст:', a_parameter, years_parameter)
    print('Телефон:', ph_parameter)
    print('E-mail: ', e_parameter)
    print('Индекс: ', index)
    print('Адрес: ', post_adress)
    if i:
            print('')
            print('Дополнительная информация:')
            print(i_parameter)
    

print('Приложение MyProfile')
print('Сохраняй информацию о себе и выводи ее в разных форматах')

while True:
    # main menu
    print(SEPARATOR)
    print('ГЛАВНОЕ МЕНЮ')
    print('1 - Ввести или обновить информацию')
    print('2 - Вывести информацию')
    print('0 - Завершить работу')

    option = int(input('Введите номер пункта меню: '))
    if option == 0:
            break

    if option == 1:
        # submenu 1: edit info
        while True:
            print(SEPARATOR)
            print('ВВЕСТИ ИЛИ ОБНОВИТЬ ИНФОРМАЦИЮ')
            print('1 - Личная информация')
            print('2 - Информация о предпринимателе')
            print('0 - Назад')

            option2 = int(input('Введите номер пункта меню: '))
            if option2 == 0:
                break
            if option2 == 1:
                # input general info
                n = input('Введите имя: ')
                while 1:
                        # validate user age
                        a = int(input('Введите возраст: '))
                        if a > 0:
                            break
                        print('Возраст должен быть положительным')

                uph = input('Введите номер телефона (+7ХХХХХХХХХХ): ')
                ph = ''
                for ch in uph:
                    if ch == '+' or ('0' <= ch <= '9'):
                        ph += ch


                e = input('Введите адрес электронной почты: ')
                post_index = input('Введите почтовый индекс: ')

                index_digits = ''

                for char in post_index:
                    if char.isdigit():
                        index_digits += char
                
                index = index_digits
                post_adress = input('Введите почтовый адрес (без индекса): ')
                i = input('Введите дополнительную информацию:\n')

            elif option2 == 2:
                # input information about businessman
                while True:
                    ogrnip = int(input('Введите ОГРНИП: '))
                    count_ogrnip = len(str(ogrnip))
                    if count_ogrnip < 15:
                        print('ОГРНИП не может быть меньше 15 цифр, попытайтесь ещё ')
                    else:
                        break 
                individual_identification = int(input('Введите ИИН: '))
                while True:
                    payment_account = int(input('Введите расчетный счёт: '))
                    count_payment_account = len(str(payment_account))
                    if count_payment_account < 20:
                        print('Расчётный счёт не может быть меньше 20 цифр, попытайтесь ещё ')
                    else:
                        break
                bank_name = input('Введите название банка: ')
                identification_code = int(input('Введите БИК: '))
                correspondent_account = int(input('Введите корреспонденсткий счёт: '))
                    

            else: print('Введите корректный пункт меню')
    elif option == 2:
        # submenu 2: print info
        while True:
            print(SEPARATOR)
            print('ВЫВЕСТИ ИНФОРМАЦИЮ')
            print('1 - Общая информация')
            print('2 - Вся информация')
            print('0 - Назад')

            option2 = int(input('Введите номер пункта меню: '))
            if option2 == 0:
                break
            if option2 == 1:
                general_info_user(n, a, ph, e, i, index, post_adress)

            elif option2 == 2:
                general_info_user(n, a, ph, e, i, index, post_adress)

                # print information about businessman
                print('')
                print('ИНформация о предпринимателе')
                print('ОГРНИП: ', ogrnip)
                print('ИИН: ', individual_identification)
                print('Банковские реквизиты')
                print('Р/С:   ', payment_account)
                print('Банк: ', bank_name)
                print('БИК: ', identification_code)
                print('К/С ', correspondent_account)
            else:   print('Введите корректный пункт меню')
    else:       print('Введите корректный пункт меню')