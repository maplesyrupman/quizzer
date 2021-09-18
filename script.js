let timerCount = 0;
let userScore = 0;
let questionNum = 1;

let questions = [
    {
        question: 'what day is it',
        correctAnswer: 'Friday',
        a: 'Friday',
        b: 'Monday',
        c: 'Tuesday',
        d: 'Wednesday'
    },
    {
        question: 'What time is it?',
        correctAnswer: 'time to get a watch',
        a: '1 o\'clock',
        b: "midnight",
        c: 'lunch time',
        d: 'time to get a watch'
    },
    {
        question: 'How much wood would a wood chuck chuck if a woodchuck could chuck wood?',
        correctAnswer: 'a lot', 
        a: 'not a lot', 
        b: 'a decent amount', 
        c: 'a lot', 
        d: 'just enough'
    }
]
let questionTotal = questions.length;

const appContainer = document.getElementById('appContainer');
const timerCountEl = document.getElementById('timer');

const createQuestionCard = (questionObj) => {
    let cardEl = document.createElement('div');
    cardEl.classList.add('card');
    let cardHeaderEl = document.createElement('div');
    cardHeaderEl.classList.add('card-header');
    // placeholder until set array is created
    cardHeaderEl.textContent = `${questionNum}/${questionTotal}`;
    cardEl.appendChild(cardHeaderEl);

    cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    let questionTextEl = document.createElement('p');
    // placeholder until questionObj is created 
    questionTextEl.textContent = questionObj.question;
    cardBodyEl.appendChild(questionTextEl);

    let answerContainer = document.createElement('div');
    answerContainer.classList.add('row');
    answerContainer.classList.add('answerContainer');

    let answerA = document.createElement('button');
    answerA.classList.add('btn');
    answerA.classList.add('btn-primary');
    answerA.classList.add('col-9');
    // placeholder
    answerA.textContent = `a) ${questionObj.a}`;
    answerA.value = questionObj.a;
    answerContainer.appendChild(answerA);

    let answerB = document.createElement('button');
    answerB.classList.add('btn');
    answerB.classList.add('btn-primary');
    answerB.classList.add('col-9');
    // placeholder
    answerB.textContent = `b) ${questionObj.b}`;
    answerB.value = questionObj.b;
    answerContainer.appendChild(answerB);

    let answerC = document.createElement('button');
    answerC.classList.add('btn');
    answerC.classList.add('btn-primary');
    answerC.classList.add('col-9');
    // placeholder
    answerC.textContent = `c) ${questionObj.c}`;
    answerC.value = questionObj.c;
    answerContainer.appendChild(answerC);

    let answerD = document.createElement('button');
    answerD.classList.add('btn');
    answerD.classList.add('btn-primary');
    answerD.classList.add('col-9');
    // placeholder
    answerD.textContent = `d) ${questionObj.d}`;
    answerD.value = questionObj.d;
    answerContainer.appendChild(answerD);

    cardBodyEl.appendChild(answerContainer);
    cardEl.appendChild(cardBodyEl);

    appContainer.appendChild(cardEl);

}

const timer = (() => {
    let timerClock;

    const start = () => {
        timerCount = 60;
        timerCountEl.textContent = timerCount;
        timerClock = setInterval(() => {
            if (timerCount > 0) {
                timerCount--;
                timerCountEl.textContent = timerCount;
                if (timerCount <= 10) {
                    timerCountEl.classList.add('text-danger');
                }
            } else {
                clearInterval(timerClock);
                timerCountEl.classList.remove('text-danger');
            }
        }, 1100);
    };

    const stop = () => {
        clearInterval(timerClock);
        timerCount = 0;
        timerCountEl.textContent = timerCount;
    }

    return {
        start,
        stop
    }
})();



const quiz = (() => {
    let questions;
    let continueQuiz;
    
    const setQuestions = (questions) => {
        this.questions = questions;
    };

    const start = () => {
        timer.start();

        continueQuiz = setInterval(() => {
            if (timerCount <= 0 || questionNum == questionTotal) {
                quiz.stop();
            }
        }, 1000)

    };

    const stop = () => {
        timer.stop();
        clearInterval(continueQuiz);
    }

    const askQuestion = (questionObj) => {
        if (appContainer.hasChildNodes()) {
            appContainer.lastChild.remove();
        }

        createQuestionCard(questionObj);

        let answerContainer = document.querySelector('.answerContainer')
        console.log(answerContainer);
    }

    return {
        setQuestions,
        start,
        stop, 
        askQuestion
    }
})();