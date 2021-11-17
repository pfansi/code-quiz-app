// lets declare the variables that will handle the DOM elements
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var returnQuiz = document.querySelector("#returnQuiz");

// This Event listener will all the data in the Local storage about user highscores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// this method will assign the value of the local storage 
var scoreList = localStorage.getItem("scoreList");
scoreList = JSON.parse(scoreList);

// we check if there is any data in the local storage
if (scoreList !== null) {

    // We loop to collect all the data and render them on the page
    for (var i = 0; i < scoreList.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = scoreList[i].initials + " " + scoreList[i].userScore;
        highScore.appendChild(createLi);

    }
}
//This  Event listener will take back to the home page .
returnQuiz.addEventListener("click", function () {
    window.location.replace("index.html");
});