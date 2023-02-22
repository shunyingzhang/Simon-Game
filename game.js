var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
    }
});

function nextSequence() {

    level++;
    $("#level-title").text("level " + level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(buttonColour) {
    var sound = new Audio("sounds/" + buttonColour + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    start = false;
    level = 0;
}
