
////global variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
////function to execute when clicked
function card_clicked(event) {
    console.log("FUNCTION START");
    var cardback1 = $(this).addClass("hidden");
    console.log("CARD FLIPPED");
    ////the first card should be null then defined. how do i do that?
    if (first_card_clicked == null) {
        first_card_clicked = cardback1;
    } else {
        second_card_clicked = $(this);
        ////how do i accurately check if the images have the same source
        if (first_card_clicked.children('img').attr('src') === second_card_clicked.children('img').attr('src') && match_counter < 3) {
            console.log("THESE CARDS MATCH");
            match_counter++;
            console.log(match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                ////this bit needs to be made fancy
                console.log("you won");
            } else {
               ///how breakout without the console log?
                console.log("keep matching");
            }
        } else {
            ////how wait
            ////how negate other clicks
            console.log("wait");
            $(first_card_clicked).removeClass("hidden");
            $(second_card_clicked).removeClass("hidden");
            first_card_clicked = null;
            second_card_clicked = null;
            return console.log("try again");
        }
    }
    console.log("FUNCTION END");
}
$(document).ready(function(){
    console.log("DOC LOADED");
   $(".back").click(card_clicked);
});

/*
 ($(this).children('img').attr('src'));
 */

//if click count = 1 give class of whatever?
