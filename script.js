/**
 * Created by danh on 10/4/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var stats = {};
var path = 'assets/images/';

    stats.matches = 0;
    stats.attempts = 0;
    stats.accuracy = 0;
    stats.games_played = 0;

function create_cards() { // This function creates the card divs and inserts them dynamically into the array

    var original_images = ['black_widow.jpg', 'captain.jpg','falcon.jpg','hawkeye.jpg','hulk.jpg','ironman.jpg','nickfury.jpg','spiderman.jpg','thor.jpg'];
    var images = original_images.concat(original_images);

     $('#game-area').html(''); // First we clear the board area of all elements to make sure we are not adding more cards than we want

    //console.log('image length' + images.length);
    while(images.length>0) {
        var i = Math.floor(Math.random()*images.length)
        var card_div = $("<div>",{
           class: "card"
        });
        var front_div = $("<div>",{
           class: "front"
        });
        var back_div = $("<div>", {
            class: "back"
        });
        var img_back = $("<img>",{
            src: path + "avenger_logo.png"
        });
        var img_front = $("<img>",{
            src: path + images[i]
        });
        $(front_div).append(img_front);
        $(back_div).append(img_back);
        $(card_div).append(front_div);
        $(card_div).append(back_div);
        $('#game-area').append(card_div);
        images.splice(i,1);
    }

    apply_card_event_handlers();
}


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

    if(stats.attempts > 0) // prevents from resetting before any attempts have been made to prevent NaN for accuracy
    {
        stats.games_played++;
        display_stats();
        stats.accuracy = 0;
        stats.matches = 0;
        stats.attempts = 0;
        match_counter = 0;
    }
}



$(document).ready(function(){

    create_cards(); // This function insert the pre-shuffled cards into the #game-area, which is blank to begin with.
                    // It then assigns the click event handlers after dom creation

    $('button.reset').click(function() {
        //console.log("reset is fired");
        reset_stats();
        reset_game();
        $("#reset").removeClass('blink_me');
    });

    $('button#win_btn').click(function() {

        show_flashy_win_screen();

    });

});

function show_flashy_win_screen() {
    $(".card").css('opacity','.10'); // dim all the cards and show the win message
    $("#win").show(100);
    $("#win2").show(200);
    $("#win3").show(250);
    $("#reset").addClass('blink_me');
    run_blink();
}


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
        shake_it($(this));
    });
}

function hide_card(elem) {
    $(elem).find('.back').show(); // show the back of the card to hide the front
    //$(elem).attr('class','card');
    $(elem).unbind('click'); // unbind the Shake function from this card
    apply_card_event_handlers(); //reapply the event handlers again
}

function reset_game() { // currently does not shuffle

    $("#win").hide(500);
    $("#win2").hide(250);
    $("#win3").fadeOut(500,function(){
        $(".card").css('opacity','1');
    });

    create_cards();

    var all_cards = $(".card");

    hide_card(all_cards);
    first_card_clicked = null;
    second_card_clicked = null;
}

function card_clicked(elem) {
    // show the face card
    show_card(elem);

    // check if it is the first card clicked
    if(first_card_clicked == null)
    {
        //console.log("first card" + elem);
        first_card_clicked = elem;
    } else { // this else statement runs when it is not the first card
        stats.attempts++;
        //console.log(stats);
        //console.log("second card" + elem);
        second_card_clicked = elem;

        if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src'))
        {

            match_counter++;
            stats.matches++;

            if(match_counter == total_possible_matches)
            {
                match_shake(first_card_clicked);
                match_shake(second_card_clicked, function() { // i attached a callback function so the win screen shows after match shake animation is complete
                    show_flashy_win_screen();
                });
            } else {
                    match_shake(first_card_clicked);
                    match_shake(second_card_clicked);
            }

            first_card_clicked = null;
            second_card_clicked = null;

        } else { // we are here that because the cards do not match
            console.log("false");

            $('.card').unbind('click'); // unbind all clicks so that click card does not reveal (card_click())

             $('.card').click(function(){ // binds a shake function on all .cards
                 //console.log("Cannot!");
                 shake_it($(this));

             });

            shake_it(first_card_clicked);
            shake_it(second_card_clicked);

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

function shake_it(that) { // call shake from Jquery UI Library
    that.effect( "shake", {times:3, distance:5},200 );
}

function match_shake(that,callback) { // added callback so a function can execute after animation is complete
    //console.log("a");
    that.effect( "shake", {direction: "up", times:1, distance:5},500 );
    that.show(callback);
}

function run_blink() {
    (function blink() {
        $('.blink_me').fadeOut(500).fadeIn(500, blink);
    })();
}
