/**
 * Created by Gina on 7/7/2016.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 9;
var match_counter = 0;
var two_cards_clicked = false;

$(document).ready(function(){
    $('.card').on('click',card_clicked);
});
function card_clicked(e){
    if(two_cards_clicked){
        return;
    }
    if(first_card_clicked == null){
        $(this).find('.back').hide();
        first_card_clicked = $(this);
        first_card_clicked.off('click');
        console.log("first_card event handler off");
        return;
    }
    else{
        second_card_clicked = $(this);
        $(this).find('.back').hide();
        two_cards_clicked = true;
        if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')){
            match_counter += 1;
            second_card_clicked.off('click');
            console.log("second_card event handler off");
            first_card_clicked = null;
            second_card_clicked = null;
            two_cards_clicked = false;
            if(match_counter == total_possible_matched){
                var you_won = $('<div>').addClass("you_won").html("YOU WON!!! WOOHOO!!!");
                $('#game-area').append(you_won);
            }
            else{
                return;
            }
        }
        else{
            $('.card').off('click');
            console.log("all event handler off");
            setTimeout(var_reset,2000);
            return;
        }
    }
}
function var_reset(){
    console.log('all event handler is on');
    first_card_clicked.find('.back').show();
    second_card_clicked.find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    two_cards_clicked = false;
}
