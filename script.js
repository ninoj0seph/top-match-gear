
////global variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var canClick = true;
////function to execute when clicked
function card_clicked(event) {
    console.log("FUNCTION START");
    var thisCard = $(event);
    thisCard.find(".back").addClass("hidden");
    console.log("CARD FLIPPED");
    if (first_card_clicked == null && !thisCard.hasClass("revealed")) {
        first_card_clicked = thisCard.addClass("revealed");
        console.log("FIRST CARD");
    } else if (thisCard.hasClass("revealed")){
        return;
    } else {
        second_card_clicked = $(event).addClass("revealed");
        console.log("SECOND CARD");
        if (first_card_clicked.find(".front > img").attr('src') === second_card_clicked.find(".front > img").attr('src') && match_counter < total_possible_matches) {
            console.log("THESE CARDS MATCH");
            match_counter++;
            console.log(match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
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
            (console.log("and now we wait"));
            setTimeout(resetState, 2000);
        }
    }
    console.log("FUNCTION END");
}
///FUNCTION TO RESET MISMATCH
function resetState(){
    console.log("START TIMER");
    first_card_clicked.removeClass("revealed").find(".back").removeClass("hidden");
    console.log("FLIPPED BACK OVER");
    second_card_clicked.removeClass("revealed").find(".back").removeClass("hidden");
    first_card_clicked = null;
    second_card_clicked = null;
    console.log("TIMER IS DONE?");
    console.log("try again");
    canClick = true;
}
////CLICK HANDLER
$(document).ready(function () {
    console.log("DOC LOADED");
    console.log("you can click");
    $(".card").click(function () {
        if (canClick){
           card_clicked(this);
        } else {
            return console.log("no good");
        }
    });
});

