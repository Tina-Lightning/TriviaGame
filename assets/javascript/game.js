// Declare some global variables
var counter = 5;
var currentQuestion = 0;
var questionsRight = 0;
var questionsWrong = 0;
var timer;

// This function makes the timer count down
function countDown() {
    counter--;
    $("#timer").html("Timer: " + counter);
    if (counter === 0) {
        timeUp();
    }
}

// when the timer reaches 0, this function runs
function timeUp() {
    clearInterval(timer);
    questionsWrong++;
    preloadImage('wrong');
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

    $("#timer").html("Timer: " + counter);

    $("#game").html("<h3>" + question + "</h3>" + loadChoices(choices) + remainingQuestions());

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
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
        //nextQuestion();
    } else {
        // player loses
        questionsWrong++;
        preloadImage('wrong');
        setTimeout(nextQuestion, 3 * 1000);
        //nextQuestion();
    }

});

// At the end of the game, display the questions you got right and wrong
function displayResults() {
    var result = "<p>You got " + questionsRight + " question(s) right</p><p>You got " + questionsWrong + " question(s) wrong</p><p>Out of " + quizQuestions.length + " total questions</p><button class='btn btn-primary' id='reset'>Reset Game</button>";

    $("#game").html(result);
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
    var remainingQuestions = quizQuestions.length - (currentQuestion + 1);
    var totalQuestions = quizQuestions.length;

    return "<p>Questions left " + remainingQuestions + "<p></p>Total Questions " + totalQuestions + "</p>"

}

// These are arrays of images to display when you get a question right or wrong
var positiveImages = [
    'assets/images/funny.gif'
    // Fill in more images later
]
var negativeImages = [
    'assets/images/sad.gif'
    // Fill in more images later
]

// Here we generate a random image from within the image arrays above
function randomImage(imagesArr) {
    var randomNum = Math.floor(Math.random() * imagesArr.length);
    var randomImage = imagesArr[randomNum];
    return randomImage;
}

// this is a function that loads the random image when you've selected an answer
function preloadImage(status) {

    // create a variable with the correct answer inside of it, we'll use that below
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    // display the correct answer and a fun image if you get it right
    if (status === 'win') {
        $("#game").html("<p class='preload-image'>You picked the right answer</p><p class='preload-image'>The correct answer is <strong>" + correctAnswer + "</strong><img src='" + randomImage(positiveImages) + "'/>");

        // display the correct answer and a sad image if you get it wrong
    } else {
        $("#game").html("<p class='preload-image'>You picked the wrong answer</p><p class='preload-image'>The correct answer is <strong>" + correctAnswer + "</strong><img src='" + randomImage(negativeImages) + "'/>");
    }
}

// Here we start the game by clicking the start button
$("#start").click(function () {
    $("#start").remove();
    $("#timer").html(counter);
    loadQuestion();
})
    