var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 0;
var can_be_clicked = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(initialize_game);

// INITIALIZE GAME
function initialize_game() {
    $("div.card").click(card_clicked);
    total_possible_matches = $(".card").length / 2;
    $("button").click(reset);
}

// RESET BUTTON
function reset() {
    games_played++;
    reset_stats();
    display_stats();
    reset_cards();
}

function reset_cards() {
    $(".matched").find(".back").show();
    $(".matched").off(card_clicked).click(card_clicked);
}

function display_stats() {
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    if (attempts == 0) {
        accuracy = 0;
    }
    else {
        accuracy = Math.round(matches / attempts * 100) + "%";
    }
    $(".accuracy .value").text(accuracy);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

// CARDS CLICKED
function card_clicked() {
    if (can_be_clicked == false) {
        return;
    }
    // FIRST CARD
    var the_card = $(this);
    the_card.find(".back").hide();
    the_card.off("click");
    if (first_card_clicked == null) {
        first_card_clicked = the_card;
        return;
    }
    // SECOND CARD
    else {
        second_card_clicked = the_card;
        attempts++;
        display_stats();
    }

    // CHECK FOR MATCH
    if (first_card_clicked.find(".cardFront").attr("src") == second_card_clicked.find(".cardFront").attr("src")) {
        first_card_clicked.addClass("matched");
        second_card_clicked.addClass("matched");
        matches++;
        display_stats();
        first_card_clicked = null;
        second_card_clicked = null;

        // CHECK FOR WIN
        if (matches == total_possible_matches) {
            $("#game-area").text("Cheers, mate. You've won the game!")
        }
        else {
            return;
        }
    }
    // CARDS DONT MATCH
    else {
        can_be_clicked = false;
        setTimeout(showBack, 1400);
        function showBack() {
            first_card_clicked.find('.back').show();
            second_card_clicked.find('.back').show();
            first_card_clicked.click(card_clicked);
            second_card_clicked.click(card_clicked);
            first_card_clicked = null;
            second_card_clicked = null;
            can_be_clicked = true;
            display_stats();
        }

        return;
    }
}