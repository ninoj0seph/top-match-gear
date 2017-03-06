var settings = {
    "first_card_clicked": null,
    "second_card_clicked" : null,
    "total_possible_matches" : 10,
    "game_won" : false,
    "first_click" : true,
    "current_time" : null,
    "watch" : null,
    "totalMatchCount" : 0,
    "can_click" : true,
    "firstBack" : null,
    "secondBack" : null
};
var statistics = {matches: 0, attempts: 0, gamesPlayed: 0, accuracy : 0, racingPosition : 0};
var time = {milisecond : 0, bestLapTime : undefined};

$(document).ready(function (){
    if(settings.can_click) {
        click_handler();
    }
});

function click_handler() {
    $(".back").click(card_clicked);
    $(".resetGame").click(function () {
        hardReset_game(statistics.attempts >= 1 ? confirm("Are you sure you want to reset your mileage?") : false);
        });
}

function display_stats() {
    $("#games-played").text(statistics.gamesPlayed == 0 ? "Practice Lap" : statistics.gamesPlayed);
    $("#attempts .value").text(statistics.attempts);
    $("#remainMatch .value").text(settings.total_possible_matches - statistics.matches);
    $(".racingPosition").text(statistics.racingPosition == 0 ? "43th" : statistics.racingPosition);
}

function hardReset_game(wantToQuit) {
    if(wantToQuit) {
        for (var i in statistics) {
            statistics[i] = 0;
        }
        time.milisecond = 0;
        $(".back").removeClass("flip");
        resetCardValuesToNull();
        display_stats();
        clearInterval(settings.watch);
        settings.game_won = false;
        settings.first_click = true;
        $(".currentTime").text("0:00.00");
        $(".bestTime").text("0:00.00");
        $(".racingPosition").text("43th");
        settings.totalMatchCount = 0;
        time.bestLapTime = undefined;
        settings.can_click = true;
    }
}

function softReset_game() {
    $(".back").removeClass("flip");
    time.milisecond, statistics.matches = 0;
    resetCardValuesToNull();
    settings.game_won = false;
    settings.first_click = true;
}

function resetCardValuesToNull() {
    settings.first_card_clicked = null;
    settings.second_card_clicked = null;
}

function backFlip(){
    $(settings.firstBack).removeClass("flip");
    $(settings.secondBack).removeClass("flip");
    settings.can_click = true;
}

function stopWatch(){
    time.milisecond++;
    $(".currentTime").text(convertMs(time.milisecond));
}

function calculateRacingPosition(){
    var returnValue =  ~~(Math.abs(((settings.totalMatchCount / statistics.accuracy) * 43) - 42));
    return returnValue + (returnValue === 3 ? "rd" : returnValue === 2 ? "nd" : returnValue === 1 ? "st" : "th");
}

function convertMs(ms){
    var seconds = ((ms / 100) % 60).toFixed(2);
    var minutes = ~~(ms / 6000);
    return minutes + ":" + seconds;
}

function setBest(){
    if(!time.bestLapTime || time.milisecond < time.bestLapTime){
        time.bestLapTime = time.milisecond;
    }
    return time.bestLapTime;
}

function card_clicked() {
    if(!settings.can_click){
        return;
    }

    if(settings.first_click){
        settings.watch = setInterval(stopWatch, 1);
        settings.first_click = false;
    }

    $(this).addClass("flip");
    statistics.attempts++;
    if(settings.first_card_clicked === null){
        settings.firstBack = this;
        settings.first_card_clicked = $(this).parent().find(".front img").attr("src");
        display_stats();
    } else {
        settings.can_click = false;
        settings.secondBack = this;
        settings.second_card_clicked = $(this).parent().find(".front img").attr("src");
        display_stats();
        if(settings.first_card_clicked === settings.second_card_clicked){
            statistics.accuracy++;
            settings.totalMatchCount++;
            statistics.matches++;
            statistics.racingPosition = calculateRacingPosition();
            display_stats();
            resetCardValuesToNull();
            settings.can_click = true;
            setTimeout(function () {
                    if(settings.total_possible_matches === statistics.matches){
                        settings.game_won = true;
                        statistics.gamesPlayed++;
                        clearInterval(settings.watch);
                        $(".bestTime").text(convertMs(setBest()));
                        display_stats();
                        softReset_game();
                        alert(statistics.gamesPlayed % 5 === 0 ? "Hitting the pit stop would be great :)" : "Ready for a better lap time?" );
                    }
                }
                , 75);
        } else {
            settings.can_click = false;
            statistics.accuracy++;
            statistics.racingPosition = calculateRacingPosition();
            setTimeout(backFlip, 500);
            resetCardValuesToNull();
            display_stats();
        }
    }
}