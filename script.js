/**
 * Created by Gina on 7/7/2016.
 */
//Declare and assign 3 global (see scope presentation) variables
////first_card_clicked assigned to null
////second_card_clicked assigned to null
////total_possible_matches assign to number of total possible matches (in this case 2)
////match_counter assigned to 0


var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 9;
var match_counter = 0;
var two_cards_clicked = false;

$(document).ready(function(){
//Add a click handler to each card by 1 of these 2 method
////jQuery - Intermediate
//////Add click method to a jQuery Selector with the parameter equal to a function called card_clicked
    //$('.card').click(card_clicked);
    $('.card').on('click',card_clicked);
});
//Declare card_clicked function in the script.js file with the following functionality in it
function card_clicked(e){
    if(two_cards_clicked){
        return;
        //if two_cards_clicked is true, or if two cards are selected, return
    }
    //Check if variable first_card_clicked is not null
    if(first_card_clicked == null){
        //Show the card face
        $(this).find('.back').hide();
        // if true - assign first_card_clicked equal to the html DOM Element that was clicked
        first_card_clicked = $(this);
        //remove event handler to avoid duplicate click
        first_card_clicked.off('click');
        console.log("first_card event handler off");
        //click handler functionality is complete, return
        return;
    }
    else{
        //if false - assign second_card_clicked to the html DOM Element that was clicked
        second_card_clicked = $(this);
        //Show the card face
        $(this).find('.back').hide();
        //setting two_cards_clicked to true to avoid 3rd click/event until other variables are reset to null;
        two_cards_clicked = true;
        //check if first_card_clicked is equivalent to the second_card_clicked
        if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')){
            //if true
            //increment match_counter by 1
            match_counter += 1;
            second_card_clicked.off('click');
            console.log("second_card event handler off");
            //reset both variables defined above to null again and then wait for next card click
            first_card_clicked = null;
            second_card_clicked = null;
            //if two cards are equal, first_card_clicked and second_card_clicked are null, available third card to be clicked
            //setting two_cards_clicked to false to allow additional cards to be clicked
            two_cards_clicked = false;
            /*  ------------------------------------------------------ */
            //check if match_counter is equivalent to total_possible_matches
            if(match_counter == total_possible_matched){
                //if true, Display a message to the user they have won
                var you_won = $('<div>').addClass("you_won").html("YOU WON!!! WOOHOO!!!");
                $('#game-area').append(you_won);
            }
            else{
                //if false: click handler functionality is complete, return
                return;
            }
        }
        else{
            //if false
            //Be wary of waiting programmatically but not being able to control the user from clicking on cards while the program waits execute the reset of the code
            //remove event handlers from all card class
            $('.card').off('click');
            console.log("all event handler off");
            //Wait 2 seconds then
            setTimeout(var_reset,2000);
            return;
        }
    }
}
function var_reset(){
    //put event handlers back on
    $('.card').on('click',card_clicked);
    console.log('all event handler is on');
    //Show card back on both elements that are flipped over
    first_card_clicked.find('.back').show();
    second_card_clicked.find('.back').show();
    //reset both card_clicked variables to null
    first_card_clicked = null;
    second_card_clicked = null;
    two_cards_clicked = false;
    //click handler functionality is complete, return
}

//all event handlers need to be off when two cards are not matched for 2 seconds
//after 2 seconds of pause, event handlers need to be put back on to all UNMATCHED CARD