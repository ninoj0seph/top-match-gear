//TODO add flip effects?, and a sound effect or two, fix game aread width?

////global variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var canClick = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
////SOUND FILES
var snakeSound = document.createElement("audio");
snakeSound.src = "assets/sounds/found.wav";
var gameOver = document.createElement("audio");
gameOver.src = "assets/sounds/impressive.mp3";
var codecOver = document.createElement("audio");
codecOver.src = "assets/sounds/codecover.wav";
var gameStart = document.createElement("audio");
gameStart.src = "assets/sounds/codeccall.wav";
gameStart.autoplay = true;
var wrongPair = document.createElement("audio");
wrongPair.src = "assets/sounds/doorbuzz.wav";
var resetSound = document.createElement("audio");
resetSound.src = "assets/sounds/exit.wav";
var footPrint = document.createElement("audio");
footPrint.src = "assets/sounds/footprint.wav";
////function to execute when clicked
function card_clicked(event) {
    var thisCard = $(event);
    thisCard.find(".back").addClass("hidden");
    if (first_card_clicked == null && !thisCard.hasClass("revealed")) {
        first_card_clicked = thisCard.addClass("revealed");
        if (first_card_clicked.find(".front > img").attr('src') == "assets/images/soldiers.jpg"){
            footPrint.play();
        }
    } else if (thisCard.hasClass("revealed")){
        return;
    } else {
        second_card_clicked = $(event).addClass("revealed");
        attempts++;
        accuracy = Math.round((matches/attempts) * 100);
        display_stats();
        if (first_card_clicked.find(".front > img").attr('src') === second_card_clicked.find(".front > img").attr('src') && matches < total_possible_matches) {
            snakeSound.play();
            matches++;
            if (second_card_clicked.find(".front > img").attr('src') == "assets/images/mantis.jpg"){
                $(".card").shuffle();
            }
            first_card_clicked = null;
            second_card_clicked = null;
            if (matches === total_possible_matches) {
                $(".card").css({
                    display: "none"
                });
                $(".victory").css({
                    display: "table"
                });
                gameOver.play();
            }
        } else {
            canClick = false;
            wrongPair.play();
            setTimeout(resetState, 2000);
        }
    }
}
///FUNCTION TO RESET MISMATCH
function resetState(){
    first_card_clicked.removeClass("revealed").find(".back").removeClass("hidden");
    second_card_clicked.removeClass("revealed").find(".back").removeClass("hidden");
    first_card_clicked = null;
    second_card_clicked = null;
    canClick = true;
    resetSound.play();
}
////CARD CLICK HANDLER
$(document).ready(function () {
    $(".card").shuffle().click(function () {
        if (canClick){
           card_clicked(this);
        } else {
            return console.log("stop it");
        }
    });
});
////STATS FUNCTION
function display_stats() {
    $(".games-played > .value").text(games_played);
    $(".attempts > .value").text(attempts);
    $(".accuracy > .value").text(accuracy + '%');
}
$(document).ready(display_stats);
///reset stats
function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}
///REST CLICK HANDLER
$(document).ready(function () {
    $(".reset").click(function () {
        games_played++;
        reset_stats();
        display_stats();
        $(".victory").css({
            display: "none"
        });
        $(".card").shuffle().removeClass("revealed").css({
            display: "inline-block"
        }).find(".back").removeClass("hidden");
        codecOver.play();
    });
});
////shuffle plugin
(function ($) {
    $.fn.shuffle = function () {
        var allElems = this.get(),
            getRandom = function (max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function () {
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });
        this.each(function (i) {
            $(this).replaceWith($(shuffled[i]));
        });
        return $(shuffled);
    };
})(jQuery);
///sound effects?