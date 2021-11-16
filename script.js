// This script page will take the corect answer and set them in the local storage.
//


//let declare a variable array dans will hold a serie of object 
var questions = [
    {
        questionTitle: "Which one these answer is not a javascript data types?:",
        questionChoices: ["number", "string", "prompt", "boolean"],
        questionAnswer: "prompt"
    },
    {
        questionTitle: "What is if and if else in javascript ",
        questionChoices: ["quotations", "intergers", "conditional statements", "methods"],
        questionAnswer: "conditional statements"
    },
    {
        questionTitle: "In javascript , an array can used to store",
        questionChoices: ["methods", "Events", "functions", "None of these"],
        questionAnswer: "None of these"
    },
    {
        questionTitle: "Objects are variables that can contains many ____ ",
        questionChoices: ["methods", "brackets", "values", "statements"],
        questionAnswer: "values"
    },
    {
        questionTitle: "javascript file extension en up with ____",
        questionChoices: ["png", "pdf", "js", "css"],
        questionAnswer: "js"
    },

];
// let declare the default values of the variables that will hold the user score
var userScore = 0;

var questionIndex = 0;
// let declare and assign variable to the page DOM
var runTimer = document.querySelector("#runTimer");
var startQuiz = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector(".questionsQuiz");
var wrapper = document.querySelector("#wrapper");

// let declare the total time of the quiz
var totalTime = 75;
//variable that set the value of the timer by default
var intervalTimer = 0;
// variable that will the deduction time in case of incorect answer.
var timeDeduction = 10;

// Creates new element
var ulEl = document.createElement("ul");

// This event listener will triger a function that will start the timer or the quiz
startQuiz.addEventListener("click", function () {
    // if the timer is  equal to zero , the decremented value of the timer will 
    // set in the local storage
    if (intervalTimer === 0) {
        intervalTimer = setInterval(function () {
            totalTime--;
            runTimer.textContent = "Timer: " + totalTime;
             
            // this condition will stop the quiz when the timer reach 0
            if (totalTime <= 0) {
                clearInterval(intervalTimer);
                gameOver();
                runTimer.textContent = "Game Over!";
            }
        }, 1000);
    }
    // this called function will show question to the user
    showQuestion(questionIndex);
});

// create function that will show questions and answer choices to the user
function showQuestion(questionIndex) {

    // Let set the default value of our HTML DOM to empty
    questionQuiz.innerHTML = "";
    ulList.innerHTML = "";

    // This will loop into the Array and list the questions and the multichoice answer
    for (var i = 0; i < questions.length; i++) {
        
        var listQuestion = questions[questionIndex].questionTitle;
        var listChoices = questions[questionIndex].questionChoices;
        questionQuiz.textContent = listQuestion;
    }
    // this will list all the multichoice answer and call a compare function
    //whenever the user make his choice
    listChoices.forEach(function (newAnswer) {
        var listAnswer = document.createElement("li");
        listAnswer.textContent = newAnswer;
        questionQuiz.appendChild(ulEl);
        ulEl.appendChild(listAnswer);
        listAnswer.addEventListener("click", (compare));
    })
}
