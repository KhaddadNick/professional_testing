from flask import Flask, render_template, request, send_file
import csv
import io

app = Flask(__name__)


# @app.route('/')
# def index():
#

@app.route('/', methods=["GET", 'POST'])
def submit_answers():
    # список вопросов
    questions = []
    with open("static/questions.txt", "r", encoding="utf-8") as file:
        for line in file:
            questions.append(line.strip())
    print(questions)

    people = ['Физик', 'Математик', 'Химик']
    if request.method == 'POST':
        answer = request.json
        print('Ответы пользователя:', answer)

        with open('static/answers.csv', 'a', newline='', encoding="utf-8") as file:
            writer = csv.writer(file, delimiter=';')
            writer.writerow([answer['role'], answer['name'], (answer['answers'])])

        return render_template('sentAnswers.html')
    else:
        return render_template('index.html', questions=questions, peoples=people)


@app.route('/admin', methods=["GET", 'POST'])
def admin():
    if request.method == 'POST':
        answers = request.json
        print('Ответы пользователя:', answers)

        return render_template('sentAnswers.html')
    else:
        return render_template('admin.html', password='1234', password2='0')


@app.route('/edit_questions', methods=["GET", 'POST'])
def edit_questions():
    if request.method == 'POST':
        answers = request.json
        print('Ответы пользователя:', answers)

        return render_template('sentAnswers.html')
    else:
        return render_template('edit_questions.html')


@app.route('/save_questions', methods=['POST'])
def save_questions():
    if request.method == 'POST':
        questions_post = request.form['questions']
        try:
            with open('static/questions.txt', 'w', encoding="utf-8") as file:
                file.write(questions_post)
            return 'Questions saved successfully!', 200
        except Exception as e:
            return 'Error saving questions: ' + str(e), 500


@app.route('/download_answers', methods=['GET'])
def download_answers():
    try:
        filename = 'answers.csv'
        filepath = 'static/answers.csv'

        with open(filepath, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            rows = list(reader)

        proxy = io.StringIO()
        writer = csv.writer(proxy)
        writer.writerows(rows)

        mem = io.BytesIO()
        mem.write(proxy.getvalue().encode('utf-8'))
        mem.seek(0)
        proxy.close()

        return send_file(
            mem,
            as_attachment=True,
            download_name=filename,
            mimetype='text/csv;charset=utf-8'
        )
    except Exception as e:
        return 'Error downloading answers file: ' + str(e), 500


if __name__ == '__main__':
    # app.run(ssl_context='adhoc')
    app.run()

# Перед первым вопросом сказать что происходит tc
# Ориентировочное время прохождения теста 10 минут
# В текст добавим

# добавить админ панель, где можно добавить. Там список вопросов список ролей и выгркзить всю статистику

# Сделать еще без выбора роли
# Одно мы закрываем выбор ролей и в ответ мол кто я
# Другое открываем и говорим мол выберет роль и в ответ спс

# там где поставлена галочка либо доступна либо не доступна страница для сбора данных

# айдишник вопрос
#
# добавить еще форму обратной связи

# Заголовок
# вопрос 2 из 20
# кнопки с ответами

# мб потом сделать выбор имени и пол
#
#
# до студ весны
# админ                      есть
# начало конец               есть
# постараемся сделать тестирование с ответом от бэка
