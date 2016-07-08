/**
 * Created by Gina on 7/7/2016.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2; //total possible matches
var match_counter = 0;


function card_clicked(e){
    $(this).find(".back").hide(); //"this" is the element that the event was triggered on
    if(first_card_clicked == null){
        first_card_clicked = $(this);
        return first_card_clicked; //first card set
    }
    else{
        second_card_clicked = $(this); //second card is also set
        if(first_card_clicked.find('.front').find('img').attr('src') == second_card_clicked.find('.front').find('img').attr('src')){//if first and second picked imgs are same,
            //how come we cannot compare first_card_clicked and second_card_clicked directly? why do we have to find the actual src and compare them?
            match_counter += 1; //increment match_counter by 1
            console.log(match_counter); //for testing
            first_card_clicked = null; //set first_card_clicked null to start fresh
            second_card_clicked = null; //set second_card_clicked null to start fresh
            if(match_counter == total_possible_matches){
                alert('you won!');
            }
            else{
                //click handler functionality is complete, return
                return //maybe unnecessary?
            }
        }
        else{
            first_card_clicked.find('.back').show(); //to flip it
            second_card_clicked.find('.back').show(); //to flip it
        }
    }


}

$(document).ready( function(){
    $(".card").click(card_clicked);
});