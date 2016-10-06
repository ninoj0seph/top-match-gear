/**
 * Created by danh on 10/4/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var stats = {};

    stats.matches = 0;
    stats.attempts = 0;
    stats.accuracy = 0;
    stats.games_played = 0;

function display_stats() {
    $('.games-played .value').text(stats.games_played);
    $('.attempts .value').text(stats.attempts);
    stats.accuracy = stats.matches / stats.attempts;
    var formatted_accuracy = format_accuracy(stats.accuracy);
    $(".accuracy .value").text(formatted_accuracy);
}

function format_accuracy(digit) { // displays accuracy as decimal and percentage
    console.log("Digit is " + digit.toFixed(4));
    return (digit.toFixed(4) * 100) + "%";
}

function reset_stats() {
    stats.games_played++;
    display_stats();
    stats.accuracy = 0;
    stats.matches = 0;
    stats.attempts = 0;
    match_counter = 0;
}



$(document).ready(function(){

    apply_card_event_handlers();

    $('button.reset').click(function() {
        //console.log("reset is fired");
        reset_stats();
        reset_and_shuffle_cards();
    });

})

function apply_card_event_handlers() {

    $('.card').click(function(){
        //console.log("this is ", this);
        var that = $(this);
        card_clicked(that);
    });
}

function show_card(elem) {
    $(elem).find('.back').hide();  // hides the back so that the front can show
    //console.log(elem);
    //$(elem).attr('class','noclick');
    $(elem).unbind('click'); // disables the card_clicked call to this card

    $(elem).click(function(){ // assigns a new function that shakes the card indicating you cannot choose this anymore
        //console.log("Cannot!");
        $(this).shake();
    });
}

function hide_card(elem) {
    $(elem).find('.back').show(); // show the back of the card to hide the front
    //$(elem).attr('class','card');
    $(elem).unbind('click'); // unbind the Shake function from this card
    apply_card_event_handlers(); //reapply the event handlers again
}

function reset_and_shuffle_cards() { // currently does not shuffle
    $(".card").css('opacity','1');
    $("#win").hide();
    var all_cards = $(".card");

    hide_card(all_cards);
    //match_counter = 0;
    //$("#game-area").append($(".card:first-child"));
}

function card_clicked(elem) {
    // show the face card
    show_card(elem);

    // check if variable first_card_click is null
    if(first_card_clicked == null)
    {
        first_card_clicked = elem;
    } else {
        stats.attempts++;
        //console.log(stats);
        second_card_clicked = elem;

        if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src'))
        {
            //console.log("true");
            match_counter++;
            stats.matches++;
            //console.log(stats);
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter == total_possible_matches)
            {
                $(".card").css('opacity','.25'); // dim all the cards and show the win message
                $("#win").show();
            }

        } else { // we are here that because the cards do not match
            console.log("false");

            $('.card').unbind('click'); // unbind all clicks so that click card does not reveal (card_click())

             $('.card').click(function(){ // binds a shake function on all .cards
                 //console.log("Cannot!");
                 $(this).shake();
             });

            setTimeout(function() { // two seconds
                hide_card(first_card_clicked);
                hide_card(second_card_clicked);
                first_card_clicked = null;
                second_card_clicked = null;
                $('.card').unbind('click'); // unbinds all the shake function
                apply_card_event_handlers(); // reapply the card_click function to all the cards again
            }, 2000);
        }
    }
}

jQuery.fn.shake = function() { // custom shake function found from the internet
    this.each(function(i) {
        $(this).css({ "position" : "relative" });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ left: -5 }, 5).animate({ left: 0 }, 5).animate({ left: 5 }, 5).animate({ left: 0 }, 5);
        }
    });
    return this;
}