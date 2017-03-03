var settings = {
    "first_card_clicked": null,
    "second_card_clicked" : null,
    "total_possible_matches" : 10
};
var firstBack = null;
var secondBack = null;
var statistics = {
    matches: 0,
    attempts: 0,
    accuracy: 0,
    games_played: 0
};


$(document).ready(function (){
    click_handler();
});

function click_handler() {
    $(".back").click(card_clicked);
    $(".resetGame").click(reset_stats);
}

function display_stats() {
    $("#games-played .value").text(statistics.games_played);
    $("#attempts .value").text(statistics.attempts);
    $("#accuracy .value").text(statistics.accuracy);
}

function reset_stats() {
    for(var i in statistics){
        statistics[i] = 0;
    }
    settings.first_card_clicked = null;
    settings.second_card_clicked = null;
    display_stats();
}

function backFlip(){
    console.log("working");
    $(firstBack).removeClass("flip");
    $(secondBack).removeClass("flip");
}

function card_clicked() {
    $(this).addClass("flip");
    statistics.attempts++;
    if(settings.first_card_clicked === null){
        firstBack = this;
        settings.first_card_clicked = $(this).parent().find(".front img").attr("src");
        console.log(settings.first_card_clicked);
    } else {
        secondBack = this;
        settings.second_card_clicked = $(this).parent().find(".front img").attr("src");
        console.log(settings.second_card_clicked);
        if(settings.first_card_clicked === settings.second_card_clicked){
            statistics.matches++;
            settings.first_card_clicked = null;
            settings.second_card_clicked = null;
            setTimeout(function () {
                if(settings.total_possible_matches === statistics.matches){
                    statistics.games_played++;
                    alert("You Win!");
                }
            }
            , 75);

        } else {
            setTimeout(backFlip, 500);
            settings.first_card_clicked = null;
            settings.second_card_clicked = null;
        }
    }
    display_stats();
}

//working