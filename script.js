/**
 * Created by Gina on 7/7/2016.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2; //total possible matches
var match_counter = 0;
var two_cards_clicked = false;

$(document).ready(function () {
    $('.card').on('click', card_clicked);
    // $(".card").click(card_clicked);
});
function card_clicked(e) {
    console.log(e);//e is the event object
    if (two_cards_clicked) {
        return;
    }
    if (first_card_clicked == null) {
        $(this).find('.back').hide();
        first_card_clicked = $(this);
        console.log("first card back hidden");
        first_card_clicked.off('click');
    }
    else {
        two_cards_clicked = true;
        $(this).find('.back').hide();
        second_card_clicked = $(this);
        console.log("second card back hidden");
        if (first_card_clicked.find('.front').find('img').attr('src') == second_card_clicked.find('.front').find('img').attr('src')) {
            two_cards_clicked = false;
            match_counter += 1;
            console.log("cards matched!");
            second_card_clicked.off('click');
            //the event handler 'click' is on 'card' element which the event was triggered. (this)
            console.log("event handlers on matched card removed");
            //remove event handler off();
            if (total_possible_matches == match_counter) {
                var hello = $('<div>').addClass("you_won").html("You Won WOOHOO!")
                $('#game-area').append(hello);
            }
            else {
                first_card_clicked = null;
                second_card_clicked = null;
                return;
            }
        }
        else {
            setTimeout(reset_values, 2000);
            return;
        }
    }
}
function reset_values() {
    two_cards_clicked = false;
    first_card_clicked.on('click', card_clicked);
    second_card_clicked.on('click', card_clicked);
    first_card_clicked.find('.back').show(); //to flip it back
    second_card_clicked.find('.back').show(); //to flip it back
    first_card_clicked = null;
    second_card_clicked = null;
}

