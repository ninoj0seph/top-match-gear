// You need to declare variables and functions in the global environment
//Global Variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;


//Initiate card clicked function
$(document).ready(function() {
    $('.card').on('click',card_clicked);
});

function card_clicked() {

    //if this is the first card clicked reveal it
    if (first_card_clicked === null){
        first_card_clicked = $(this).find('.front').find('img').attr('src');
        $(this).find('.back').hide();
        return first_card_clicked;
    }else if (second_card_clicked === null){
        second_card_clicked = $(this).find('.front').find('img').attr('src');
        $(this).find('.back').hide();
            if (first_card_clicked === second_card_clicked) {
                match_counter++;
                checkScore();
            } else {
                setTimeout(flipCardBack, 2000);
            }
    }else
        return false;
}

//  Covers the cards that did not match
function flipCardBack(){
    $('.back').show();
    setTimeout(resetCards, 100)
}

//  Resets the values of the cards to null
function resetCards() {
    first_card_clicked = null;
    second_card_clicked = null;
}

// Checks the score and notifies user they if won
function checkScore(){
    if (match_counter>=total_possible_matches){
        $(".notification-area").text("YOU HAVE WON!");
    } else{
        resetCards();
    }
}

