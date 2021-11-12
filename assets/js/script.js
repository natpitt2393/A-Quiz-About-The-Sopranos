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
var endScreenEl = document.getElementById("end-screen");
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
  console.log(currentQuestion);
  var questionText = currentQuestion.text;
  questionTextEl.textContent = questionText;
  console.log(questionText);



  choicesEl.innerHTML = "";
  var choicesArr = currentQuestion.choices
  // or choicesEl.textContent = "";
  for (var i = 0; i < choicesArr.length; i++) {
    var liEl = document.createElement('li');
    console.log(choicesArr[i]);
    liEl.setAttribute('value', choicesArr[i]);
    liEl.textContent = (i + 1) + ". " + choicesArr[i]
    choicesEl.appendChild(liEl);
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
    setTimeout(function() {
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
    clearInterval(timerId);
    var finishScreenEl = document.querySelector("#finish-screen");
    finishScreenEl.removeAttribute("class");
    var finalScoreEl = document.querySelector("#final-score");
    // decided to make it a bit harder for the user!
    finalScoreEl.textContent = timeCount * .5;
    questionEl.setAttribute("class", "hide");


}


startBtn.addEventListener("click", startQuiz);

choicesEl.onclick = handleChoices;
