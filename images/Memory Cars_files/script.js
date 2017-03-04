var settings = {
    "first_card_clicked": null,
    "second_card_clicked" : null,
    "total_possible_matches" : 10,
    "game_won" : false,
    "first_click" : true,
    "current_time" : null,
};
var firstBack = null;
var secondBack = null;
var statistics = {
    matches: 0,
    attempts: 0,
    gamesPlayed: 0
};


$(document).ready(function (){
    click_handler();
});

function click_handler() {
    $(".back").click(card_clicked);
    $(".resetGame").click(function () {
        hardReset_game(statistics.attempts >= 1 ? confirm("Are you sure you want to reset your mileage?") : false);
        });
}

function display_stats() {
    $("#games-played").text(statistics.gamesPlayed);
    $("#attempts .value").text(statistics.attempts);
    $("#accuracy .value").text(((statistics.matches / (statistics.attempts/2))*100).toFixed(2)+"%");
}

function hardReset_game(wantToQuit) {
    if(wantToQuit) {
        for (var i in statistics) {
            statistics[i] = 0;
        }
        $(".back").removeClass("flip");
        resetValuesToNull();
        display_stats();
    }
}

function softReset_game() {
    statistics.matches = 0;
    settings.first_card_clicked = null;
    settings.second_card_clicked = null;
    settings.game_won = false;
    $(".back").removeClass("flip");
    card_clicked();
}



function resetValuesToNull() {
    settings.first_card_clicked = null;
    settings.second_card_clicked = null;
}

function backFlip(){
    $(firstBack).removeClass("flip");
    $(secondBack).removeClass("flip");
}

function card_clicked() {
    if(settings.first_click){
        var time = {
            milisecond : 0,
            second : 0,
            minutes : 0
        };

        var watch = setInterval(function(){
            time.milisecond++;
            if(time.milisecond === 100){
                time.second++;
                time.milisecond = 0;
            }
            if(time.second === 60){
                time.minutes++;
                time.second = 0;
            }
            settings.current_time = time.minutes+":"+time.second+"."+time.milisecond;
            $(".currentTime").text(settings.current_time)
            if(settings.game_won){
                clearInterval(watch);
                time.milisecond = 0;
                time.second = 0;
                time.minutes = 0;
            }
        }, 1);
    }
    
    $(this).addClass("flip");
    statistics.attempts++;
    if(settings.first_card_clicked === null){
        firstBack = this;
        settings.first_card_clicked = $(this).parent().find(".front img").attr("src");
        $("#attempts .value").text(statistics.attempts);
    } else {
        secondBack = this;
        settings.second_card_clicked = $(this).parent().find(".front img").attr("src");
        $("#attempts .value").text(statistics.attempts);
        if(settings.first_card_clicked === settings.second_card_clicked){
            statistics.matches++;
            resetValuesToNull();
            setTimeout(function () {
                if(settings.total_possible_matches === statistics.matches){
                    settings.game_won = true;
                    statistics.gamesPlayed++;
                    alert("You Win!");
                    display_stats();
                    softReset_game();
                }
            }
            , 75);
        } else {
            setTimeout(backFlip, 500);
            resetValuesToNull();
        }
    }
    display_stats();
}

function stopWatch(){

}

