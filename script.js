var first_card_clicked=null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

var matches = 0;
var attempts = 0;
var accuracy = 0;

var games_played = 0;

$(document).ready (function() {
    $('.back').click(card_clicked);//when back card is clicked
    $('.reset').click(reset_stats);
});
function card_clicked () {
    $(this).hide();//back card hide
    if (first_card_clicked == null) { //if first card is clicked
        first_card_clicked = $(this);//if first card = back
        return;
    }
    else {
        second_card_clicked = $(this);//if second card is click
        //attempts
        attempts++;
        $('.attempts > .value').text(attempts);
        if (($(first_card_clicked) .attr('class')) === ($(second_card_clicked).attr('class'))) //if first and second card is equal
        {
            match_counter++; //matches start counting
            matches++;
            $(".matching > .value").text(matches);

            var accuracy = (matches/attempts).toFixed(2)*100+('%'); //accuracy

            $('.accuracy > .value').text(accuracy);

            first_card_clicked = null;
            second_card_clicked = null;
            if (total_possible_matches == match_counter) {
                //display something if possible matches = match counter
                } else {
                    return; //if possible match not equal to match counter return to where?
                }
        }
        else {

            setTimeout(timeOut, 2000);
            return;
            }
        }
    }
function timeOut() {
    $(first_card_clicked).show ();
    $(second_card_clicked).show();
    first_card_clicked = null;
    second_card_clicked = null;
}

// function display_stats() {
//     $('.games-played .value').text(games_played); //insert var games_played into element class of value
//     $('.attempts .value').text(attempts);
//     $('.accuracy .value').text(accuracy);
//     console.log('dmcs');
//     return;
// }
function reset_stats (){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    games_played++;

    $('.back').show();
    $('.games-played .value').text(games_played);
    $('.attempts  .value').text(attempts);
    $(".matching > .value").text(matches);
    $('.accuracy > .value').text(accuracy);
    console.log('reset stats');
    return;
}


//------------------version 1.0--------------



// $(document).ready (function() {
//     console.log("loaded");
//     $('.back').click(card_matching);
// });
// function card_matching () {
//     if (($(first_card_clicked).attr('class')) === ($(second_card_clicked).attr('class'))) {
//         matches++;
//         $(".matching > .value").text(matches);
//     }return true;
// }
//
// function accurate (){
//     accuracy = matches/attempts;
//     var result = accuracy;
//     $('.accuracy > .value').text(result);
// }
// console.log (accurate);