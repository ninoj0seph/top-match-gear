
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
    if (first_card_clicked == null) {
        first_card_clicked = cardClicked;
        console.log("FIRST CARD");
    } else {
        second_card_clicked = $(this);
        console.log("SECOND CARD");
        if (first_card_clicked.find(".front > img").attr('src') === second_card_clicked.find(".front > img").attr('src') && match_counter < total_possible_matches) {
            console.log("THESE CARDS MATCH");
            match_counter++;
            console.log(match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                ////this bit needs to be made fancy
                console.log("you won");
            }
        } else {
            ////how wait
            ////how negate other clicks
            console.log("wait");
            $(first_card_clicked).find(".back").removeClass("hidden");
            console.log("FLIPPED BACK OVER");
            $(second_card_clicked).find(".back").removeClass("hidden");
            first_card_clicked = null;
            second_card_clicked = null;
            return console.log("try again");
        }
    }
    console.log("FUNCTION END");
}
$(document).ready(function(){
    console.log("DOC LOADED");
   $(".card").click(card_clicked);
});


