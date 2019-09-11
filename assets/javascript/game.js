// Declare some global variables
var counter = 5;
var currentQuestion = 0;
var questionsRight = 0;
var questionsWrong = 0;
var timer;

// This function makes the timer count down
function countDown() {
    counter--;
    $("#timer").html("Time Left: " + counter);
    if (counter === 0) {
        timeUp();
    }
}

// when the timer reaches 0, this function runs
function timeUp() {
    clearInterval(timer);
    questionsWrong++;
    theAnswer('wrong');
    setTimeout(nextQuestion, 3 * 1000);
    //nextQuestion();
}

// if the timer is over, go to the next question
function nextQuestion() {

    // make sure there are still questions in the array
    var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;

    // if there are no more questions, then the game is over
    if (isQuestionOver) {
        // 
        console.log("Game Over");
        displayResults();

        // if there are more questions, load the next one
    } else {
        currentQuestion++;
        loadQuestion();
    }

}

// This function loads the question, the choices, the timer and the number of remaining questions
function loadQuestion() {
    counter = 5;
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    $("#timer").html("Time Left: " + counter);

    $("#game").html("<h3 class='quiz-quest' >" + question + "</h3>" + loadChoices(choices) + remainingQuestions());

    $( "#more-info" ).empty();

};

// this function loads the possible choices that go along with each question
// this function is used within the function above
function loadChoices(choices) {
    var result = "";

    for (var i = 0; i < choices.length; i++) {
        result += "<p class='choice' data-answer='" + choices[i] + "'>" + choices[i] + "</p>";
    }
    return result;
}

// page is loaded dynamically, so we need to listen to the document
// this is what happens when you click one of the choices
$(document).on("click", ".choice", function () {

    clearInterval(timer);

    // when you click you collect the value of data-answer, one of them is correct
    var selectedChoice = $(this).attr("data-answer");

    // now we check if the selected answer equals the correct answer
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (selectedChoice === correctAnswer) {
        // player wins
        questionsRight++;
        theAnswer('win');
        $( "#timer" ).empty();
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        // player loses
        questionsWrong++;
        theAnswer('wrong');
        $( "#timer" ).empty();
        setTimeout(nextQuestion, 3 * 1000);
    }

});

// At the end of the game, display the questions you got right and wrong
function displayResults() {

    var finalScore = (questionsRight/quizQuestions.length);
    console.log(finalScore);

    var imgResult = "";

    if (0.9 < finalScore ) {
        console.log("you got above 90%!");
        imgResult = "<img class='img-fluid' src='assets/images/reaction-6.gif' /><p class='witticism'>You made it nice! You know your ladies - Andy Cohen would be impressed!<p>";
    } else if ( 0.75 < finalScore  && finalScore < 0.90) {
        console.log("you got between 75-90%");
        imgResult = "<img class='img-fluid' src='assets/images/reaction-5.gif' /><p class='witticism'>Woohoo! Well done, you don't need Jesus to fix much!<p>";
    } else if ( 0.60 < finalScore  && finalScore < 0.75) {
        console.log("you got between 60-75%");
        imgResult = "<img class='img-fluid' src='assets/images/reaction-4.gif' /><p class='witticism'>Well, someone might. You did okay, but there is room for improvement.<p>";
    } else if ( 0.45 < finalScore  && finalScore < 0.60) {
        console.log("you got between 45-60%");
        imgResult = "<img class='img-fluid' src='assets/images/reaction-3.gif' /><p class='witticism'>It's hard to impress Heather and you definitely didn't today. You'll never score an invitation to her mansion now.<p>";
    } else if ( 0.30 < finalScore  && finalScore < 0.45) {
        console.log("you got between 30-45%");
        imgResult = "<img class='img-fluid' src='assets/images/reaction-2.gif' /><p class='witticism'>Wow, Bethenny, wow, what a poor performance.<p>";
    } else {
        console.log("You got below 30%");
        imgResult = "<img class='img-fluid' src='assets/images/reaction-1.gif' /><p class='witticism'>What Vicki said.<p>";
    }

    var result = "<p>You got " + questionsRight + " question(s) right out of " + quizQuestions.length + " total questions</p><button class='btn btn-warning btn-lg btn-block' id='reset'>Reset Game</button>";

    $("#game").html(result);

    $( "#timer" ).empty();
    //$( "#more-info" ).empty();
    $("#more-info").html(imgResult);
    
}

// When you click the reset button, the whole game starts over
$(document).on("click", "#reset", function () {
    console.log("testing");
    counter = 5;
    currentQuestion = 0;
    questionsRight = 0;
    questionsWrong = 0;
    timer = null;

    loadQuestion();
});

// this function shows how many questions remain (this seems unnecessary and confusing, not sure if I'll keep it)
function remainingQuestions() {
    var questionUROn = currentQuestion + 1;
    var totalQuestions = quizQuestions.length;

    return "<p>Question " + questionUROn + " of " + totalQuestions + "</p>"

}

// this is a function that loads the random image when you've selected an answer
function theAnswer(status) {

    // create a variable with the correct answer inside of it, we'll use that below
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    // display the correct answer and a fun image if you get it right
    if (status === 'win') {
        $("#more-info").html("<p class='correct'>Correct!</p><p>The correct answer is " + correctAnswer + "</p>");

        // display the correct answer and a sad image if you get it wrong
    } else {
        $("#more-info").html("<p class='incorrect'>Wrong :(</p><p>The correct answer is " + correctAnswer + "</p>");
    }
}

// Here we start the game by clicking the start button
$("#start").click(function () {
    $("#start").remove();
    $("#timer").html(counter);
    loadQuestion();
})
    