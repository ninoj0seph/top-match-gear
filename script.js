var settings = {
    "first_card_clicked": null,
    "second_card_clicked" : null,
    "total_possible_matches" : 10,
    "game_won" : false,
    "first_click" : true,
    "current_time" : null,
    "watch" : null,
    "totalMatchCount" : 0
};
var statistics = {matches: 0, attempts: 0, gamesPlayed: 0, accuracy : 0, racingPosition : 0, bestLapTime : 0};
var time = {milisecond : 0, second : 0, minutes : 0};
var firstBack = null;
var secondBack = null;

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
    $(".racingPosition").text(statistics.racingPosition + (statistics.racingPosition === 3 ? "rd" : statistics.racingPosition === 2 ? "nd" : statistics.racingPosition === 1 ? "st" : "th"));
}

function hardReset_game(wantToQuit) {
    if(wantToQuit) {
        for (var i in statistics) {
            statistics[i] = 0;
        }
        for(var x in time){
            time[x] = 0;
        }
        $(".back").removeClass("flip");
        resetCardValuesToNull();
        display_stats();
        clearInterval(settings.watch);
        settings.game_won = false;
        settings.first_click = true;
        // not the prettiest but should look great from the outside
        $(".currentTime").text("0:00.00");
        $(".bestTime").text("0:00.00");
        settings.totalMatchCount = 0;
    }
}

function softReset_game() {
    $(".back").removeClass("flip");
    for(var x in time){
        time[x] = 0;
    }
    statistics.matches = 0;
    resetCardValuesToNull();
    settings.game_won = false;
    settings.first_click = true;
}

function resetCardValuesToNull() {
    settings.first_card_clicked = null;
    settings.second_card_clicked = null;
}

function backFlip(){
    $(firstBack).removeClass("flip");
    $(secondBack).removeClass("flip");
}

function card_clicked() {
    if(settings.first_click){
        settings.watch = setInterval(stopWatch, 1);
        settings.first_click = false;
    }
    $(this).addClass("flip");
    if(settings.first_card_clicked === null){
        firstBack = this;
        settings.first_card_clicked = $(this).parent().find(".front img").attr("src");
        $("#attempts .value").text(statistics.attempts);
    } else {
        secondBack = this;
        settings.second_card_clicked = $(this).parent().find(".front img").attr("src");
        $("#attempts .value").text(statistics.attempts);
        if(settings.first_card_clicked === settings.second_card_clicked){
            settings.totalMatchCount++;
            statistics.attempts++;
            statistics.matches++;
            statistics.racingPosition = calculateRacingPosition();
            console.log(statistics.racingPosition);
            resetCardValuesToNull();
            setTimeout(function () {
                if(settings.total_possible_matches === statistics.matches){
                    settings.game_won = true;
                    statistics.gamesPlayed++;
                    clearInterval(settings.watch);
                    alert("You Win!");
                    display_stats();
                    softReset_game();
                }
            }
            , 75);
        } else {
            statistics.attempts++;
            statistics.racingPosition = calculateRacingPosition();
            console.log(statistics.racingPosition);
            setTimeout(backFlip, 500);
            resetCardValuesToNull();
        }
    }
    display_stats();
}

function stopWatch(){
    time.milisecond++;
    if(time.milisecond === 100){
        time.second++;
        time.milisecond = 0;
    } else if(time.second === 60){
        time.minutes++;
        time.second = 0;
    }
    settings.current_time = time.minutes+":"+time.second+"."+time.milisecond;
    $(".currentTime").text(settings.current_time);
}

function calculateRacingPosition(){
    return Math.floor(Math.abs(((settings.totalMatchCount / statistics.attempts) * 43) - 42));
}


