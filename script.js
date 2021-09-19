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

const appContainer = document.getElementById('appContainer');
const timerCountEl = document.getElementById('timer');

const domOps = (() => {
    const createQuestionCard = (questionObj, questionNum, questionTotal) => {
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

    const displayStartScreen = () => {
        if (appContainer.hasChildNodes()) {
            appContainer.lastChild.remove();
        }

        let cardEl = document.createElement('div');
        cardEl.classList.add('card');
        // cardEl.setAttribute('style', 'width: 18rem;');

        let cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body');
        
        let cardTitleEl = document.createElement('h5');
        cardTitleEl.classList.add('card-title');
        cardTitleEl.textContent = 'Welcome to Quizzer!';
        cardBodyEl.appendChild(cardTitleEl);

        let cardSubtitleEl = document.createElement('h6');
        cardSubtitleEl.classList.add('card-subtitle');
        cardSubtitleEl.classList.add('mb-2');
        cardSubtitleEl.classList.add('text-muted');
        cardSubtitleEl.textContent = 'Press start to begin your quiz';
        cardBodyEl.appendChild(cardSubtitleEl);

        let buttonContainerEl = document.createElement('div');
        buttonContainerEl.classList.add('buttonContainer');

        let startBtnEl = document.createElement('button');
        startBtnEl.classList.add('btn');
        startBtnEl.classList.add('btn-primary');
        startBtnEl.textContent = 'Start';
        buttonContainerEl.appendChild(startBtnEl);

        let highScoreBtnEl = document.createElement('button');
        highScoreBtnEl.classList.add('btn');
        highScoreBtnEl.classList.add('btn-secondary');
        highScoreBtnEl.textContent = 'High Scores';
        buttonContainerEl.appendChild(highScoreBtnEl);

        buttonContainerEl.appendChild(startBtnEl);
        buttonContainerEl.appendChild(highScoreBtnEl);
        cardBodyEl.appendChild(buttonContainerEl);
        cardEl.appendChild(cardBodyEl);

        appContainer.appendChild(cardEl);
    }

    return {
        createQuestionCard,
        displayStartScreen,
    }

})();



const timer = (() => {
    let timerCount = 0;
    let timerTick;

    const start = () => {
        timerCount = 60;
        timerCountEl.textContent = timerCount;
        timerTick = setInterval(() => {
            if (timerCount > 0) {
                timerCount--;
                timerCountEl.textContent = timerCount;
                if (timerCount <= 10) {
                    timerCountEl.classList.add('text-danger');
                }
            } else {
                clearInterval(timerTick);
                timerCountEl.classList.remove('text-danger');
            }
        }, 1000);
    };

    const stop = () => {
        clearInterval(timerTick);
        timerCount = 0;
        timerCountEl.textContent = timerCount;
        if (timerCountEl.classList.contains('text-danger')) {
            timerCountEl.classList.remove('text-danger');
        }
    }

    const isTimeLeft = () => {
        if (timerCount) {
            return true;
        }
        return false;
    }

    const isPlusFiveLeft = () => {
        if (timerCount > 5) {
            return true;
        }
        return false;
    }

    const minusFive = () => {
        timerCount = timerCount - 5;
    }

    return {
        start,
        stop, 
        isTimeLeft, 
        isPlusFiveLeft, 
        minusFive,
    }
})();



const quiz = (() => {
    let questions;
    let quizContinue; 
    let currentQuestion = 0;
    let questionNum = 1;
    let userScore = 0;
    let questionsTotal;

    
    const setQuestions = (someQuestions) => {
        questions = someQuestions;
        questionsTotal = questions.length;
    };

    const start = () => {
        timer.start();
        userScore = 0;

        quizContinue = setInterval(() => {
            if (!timer.isTimeLeft() || currentQuestion == questions.length) {
                quiz.stop();
            }
        }, 1000);

        askQuestion(questions[currentQuestion]);

    };

    const stop = () => {
        debugger;
        timer.stop();
        clearInterval(quizContinue);
        currentQuestion = 0;
        questionNum = 1;
        appContainer.lastChild.remove();
    }

    const isLastQuestion = () => {
        if (currentQuestion == questions.length -1) {
            return true;
        }
        return false;
    }

    const askQuestion = (questionObj) => {
        if (appContainer.hasChildNodes()) {
            appContainer.lastChild.remove();
        }

        domOps.createQuestionCard(questionObj, questionNum, questionsTotal);

        let answerContainer = document.querySelector('.answerContainer')
        answerContainer.addEventListener('click', e => {
            answer = e.target.value;
            if (answer === questionObj.correctAnswer) {
                userScore++;
                if (isLastQuestion()) {
                    console.log('last question');
                    stop();
                } else {
                    currentQuestion++;
                    questionNum++;
                    askQuestion(questions[currentQuestion]);
                }
            } 

            else {
                if (timer.isPlusFiveLeft() && !isLastQuestion()) {
                    timer.minusFive();
                    currentQuestion++;
                    askQuestion(questions[currentQuestion]);
                } else {
                    quiz.stop();
                }
            }
        })
    };

    const getUserScore = () => {
        return userScore;
    }

    return {
        setQuestions,
        start,
        stop, 
        getUserScore,
    }
})();

const highScores = (() => {
    let highScores;

    const getScores = () => {
        if (localStorage.getItem('quizHighScores')) {
            highScores = JSON.parse(localStorage.getItem('quizHighScores'));
            return highScores;
        }
        highScores = [];
    }

    const addHighScore = (player, highScore) => {
        highScores = getScores();
        playerScore = [player, score];
        highScores.push(playerScore);
        localStorage.setItem('quizHighScores', JSON.stringify(playerScore));
    }

    return {
        getScores,
        addHighScore
    }

})();

// quiz.setQuestions(questions);
// quiz.start();
domOps.displayStartScreen();