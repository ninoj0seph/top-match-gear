var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = null;
var games_played = 0;

$(document).ready(function () {
    shuffle();
    $(".card").click(card_clicked);
    $(".reset").on("click",reset_button);
});
function card_clicked() {
    if ($(this).find(".back").is(":visible") == false) {
    } else {
        $(this).find(".back").hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
        } else {
            second_card_clicked = $(this);
            attempts++;
            display_stats();
            if (first_card_clicked.find(".front > img").attr("src") ===
                second_card_clicked.find(".front > img").attr("src")) {
                match_counter++;
                matches++;
                accuracy = (((matches/attempts)*100).toFixed(2));
                display_stats();
                first_card_clicked = null;
                second_card_clicked = null;
                if (total_possible_matches == match_counter) {
                    $("#winning_gif").show();
                    $(".card").hide();
                } else {
                    return;
                }
            } else {
                $(".card").unbind("click");
                function time_out() {
                    first_card_clicked.find(".back").show();
                    second_card_clicked.find(".back").show();
                    $(".card").click(card_clicked);
                    first_card_clicked = null;
                    second_card_clicked = null;
                }
                setTimeout(time_out, 2000)
                display_stats()
            }
        }
    }
};
function display_stats(){
    ($(".accuracy .value").html((accuracy) + "%"));
    ($(".games_played .value").html(games_played));
    ($(".attempts .value").html(attempts));
}
function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
}
function reset_button() {
    games_played++;
    ($(".games_played .value").html(games_played));
    reset_stats();
    display_stats();
    first_card_clicked = null;
    second_card_clicked = null;
    $(".card").show()
    $(".card .back").show();
    $("#winning_gif").hide()
    shuffle();
}
function shuffle() {
    var makeArray = $(".card").toArray();
    var swap_card;
    var sub_card;
    for (var i = makeArray.length - 1; i > 0; i--) {
        swap_card = Math.floor(Math.random() * i);
        sub_card = makeArray[i];
        makeArray[i] = makeArray[swap_card];
        makeArray[swap_card] = sub_card;
    }
    $("#game-area").empty();
    for (var i = 0; i < makeArray.length; i++) {
        var add_to_array = makeArray[i];
        $("#game-area").append(add_to_array);
    }
    $(".card").click(card_clicked);
}
