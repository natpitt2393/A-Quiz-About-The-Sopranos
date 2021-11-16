var questions = [
    {
        text: "Who played Tony Soprano?",
        choices: ["James Gandolfini", "Tony Sirico", "Steven Van Zandt", "Frank Vincent"],
        answer: "James Gandolfini"
    },
    {
        text: "What is Tony's wife's name?",
        choices: ["Meadow", "Irina", "Carmela", "Ashley"],
        answer: "Carmela"
    },
    {
        text: "Which of the following singers appeared on the show?",
        choices: ["Tony Bennett", "Bobby Vinton", "Connie Francis", "Frankie Valli"],
        answer: "Frankie Valli"
    },
    {
        text: "What college does Meadow attend?",
        choices: ["Dartmouth", 'Rutgers', "Princeton", "Columbia"],
        answer: "Columbia"
    },
    {
        text: "What is the name of the New York City based crime family on the show?",
        choices: ["Soprano", "Lupertazzi", "Genovese", "Gambino"],
        answer: "Lupertazzi"
    }
];

var quizQuestionsIndex = 0;
var timerId;
var timeCount = questions.length * 10;

// HTML elements
var startScreenEl = document.getElementById("start-screen");
var startBtn = document.getElementById("start");
var questionEl = document.getElementById("questions");
var timerEl = document.querySelector("#time");
var questionTextEl = document.getElementById("question-text");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.getElementById("feedback");
var finishScreenEl = document.querySelector("#finish-screen");
var finalScoreEl = document.querySelector("#final-score");
var initialsInputEl = document.getElementById("initials");
var initialsSubmitBtn = document.getElementById("submit");





function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
    questionEl.setAttribute("class", "display");
    // start the timer
    timerId = setInterval(runTick, 1000);
    // ask questions
    askQuestions();
};

function askQuestions() {
    var currentQuestion = questions[quizQuestionsIndex];
    //console.log(currentQuestion);
    var questionText = currentQuestion.text;
    questionTextEl.textContent = questionText;
    //console.log(questionText);



    choicesEl.innerHTML = "";
    var choicesArr = currentQuestion.choices
    // or choicesEl.textContent = "";
    for (var i = 0; i < choicesArr.length; i++) {
        var choiceBtnEl = document.createElement('button');
        //console.log(choicesArr[i]);
        choiceBtnEl.setAttribute('value', choicesArr[i]);
        choiceBtnEl.textContent = (i + 1) + ". " + choicesArr[i]
        choicesEl.appendChild(choiceBtnEl);
    }
}

function runTick() {
    // decrement time by 1 second 
    timeCount--;
    // display time count 
    timerEl.textContent = timeCount
    // check time count if it reaches 0
    if (!timeCount) {
        console.log("You're time has run out! HAHAHAHA!");
        clearInterval(timerId);
        // quiz ends

    }
    // if it is at 0, it needs to execute the function endQuiz()
}

function handleChoices(event) {
    var choiceValue = event.target.getAttribute('value');
    console.log(choiceValue);
    if (choiceValue === questions[quizQuestionsIndex].answer) {
        feedbackEl.textContent = "Correct!";
    } else {
        timeCount -= 5;
        if (timeCount < 0) {
            timeCount = 0
        }
        timerEl.textContent = timeCount;
        feedbackEl.textContent = "Unfortunately, you are wrong!";
    } feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'hide');
    }, 1000);

    quizQuestionsIndex++;
    if (quizQuestionsIndex === questions.length) {
        quizEnd();
    } else {
        askQuestions();
    }
}

function quizEnd() {
    //console.log('quizEnd');
    // clear time interval
    clearInterval(timerId);
    // remove the hide settings set in css for the finish screen
    finishScreenEl.removeAttribute("class");
    finalScoreEl.textContent = timeCount;
    // make sure to hide the questions element. You have to set the attribute to hide which in the css says it will display no content
    questionEl.setAttribute("class", "hide");
    return;

}

function handleInitialsKeyup(event) {
    console.log('handleInitialsKeyup');
    console.log('event.target', event.target);
    console.log('event.key', event.key)
    if (event.key === 'Enter') {
        saveScores();
    }
    return;
}

function handleInitialsSubmit(event) {
    console.log('handleInitialsSubmit');

    saveScores();
}

function saveScores() {
    console.log('saveScores');
    //save the scores using local storage
    var initialsValue = initialsInputEl.value.trim();
    // get local storage items
    var scores = [];
    if (initialsValue) {
        scores = JSON.parse(localStorage.getItem('scores'));
        //console.log(scores);
        if (!scores) {
            scores = [];
        };

        var newScores = {
            score: timeCount,
            initials: initialsValue
        }
        console.log(scores);
        scores.push(newScores);
        localStorage.setItem('scores', JSON.stringify(scores));
    };

    location.href = "./highscores.html";

    return;

}

//event listeners are defined here
startBtn.addEventListener("click", startQuiz);
choicesEl.onclick = handleChoices;
//initialsInputEl.onkeyup = handleInitialsKeyup;
// same as code above
initialsInputEl.addEventListener('keyup', handleInitialsKeyup);
initialsSubmitBtn.addEventListener('click', handleInitialsSubmit);
