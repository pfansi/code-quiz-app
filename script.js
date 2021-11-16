// This script page will take the correct answer and set them in the local storage.
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
var questionQuiz = document.querySelector(".questionsQuiz");
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
// creating a function that will compare the user choice to the correct answer
function compare(event) {
    var eventEl = event.target;

    if (eventEl.matches("li")) {

        var divEl = document.createElement("div");
        divEl.setAttribute("id", "divEl");

        // check if the answer is correct them increment the user score
        if (eventEl.textContent == questions[questionIndex].questionAnswer) {
            userScore++;
            divEl.textContent = "Hooray! The Correct answer is:  " + questions[questionIndex].questionAnswer;
            
        } else {
            // if the answer is wrong then 10 second will be deducted to the timer
            totalTime = totalTime - timeDeduction;
            divEl.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].questionAnswer;
        }

    }
    // the loop will increment to the next question
    questionIndex++;

    if (questionIndex >= questions.length) {
        // this condition will trigger the game over function
        gameOver();

        // this will print the final user score in the new div
        divEl.textContent = "Game Over!" + " " + "You got  " + userScore + "out of" + questions.length + " Correct!";
    } else {
        showQuestion(questionIndex);
    }

    questionQuiz.appendChild(divEl);

}

// we are creating the game over function  that will append these elements
function gameOver() {
    questionQuiz.innerHTML = "";
    runTimer.innerHTML = "";

    // creating a Title header
    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "Game Over!"

    questionQuiz.appendChild(h1El);

    // creating a paragraph
    var pEl1 = document.createElement("p");
    pEl1.setAttribute("id", "pEl1");

    questionQuiz.appendChild(pEl1);

    // Calculates time remaining and replaces it with score
    if (totalTime >= 0) {
        var timeLeft = totalTime;
        var pEl2 = document.createElement("p");
        clearInterval(intervalTimer);
        pEl2.textContent = "Your final score is: " + timeLeft;

        questionQuiz.appendChild(pEl2);
    }

    // creating a label
    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "labelEl");
    labelEl.textContent = "Enter your initials: ";

    questionQuiz.appendChild(labelEl);

    // creating input element
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    inputEl.textContent = "";

    questionQuiz.appendChild(inputEl);

    // creating a submit button
    var submitEl = document.createElement("button");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "Submit");
    submitEl.textContent = "Submit";

    questionQuiz.appendChild(submitEl);

    // after a click this function will set or retrieve data from the local storage
    submitEl.addEventListener("click", function () {
        var initials = inputEl.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var scoreArr = {
                initials: initials,
                userScore: timeLeft
            }
            console.log(scoreArr);

            var saveScores = localStorage.getItem("saveScores");
            if (saveScores === null) {
                saveScores = [];
                
            } else {
                saveScores = JSON.parse(saveScores);
            }

            saveScores.push(scoreArr);

            var newScore = JSON.stringify(saveScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}

