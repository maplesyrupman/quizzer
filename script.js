let questions = [
    {
        question: 'Which built-in method removes the last element from an array and returns that element?',
        correctAnswer: 'pop()',
        a: 'last()',
        b: 'get()',
        c: 'pop()',
        d: 'None of the above.'
    },
    {
        question: 'Which built-in method returns the calling string value converted to upper case?',
        correctAnswer: 'toUpperCase()',
        a: 'toUpperCase()',
        b: "toUpper()",
        c: 'changeCase(case)',
        d: 'None of the above.'
    },
    {
        question: 'Which of the following function of String object causes a string to be italic, as if it were in an <i> tag?',
        correctAnswer: 'italics()', 
        a: 'fontColor()', 
        b: 'fontSize()', 
        c: 'fixed()', 
        d: 'italics()'
    },
    {
        question: 'Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?',
        correctAnswer: 'split()', 
        a: 'slice()', 
        b: 'replace()', 
        c: 'split()', 
        d: 'search()'
    },
    {
        question: 'Which of the following function of String object creates a string to be displayed as bold as if it were in a <b> tag?',
        correctAnswer: 'bold()', 
        a: 'bold()', 
        b: 'fontSize()', 
        c: 'big()', 
        d: 'italics()'
    }
];

const appContainer = document.getElementById('appContainer');
const timerCountEl = document.getElementById('timer');

