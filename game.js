
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

//checked
$(document).keypress(function() {
    if (!started) { 
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

//checked
function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
     } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press A Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        
        startOver();
      }
}

//checked
$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//checked
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//checked
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
    }, 100);
}


//checked
function nextSequence(){
    
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//checked
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
