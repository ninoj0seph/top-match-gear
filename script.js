var first_card_clicked=null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

var matches = 0;
var attempts = 0;//Every time a user attempts a match (clicks the 2nd card) the attempts should be incremented by 1
var accuracy = 0;//Accuracy is defined as a percentage of matches / attempts

var games_played = 0;


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
        //attempts
        attempts++;
        $('.attempts > .value').text(attempts);
        console.log ('helloo');

        console.log('result accurate');

        console.log('second card is clicked');
        if (($(first_card_clicked) .attr('class')) === ($(second_card_clicked).attr('class')))
        {
            //matches counts
            match_counter++;
            matches++;
            $(".matching > .value").text(matches);
            //accuracy
            var accuracy = (matches/attempts)*100+('%');

            $('.accuracy > .value').text(accuracy);

            first_card_clicked = null;
            second_card_clicked = null;
            if (total_possible_matches == match_counter) {
                console.log("You have won!");
                } else {
                    return;
                }
        }
        else {

            setTimeout(timeOut, 2000);

            return;
            }
        }
    }
function timeOut() {
    console.log (' time out ');
    $(first_card_clicked).show ();
    $(second_card_clicked).show();
    first_card_clicked = null;
    second_card_clicked = null;
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