
////global variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
////function to execute when clicked
function card_clicked(event) {
    console.log("FUNCTION START");
    var cardClicked = $(this);
    cardClicked.find(".back").addClass("hidden");
    console.log("CARD FLIPPED");
    if (first_card_clicked == null && !cardClicked.hasClass("revealed")) {
        first_card_clicked = cardClicked.addClass("revealed");
        console.log("FIRST CARD");
    } else if (cardClicked.hasClass("revealed")){
        return;
    } else {
        second_card_clicked = $(this).addClass("revealed");
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
                    src: "assets/mgsvr1.jpg"
                }).css({
                    margin: "auto",
                    display: "table"
                }).appendTo("#game-area");
            }
        } else {
            ////setTimeout(cardClicked)
            ////how negate other clicks
            console.log("BEFORE TIMER");
            (console.log("and now we wait"));
            setTimeout(resetState, 3000);
            console.log("AFTER TIMER");
        }
    }
    console.log("FUNCTION END");
}

function resetState(){
    console.log("TIMER IS DONE");
    $(first_card_clicked).removeClass("revealed").find(".back").removeClass("hidden");
    console.log("FLIPPED BACK OVER");
    $(second_card_clicked).removeClass("revealed").find(".back").removeClass("hidden");
    first_card_clicked = null;
    second_card_clicked = null;
    return console.log("try again");
}
$(document).ready(function(){
    console.log("DOC LOADED");
   $(".card").click(card_clicked);
});


