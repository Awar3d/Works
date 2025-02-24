from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'alim'  # Секретный ключ для сессий

def init_db_users():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT NOT NULL,
        password TEXT NOT NULL,
        iin TEXT NOT NULL,
        voice BOOL DEFAULT FALSE
    )''')

    conn.commit()
    conn.close()

def add_to_db(login, password, iin):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('''INSERT INTO users (login, password, iin)
        VALUES (?, ?, ?)''', (login, password, iin))

    conn.commit()
    conn.close()

def get_from_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()

    conn.close()

    return users

def init_db_votes():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Создаем таблицу для хранения голосов
    cursor.execute('''CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        choice TEXT NOT NULL,
        voters TEXT DEFAULT '',
        vote_count INTEGER DEFAULT 0
    )''')

    # Добавляем два варианта голосования
    cursor.execute('INSERT OR IGNORE INTO votes (id, choice) VALUES (1, "За строительство")')
    cursor.execute('INSERT OR IGNORE INTO votes (id, choice) VALUES (2, "Против строительства")')

    conn.commit()
    conn.close()


def add_vote(user_id, choice_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Проверяем, голосовал ли пользователь
    cursor.execute('SELECT voice FROM users WHERE id = ?', (user_id,))
    user_voice = cursor.fetchone()
    if user_voice and user_voice[0]:
        conn.close()
        return False  # Пользователь уже голосовал

    # Обновляем таблицу votes
    cursor.execute('SELECT voters FROM votes WHERE id = ?', (choice_id,))
    voters = cursor.fetchone()[0]
    new_voters = f"{voters},{user_id}" if voters else str(user_id)

    cursor.execute('UPDATE votes SET voters = ?, vote_count = vote_count + 1 WHERE id = ?', (new_voters, choice_id))
    cursor.execute('UPDATE users SET voice = 1 WHERE id = ?', (user_id,))

    conn.commit()
    conn.close()
    return True


def get_vote_results():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('''
        SELECT v.choice, v.vote_count, GROUP_CONCAT(u.login) 
        FROM votes v
        LEFT JOIN users u ON ',' || v.voters || ',' LIKE '%,' || u.id || ',%'
        GROUP BY v.id
        ''')
    results = cursor.fetchall()

    conn.close()
    return results

@app.route('/')
def to_main_page():
    return render_template('main.html')

@app.route('/personal')
def to_pers_page():
    # Проверяем, есть ли данные о пользователе в сессии
    if 'user' in session:
        user = session['user']
        return render_template('personal.html', user=user)
    return render_template('wrong.html')  # Перенаправляем на главную страницу, если нет данных о пользователе

@app.route('/voting')
def to_voting_page():
    if 'user' in session:
        user = session['user']
        # Проверяем, голосовал ли пользователь
        if user.get('voice', False):
            return 'You can\'t vote anymore', 400
        return render_template('voting.html', user=user)
    # Перенаправляем неавторизованного пользователя на главную
    return redirect(url_for('to_main_page'))

@app.route('/table')
def to_table():
    results = get_vote_results()

    return render_template('table.html', results=results)

@app.route('/choose_cand', methods=['POST'])
def choose_candidate():
    if 'user' not in session:
        return redirect(url_for('to_main_page'))  # Только авторизованные пользователи

    user = session['user']
    choice_id = int(request.form.get('choice'))

    success = add_vote(user_id=user['id'], choice_id=choice_id)
    if not success:
        flash('Вы уже голосовали.', 'error')
        return redirect(url_for('to_pers_page'))

    flash('Ваш голос успешно принят!', 'success')
    return redirect(url_for('to_main_page'))

@app.route('/results')
def show_results():
    results = get_vote_results()  # Получаем результаты голосования
    return render_template('table.html', results=results)

@app.route('/login', methods=['POST'])
def get_login():
    if request.method == 'POST':
        login = request.form['username']
        password = request.form['password']

        data = get_from_db()
        for user in data:
            if user[1] == login and user[2] == password:
                # Сохраняем данные о пользователе в сессии
                session['user'] = {
                    'id': user[0],
                    'login': user[1],
                    'iin': user[3],
                    'password': user[2],
                    'voice': user[4]
                }
                return redirect(url_for('to_pers_page'))  # Перенаправляем на личную страницу
        return 'Invalid credentials', 400

@app.route('/register', methods=['POST'])
def get_reg():
    if request.method == 'POST':
        login = request.form['username']
        password = request.form['password']
        repassword = request.form.get('repPassword')
        iin = request.form['IIN']

        if len(iin) < 12 and len(iin) > 15:
            phrase = 'ИИН должен быть как минимум 12 символов и макс 15 символов'
            return render_template('wrong.html', phrase=phrase)

        if len(password) < 8:
            phrase = 'пароль должен быть как минимум 8 символов'
            return render_template('wrong.html', phrase=phrase)

        if password != repassword:
            phrase = 'пароли должны быть похожими'
            return render_template('wrong.html', phrase=phrase)

        add_to_db(login=login, password=password, iin=iin)
        return redirect(url_for('to_main_page'))


init_db_users()
init_db_votes()

if __name__ == '__main__':
    app.run(debug=True)
