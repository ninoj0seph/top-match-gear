var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var matching_counter = 0;

$(document).ready(function () {
    $(".card").click(card_clicked);
});
function card_clicked() {
   $(this).find(".back").hide();
    if (first_card_clicked = null) {
       return first_card_clicked = $(this);
    } else {
        return second_card_clicked = $(this);
        if (first_card_clicked === second_card_clicked){
            console.log("yay");
        }
    }
};