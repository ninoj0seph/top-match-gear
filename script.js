/**
 * Created by rosemariegonzales on 7/6/16.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;

$(document).ready(function () {
    $(".back").click(card_clicked());
    $(".reset").click(function () {
        location.reload;
    });
});

function card_clicked() {
    $(this).addClass("front");
    if (first_card_clicked == null) {
        first_card_clicked = $(this);
        return first_card_clicked;
    }
    else {
        second_card_clicked = $(this);
        return second_card_clicked;
    }
    if (first_card_clicked == second_card_clicked) {
        return true;
        match_counter++;
        first_card_clicked = null;
        second_card_clicked = null;
    }
    else {
        first_card_clicked.addClass("back");
        second_card_clicked.addClass("back");
        first_card_clicked = null;
        second_card_clicked = null;
        return false;
    }
}
