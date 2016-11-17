var first_card_clicked=null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

$(document).ready (function() {
    console.log("loaded");
    $('.back').click(card_clicked);
});

function card_clicked () {
    $(this).hide();
    if (first_card_clicked == null) {
        first_card_clicked = $(this);
        console.log('first card is clicked');
        return;
    }
    else {
        second_card_clicked = $(this);
        console.log('second card is clicked');
        if ($(first_card_clicked).attr('class') === $(second_card_clicked).attr('class')) {
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (total_possible_matches == match_counter) {
                console.log("You have won!");
            } else {
                return;
            }
        } else {
            //this part is not working!
            //already debug
            function timeOut() {
                console.log('time out');
                $(first_card_clicked).toggleClass('hide_back');
                $(second_card_clicked).toggleClass('hide_back');
                first_card_clicked = null;
                second_card_clicked = null;

            }

            setTimeout(timeOut, 2000);
            if (first_card_clicked = true) {

            }
            return;
        }
    }
}
