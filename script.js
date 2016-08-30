var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var total_possible_matches = 12;
var card_face = null;
var cards_can_be_clicked = true;
var cards_matched = [];

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function () {
    $('.reset').click(function () {
        reset();



    });
    randomize_cards();
    $(".card").click(card_clicked);
    dispaly_stats();
});
function reset(){
    console.log("you clicked reset: ");
    $('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    card_face = null;
    console.log("games_played", games_played);
    attempts = null;
    accuracy = null;
    match_counter = 0;
    cards_matched = [];
    randomize_cards();
    games_played++;
    $(".games_played .value").text(games_played);
}
function dispaly_stats() {
    $(".games_played .value").text(games_played);
    $(".attempts .value").text(attempts);
    $(".accuracy .value").text(accuracy);

}
{

}


function cards_inArrya() {           //function to check if the card matched up they store in the matched array and checked if the card u ckicked will match cards in the array
    for (var i = 0; i < cards_matched.length; i++) {
        console.log("checking_card_match!!!!!", cards_matched[i]);
        if (card_face[0] == cards_matched[i][0]) {     // card_face is an jquery object  will compare to 1st element in the array
            console.log(' card matched up already');
            return true
        } else {
            console.log("cards not matched up");

        }
    }
    return false
}

function randomize_cards() {   //function to randomize the cards
    var cards = $('.card');  //assign card
    var new_cards = [];
    while (cards.length > 0) {  // started at length ended at 0
        var random_num = Math.floor(Math.random() * cards.length);  //random number
        new_cards.push(cards[random_num]);  //push random card from the random number index to new array
        cards.splice(random_num, 1);  // take away the random card from the old array
    }
    $('.game_area').append(new_cards);   // store new array to html
    //$(cards[random_num]).appendTo('.game_area');
}

function card_clicked() {     // function will run when any card clicked


    if (!cards_can_be_clicked) {      //if it is  true it will quit and nothing will happen
        console.log('cannot click, cards are flipping back');
        return;
    }
    card_face = $(this).find('.back').prev();          //assign the card  with the picture (front);
    cards_inArrya();
    if (cards_inArrya() == true) {
        return;
    }
    if (first_card_clicked != null && card_face[0] == first_card_clicked[0]) {  //if the 1st card assigned already and 1st card = 1st nothing will happen it will quit
        console.log('this card was already clicked');
        return;
    }
    // console.log('card_face', card_face);

    $(this).find(".back").hide();                      //hide the back card and auto will show the front card

    if (first_card_clicked == null) {
        first_card_clicked = card_face;              // assign the card with the picture
        console.log("card assigned", first_card_clicked);
        return;
    } else if (second_card_clicked != null && card_face[0] == second_card_clicked[0]) {
        return;
    } else {

        second_card_clicked = card_face;            // assign the second card with the picture

        var first_card_element = first_card_clicked.find('img').attr("class");   // target the image source
        console.log("1st car assign: ", first_card_element);
        var second_card_element = second_card_clicked.find("img").attr("class");  // target the image source
        console.log("2nd car assign: ", second_card_element);

        attempts++;
        $(".attempts .value").text(attempts);

        if (first_card_element == second_card_element) {   // compare the images
            match_counter++;    // cards_inArrya(); // counter increase by 1 and assign count to 1
            matches++;
            accuracy =  matches / attempts;
            $(".accuracy .value").text(accuracy);
            console.log(match_counter);
            cards_matched.push(first_card_clicked, second_card_clicked);

            console.log(cards_matched);
            first_card_clicked = null;             //since the cards match assign everything to null
            second_card_clicked = null;
            if (match_counter == total_possible_matches) {   //will check condition counter and max counter

                reset();
                console.log('YOU SMART, know you can travel the world!!!')
            }
            else {
                return;
            }
        }

        else {
            cards_can_be_clicked = false;
            console.log("The images not matching");
            setTimeout(do_time, 2000);
        }
    }
}
function do_time() {   //function that flip the cards back t othe back side and assign everything to null;
    first_card_clicked.next().show();
    second_card_clicked.next().show();
    cards_can_be_clicked = true;
    first_card_clicked = null;
    second_card_clicked = null;

}


