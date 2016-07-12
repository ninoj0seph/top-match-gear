$(document).ready(function () {
    $(".card").on("click", ".cardBack", card_clicked);
    $("button").on("mouseup", reset);
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 18;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function card_clicked() {
    $(this).hide(500);
    if (first_card_clicked == null) {
        first_card_clicked = $(this);
        return;
    } else {
        second_card_clicked = $(this);
        //console.log(second_card_clicked);
        var card1_src = first_card_clicked.prev().find("img").attr("src");//fcc on .cardBack then finds card front img
        var card2_src = second_card_clicked.prev().find("img").attr("src");
        //console.log(card1_src);
        if (card1_src == card2_src) {//if match
            match_counter ++; //adds 1 each time two cards are matched
            attempts ++; //after second card clicked attempts increases by 1
            display_stats();//displays correct attempts with wrong attempts
            first_card_clicked = null;
            second_card_clicked = null;
            //console.log(match_counter);
            if (match_counter == total_possible_matches) {
                alert("You have succeeded my friend!");
            } else {
                return;
            }
        } else { //if not match
            $(".cardBack").unbind(card_clicked);// removes function so a clicked third card does not interfere with the previous card clicked functions
            $(first_card_clicked).delay(500).show(500);
            $(second_card_clicked).delay(250).show(500);
            first_card_clicked = null;
            second_card_clicked = null;
            attempts ++; //after second card clicked attempts increases by 1
            display_stats();
            //console.log(attempts);
            return;
        }
    }
}

function display_stats(){
    $(".gamesPlayed .value").text(games_played);
    $(".attempts .value").text(attempts);
    accuracy = (Math.round((match_counter / attempts) * 100) + "%");
    $(".accuracy .value").text(accuracy);
    console.log(accuracy);
    console.log(match_counter);
    console.log(attempts);
}

function reset_stats(){
    match_counter = 0;
    attempts = 0;
    if (match_counter == 0 && attempts == 0){
        accuracy = 0;
    }
    display_stats();
}

function reset(){
    games_played++;
    reset_stats();
    $(".cardBack").delay().show(500);
}

