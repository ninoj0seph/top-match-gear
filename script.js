//TODO randomize cards, add flip effects?, and a sound effect or two, get stats to appear and update, make button work, play again button??? fix game aread width, FIGURE OUT HOW TO MATH. add to reset button.

////global variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var canClick = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;

////function to execute when clicked
function card_clicked(event) {
    ///console.log("FUNCTION START");
    var thisCard = $(event);
    thisCard.find(".back").addClass("hidden");
    ///console.log("CARD FLIPPED");
    if (first_card_clicked == null && !thisCard.hasClass("revealed")) {
        first_card_clicked = thisCard.addClass("revealed");
        ///console.log("FIRST CARD");
    } else if (thisCard.hasClass("revealed")){
        return;
    } else {
        second_card_clicked = $(event).addClass("revealed");
        attempts++;
        ///console.log("SECOND CARD");
        if (first_card_clicked.find(".front > img").attr('src') === second_card_clicked.find(".front > img").attr('src') && matches < total_possible_matches) {
            ///console.log("THESE CARDS MATCH");
            matches++;
            ///console.log(match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (matches === total_possible_matches) {
                $(".card").css({
                    display: "none"
                });
                $("#game-area").append("<p>YOU WON</p>");
                $("<img>").attr({
                    src: "assets/images/mgsvr1.jpg"
                }).css({
                    margin: "auto",
                    display: "table"
                }).appendTo("#game-area");
            }
        } else {
            ////how negate other clicks
            canClick = false;
            ///(console.log("and now we wait"));
            setTimeout(resetState, 2000);
        }
    }
    ///console.log("FUNCTION END");
}
///FUNCTION TO RESET MISMATCH
function resetState(){
   /// console.log("START TIMER");
    first_card_clicked.removeClass("revealed").find(".back").removeClass("hidden");
   /// console.log("FLIPPED BACK OVER");
    second_card_clicked.removeClass("revealed").find(".back").removeClass("hidden");
    first_card_clicked = null;
    second_card_clicked = null;
   /// console.log("TIMER IS DONE?");
  ///  console.log("try again");
    canClick = true;
}
////CARD CLICK HANDLER
$(document).ready(function () {
    ///console.log("DOC LOADED");
    ///console.log("you can click");
    var games_played = 0; ///add to reset button!!!
    $(".card").click(function () {
        if (canClick){
           card_clicked(this);
        } else {
            return console.log("stop it");
        }
    });
});
////STATS FUNCTION
function display_stats() {
    ///gamesplayes -> .games-played .value
    ///attempts ->attempts .value
    ///format accuracy = (matches/attempts)% HOW MATH WORKS?
    ///accuracy ->.accuracy .value
}
function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}
///REST CLICK HANDLER
$("<button>").click(function () {
    games_played++;
    reset_stats();
    display_stats();
    ///reset game area
});
