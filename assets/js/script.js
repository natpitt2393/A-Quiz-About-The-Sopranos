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
var questionsEl = document.getElementById("questions");
var timerEl = document.querySelector("#time");
var questionsTextEl = document.getElementById("questions-text");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-screen");
var initialsInputEl = document.getElementById("initials");
var initialsSubmitBtn = document.getElementById("submit");





function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "display");
    // start the timer
    timerId = setInterval(runTick, 1000);
    // ask questions
    askQuestions();
    

};

function askQuestions() {
  var currentQuestion = questions[quizQuestionsIndex];
  console.log(currentQuestion);
  var questionText = currentQuestion.text;
  questionsTextEl.textContent = questionText;

  //quizQuestionsIndex++;

  choicesEl.innerHTML = "";
  var choicesArr = currentQuestion.choices
  // or choicesEl.textContent = "";
  for (var i = 0; i < choicesArr.length; i++) {
    var liEl = document.createElement('li');
    console.log(choicesArr[i]);
    liEl.setAttribute('value', choicesArr[i]);
    liEl.textContent = choicesArr[i];
    liEl.textContent(i + 1) + " ." + choicesArr[i]
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

startBtn.addEventListener("click", startQuiz);