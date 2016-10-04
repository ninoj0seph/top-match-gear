/**
 * Created by danh on 10/4/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 3;
var match_counter = 0;

$(document).ready(function(){

    $(".card").click(function(){
         //console.log("this is ", this);
         var that = $(this);
         card_clicked(that);
     });
})

function show_card(elem) {
    $(elem).find('.back').hide();
}

function hide_card(elem) {
    $(elem).find('.back').show();
}

function reset_and_shuffle_cards() {
    var all_cards = $(".card");
    hide_card(all_cards);
    match_counter = 0;
    $("#game-area").append($(".card:first-child"));
}

function card_clicked(elem) {
    // show the face card
    show_card(elem);

    // check if variable first_card_click is null
    if(first_card_clicked == null)
    {
        first_card_clicked = elem;
    } else {
        second_card_clicked = elem;

        if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src'))
        {
            console.log("true");
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter == total_possible_matches)
            {
                $("#game-area").html("You Win!");
            }

        } else {
            console.log("false");
            setTimeout(function() {
                hide_card(first_card_clicked);
                hide_card(second_card_clicked);
                first_card_clicked = null;
                second_card_clicked = null;
                reset_and_shuffle_cards();
            }, 2000);
        }
    }
}