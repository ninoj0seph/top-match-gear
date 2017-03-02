var settings = {
    "first_card_clicked":{front:null,back:null},
    "second_card_clicked" : {front:null,back:null},
    total_possible_matches : 10
}

// var first_card_clicked = null;
// var second_card_clicked = null;
// var total_possible_matches = 10;
// var match_counter = 0;
var statistics = {
    matches: 0,
    attempts: 0,
    accuracy: 0,
    games_played: 0
};


$(document).ready(function (){
    click_handler();
});

function card_clicked() {
    $(this).addClass("flip");
    statistics.attempts++;
    if(first_card_clicked === null){
        first_card_clicked = $(this).parent().find(".front img").attr("src");
        console.log(first_card_clicked);
    } else {
        second_card_clicked = $(this).parent().find(".front img").attr("src");
        console.log(second_card_clicked);
        if(first_card_clicked === second_card_clicked){
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            setTimeout(function () {
                if(total_possible_matches === match_counter){
                    statistics.games_played++;
                    alert("You Win!");
                }
            }
            , 75);

        } else {
            setTimeout(function () {
                $(".back").removeClass("flip");
                }
                , 500);
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
    display_stats();
}

function click_handler() {
    $(".back").click(card_clicked);
    $(".resetGame").click(reset_stats);
}

function display_stats() {
    $("#games-played .value").text(statistics.games_played);
    console.log("worked");
    $("#attempts .value").text(statistics.attempts);
    $("#accuracy .value").text(statistics.accuracy);
}

function reset_stats() {
    for(var i in statistics){
        statistics[i] = 0;
    }
    first_card_clicked = null;
    second_card_clicked = null;
    display_stats();
}