
    document.getElementById('submit-btn').addEventListener('click', function() {
        const res = {}
        people = document.getElementById("question-dropdown").value
        console.log(people)
        res['name'] = usersName
        res['role'] = people.toString()
        res['answers'] = Object.values(answers)
               fetch('/', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(res )
               })
               .then(response => {
                   if (response.ok) {
                        const questionContainer = document.getElementById('question-container');
                        questionContainer.innerHTML = "Спасибо, что поучавствовали в опросе. Ваши ответы важны для нас";

                        const navigation = document.getElementById('navigation');
                        const allAnswers = document.getElementById('all-answers');
                        const submitBtn = document.getElementById('submit-btn');
                        const rejectBtn = document.getElementById('reject-btn');
                        const questDrop = document.getElementById('menu');
                        navigation.style.display = 'none';
                        submitBtn.style.display = 'none';
                        rejectBtn.style.display = 'none';
                        allAnswers.style.display = 'none';
                        questDrop.style.display = 'none';
                       console.log('Ответы успешно отправлены на сервер');
                   } else {
                       console.error('Произошла ошибка при отправке ответов');
                   }
               })
               .catch(error => {
                   console.error('Произошла ошибка при отправке ответов:', error);
               });
       });

       function showAllAnswers() {
          const allAnswers = document.getElementById('all-answers');

          for (const [question, answer] of Object.entries(answers)) {
          const tableRow = document.createElement('tr');

            const questionCell = document.createElement('td');
            questionCell.classList.add('question-table');
            questionCell.textContent = question;
            tableRow.appendChild(questionCell);

            const answerCell = document.createElement('td');
            questionCell.classList.add('question-table-answers');
            temp = "Скорее нет"
            if (answer == 1){
                temp = "Скорее да"
            }
            answerCell.textContent = temp;
            tableRow.appendChild(answerCell);

            allAnswers.appendChild(tableRow);
           }

       }

    function showQuestion(index) {
        const questionContainer = document.getElementById('question-container');
        const navigation = document.getElementById('navigation');
        const allAnswers = document.getElementById('all-answers');
        const submitBtn = document.getElementById('submit-btn');
        const rejectBtn = document.getElementById('reject-btn');

        // Проверяем, достигли ли мы конца списка вопросов
        if (index >= questions.length) {
            questionContainer.innerHTML = 'Вы ответили на все вопросы';
            navigation.style.display = 'none';
            submitBtn.style.display = 'block';
            rejectBtn.style.display = 'block';
            console.log(1)
            showAllAnswers();
            allAnswers.style.display = 'block'; // Показываем список всех вопросов и ответов
            tg.MainButton.show()

            return;
        }
        const currentQuestion = questions[index];
        const answer = answers[currentQuestion] || ''; // Если ответа нет, устанавливаем пустую строку
        const questionCount = questions.length;
        questionContainer.innerHTML =
            `<div class="question-count">Вопрос ${index + 1} из ${questionCount}</div>
            <div class="question">${questions[index]}</div>
            <div class="answers">
                <button class="answer" onclick="recordAnswer('${questions[index]}', 1, this)">Скорее да</button>
                <button class="answer" onclick="recordAnswer('${questions[index]}', 0, this)">Скорее нет</button>
            </div>`
        ;

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === questions.length - 1;
    }

    function recordAnswer(question, answer, element) {
        answers[question] = answer;
        element.style.backgroundColor = "#87ceeb";
        showQuestion(++currentQuestionIndex);

    }

    function startAgain(){
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = "";

        const navigation = document.getElementById('navigation');
        const allAnswers = document.getElementById('all-answers');
        const submitBtn = document.getElementById('submit-btn');
        const rejectBtn = document.getElementById('reject-btn');
        navigation.style.display = 'block';
        submitBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
        allAnswers.style.display = 'none';
        const currentQuestion = 0;
        currentQuestionIndex = 0;
        const answer = answers[currentQuestion] || '';
        answers = {};

        while (allAnswers.firstChild) {
          allAnswers.removeChild(allAnswers.firstChild);
        }

        showQuestion(0);

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        prevBtn.disabled = 0 === 0;
        nextBtn.disabled = 0 === questions.length - 1;
    }

    showQuestion(currentQuestionIndex);

    document.getElementById('next-btn').addEventListener('click', function() {
        showQuestion(++currentQuestionIndex);
    });

    document.getElementById('prev-btn').addEventListener('click', function() {
        showQuestion(--currentQuestionIndex);
    });

    var usersName = "None"

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('navigation').style.display = 'none';

        document.getElementById('welcome-form').style.display = 'block';

        document.getElementById('start-btn').addEventListener('click', function() {
            document.getElementById('menu').style.display = 'none';
            usersName = document.getElementById("name-input").value

            document.getElementById('question-container').style.display = 'block';
            document.getElementById('navigation').style.display = 'block';

            showQuestion(currentQuestionIndex);
        });
    });