const domOps = (() => {

    const createQuestionCard = (questionObj, questionNum, questionTotal) => {
        let cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.classList.add('border-0');
        let cardHeaderEl = document.createElement('div');
        cardHeaderEl.classList.add('card-header');
        cardHeaderEl.textContent = `${questionNum}/${questionTotal}`;
        cardEl.appendChild(cardHeaderEl);
    
        cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body');
    
        let questionTextEl = document.createElement('p');
        questionTextEl.textContent = questionObj.question;
        cardBodyEl.appendChild(questionTextEl);
    
        let answerContainer = document.createElement('div');
        answerContainer.classList.add('row');
        answerContainer.classList.add('answerContainer');
    
        let answerA = document.createElement('button');
        answerA.classList.add('btn');
        answerA.classList.add('btn-primary');
        answerA.classList.add('col-9');
        answerA.textContent = `a) ${questionObj.a}`;
        answerA.value = questionObj.a;
        answerContainer.appendChild(answerA);
    
        let answerB = document.createElement('button');
        answerB.classList.add('btn');
        answerB.classList.add('btn-primary');
        answerB.classList.add('col-9');
        answerB.textContent = `b) ${questionObj.b}`;
        answerB.value = questionObj.b;
        answerContainer.appendChild(answerB);
    
        let answerC = document.createElement('button');
        answerC.classList.add('btn');
        answerC.classList.add('btn-primary');
        answerC.classList.add('col-9');
        answerC.textContent = `c) ${questionObj.c}`;
        answerC.value = questionObj.c;
        answerContainer.appendChild(answerC);
    
        let answerD = document.createElement('button');
        answerD.classList.add('btn');
        answerD.classList.add('btn-primary');
        answerD.classList.add('col-9');
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
        cardEl.classList.add('border-0');

        let cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body');
        
        let cardTitleEl = document.createElement('h2');
        cardTitleEl.classList.add('card-title');
        cardTitleEl.classList.add('text-center');
        cardTitleEl.textContent = 'Welcome to Quizzer!';
        cardBodyEl.appendChild(cardTitleEl);

        let cardSubtitleEl = document.createElement('h4');
        cardSubtitleEl.classList.add('card-subtitle');
        cardSubtitleEl.classList.add('mb-2');
        cardSubtitleEl.classList.add('text-muted');
        cardSubtitleEl.classList.add('text-center');
        cardSubtitleEl.textContent = 'Press start to begin your quiz';
        cardBodyEl.appendChild(cardSubtitleEl);

        let buttonContainerEl = document.createElement('div');
        buttonContainerEl.classList.add('buttonContainer');

        let startBtnEl = document.createElement('button');
        startBtnEl.classList.add('btn');
        startBtnEl.classList.add('btn-primary');
        startBtnEl.textContent = 'Start';
        startBtnEl.addEventListener('click', () => {
            quiz.start();
        });
        buttonContainerEl.appendChild(startBtnEl);

        let highScoreBtnEl = document.createElement('button');
        highScoreBtnEl.classList.add('btn');
        highScoreBtnEl.classList.add('btn-secondary');
        highScoreBtnEl.textContent = 'High Scores';
        highScoreBtnEl.addEventListener('click', displayHighScores);
        buttonContainerEl.appendChild(highScoreBtnEl);

        buttonContainerEl.appendChild(startBtnEl);
        buttonContainerEl.appendChild(highScoreBtnEl);
        cardBodyEl.appendChild(buttonContainerEl);
        cardEl.appendChild(cardBodyEl);

        appContainer.appendChild(cardEl);
    }

    const displayEndScreen = (userScore) => {
        if (appContainer.hasChildNodes()) {
            appContainer.lastChild.remove();
        }

        let cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.classList.add('border-0');

        let cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body');
        
        let cardTitleEl = document.createElement('h2');
        cardTitleEl.classList.add('card-title');
        cardTitleEl.classList.add('text-center');
        cardTitleEl.textContent = 'All Done!';
        cardBodyEl.appendChild(cardTitleEl);

        let cardSubtitleEl = document.createElement('h4');
        cardSubtitleEl.classList.add('card-subtitle');
        cardSubtitleEl.classList.add('mb-2');
        cardSubtitleEl.classList.add('text-muted');
        cardSubtitleEl.classList.add('text-center');
        cardSubtitleEl.textContent = `You finished with a score of ${userScore}`;
        cardBodyEl.appendChild(cardSubtitleEl);

        let formContainerEl = document.createElement('div');
        formContainerEl.classList.add('saveScoreForm');

        let formMessage = document.createElement('h5');
        formMessage.classList.add('text-center');
        formMessage.textContent = 'Please enter your initials to save your high score';

        let initialsFormContainer = document.createElement('div');
        initialsFormContainer.classList.add('initialsFormDiv');

        let initialsInputEl = document.createElement('input');
        initialsInputEl.setAttribute('type', 'text');
        initialsInputEl.setAttribute('placeHolder', 'W.W.');
        initialsInputEl.setAttribute('id', 'initialsInput');

        let initialsLableEl = document.createElement('label');
        initialsLableEl.textContent = 'Your initials:';
        initialsLableEl.setAttribute('for', 'initialsInput');

        let submitBtn = document.createElement('button');
        submitBtn.classList.add('btn');
        submitBtn.classList.add('btn-primary');
        submitBtn.classList.add('btn-sm');
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', () => {
            let userInitials = initialsInputEl.value;
            scoreStore.addHighScore(userInitials, userScore);
            displayHighScores();
        });

        formContainerEl.appendChild(formMessage);
        initialsFormContainer.appendChild(initialsLableEl);
        initialsFormContainer.appendChild(initialsInputEl);
        initialsFormContainer.appendChild(submitBtn);
        formContainerEl.appendChild(initialsFormContainer)
        
        cardBodyEl.appendChild(formContainerEl);
        cardEl.appendChild(cardBodyEl);

        appContainer.appendChild(cardEl);
    }

    const displayHighScores = () => {
        if (appContainer.hasChildNodes()) {
            appContainer.lastChild.remove();
        }

        let savedHighScores = scoreStore.getScores();

        let cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.classList.add('border-0');

        let cardBodyEl = document.createElement('div');
        cardBodyEl.classList.add('card-body');

        let cardTitleEl = document.createElement('h3');
        cardTitleEl.classList.add('card-title');
        cardTitleEl.classList.add('text-center');
        cardTitleEl.textContent = 'High Scores';
        cardBodyEl.appendChild(cardTitleEl);

        let highScoreCard = document.createElement('div');
        highScoreCard.classList.add('card');
        
        let highScoresList = document.createElement('ul');
        highScoreCard.classList.add('list-group');
        highScoreCard.classList.add('list-group-flush');

        for (let i = 0; i < savedHighScores.length; i++) {
            let thisScore = savedHighScores[i];
            
            let scoreItem = document.createElement('li');
            scoreItem.classList.add('list-group-item');
            scoreItem.textContent = `${thisScore.player} ${thisScore.highScore}`;
            highScoresList.appendChild(scoreItem);
        };

        highScoreCard.appendChild(highScoresList);
        cardBodyEl.appendChild(highScoreCard);
        cardEl.appendChild(cardBodyEl);

        let clearBtn = document.createElement('button');
        clearBtn.classList.add('btn');
        clearBtn.classList.add('btn-danger');
        clearBtn.classList.add('mb-1');
        clearBtn.textContent = 'Clear Scores';
        clearBtn.addEventListener('click', () => {
            scoreStore.clearScores();
            displayHighScores();
        });
        cardEl.appendChild(clearBtn);

        let homeBtn = document.createElement('button');
        homeBtn.classList.add('btn');
        homeBtn.classList.add('btn-primary');
        homeBtn.textContent = 'Back';
        homeBtn.addEventListener('click', () => {
            displayStartScreen();
        });
        cardEl.appendChild(homeBtn);

        appContainer.appendChild(cardEl);
    }

    return {
        createQuestionCard,
        displayStartScreen,
        displayEndScreen,
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
        currentQuestion = 0;
        questionNum = 1;

        quizContinue = setInterval(() => {
            if (!timer.isTimeLeft() || currentQuestion == questions.length) {
                quiz.stop();
            }
        }, 1000);

        askQuestion(questions[currentQuestion]);

    };

    const stop = () => {
        timer.stop();
        clearInterval(quizContinue);
        currentQuestion = 0;
        questionNum = 1;
        appContainer.lastChild.remove();
        domOps.displayEndScreen(quiz.getUserScore())
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
                    questionNum++;
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

const scoreStore = (() => {

    const getScores = () => {
        if (localStorage.getItem('quizHighScores')) {
            return JSON.parse(localStorage.getItem('quizHighScores'));
        }
        return [];
    }

    const addHighScore = (player, highScore) => {
        let highScores = getScores();
        playerScore = {player, highScore};
        highScores.push(playerScore);
        localStorage.setItem('quizHighScores', JSON.stringify(highScores));
    }

    const clearScores = () => {
        localStorage.setItem('quizHighScores', JSON.stringify([]));
    }

    return {
        getScores,
        addHighScore,
        clearScores
    }

})();

quiz.setQuestions(questions);
domOps.displayStartScreen();