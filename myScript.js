/**
 * Created by Weizguy on 8/25/2016.
 */

$(document).ready(function () {
    startup();
});


// Declare all of the global variables
var cardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
cardArray = cardArray.concat(cardArray);
var clickable = true;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var tries = 1;
var wins = 0.00;
var accuracy = 0.00;
var scorpion;

function startup() {
    $(".card").flip({
        trigger: 'manual'
    });
    shuffleCards();
    gamePlay();
    backgroundMusicUp();
}

function backgroundMusicUp() {
    var music = document.getElementById("music");
    music.volume = 1.0;
    music.play();
}

function backgroundMusicDown() {
    var music = document.getElementById("music");
    music.volume = .2;
}

// Create random images based on the available number of cards
function shuffleCards() {

    var ranArray = [];
    var newCardArray = cardArray.slice();
    while (newCardArray.length != 0) {
        var ran = Math.floor(Math.random() * (newCardArray.length));
        ranArray.push(newCardArray[ran]);
        newCardArray.splice(ran, 1);
    }

    $('.back').each(function (val) {

        $(this).css('background', 'url(' + 'images/cards/' + ranArray[val] + '.jpg' + ')');
        $(this).css('background-size', '150px 200px');
    });
}
    scorpion = $(".back").css('background', 'url(images/cards/4.jpg');
    console.log(scorpion);


// Gameplay code
function gamePlay() {


    $(".card").click(function () {

        if ($(this).hasClass("revealed")) {
            $(this).flip(false);
            return;
        }
        if (clickable == false) {
            $(this).flip(false);
            return;
        }
        $(this).flip(true);
        $(this).addClass("revealed");
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            $('.back').click(false);


            if(($(this).children('.back').css('background-image')) == scorpion.children('.back').css('background-image')){
                console.log("right");
            }
console.log($(this).children(".back").css('background-image'));


        } else {
            second_card_clicked = $(this);

            var first_card_background = first_card_clicked.children(".back").css('background');
            var second_card_background = second_card_clicked.children(".back").css('background');


            if (second_card_background == first_card_background) {
                matched();
            } else {
                clickable = false;
                setTimeout(not_matched, 1500);
            }
        }
    });
}

function matched() {
    match_counter += 1;
    first_card_clicked.addClass("matched");
    second_card_clicked.addClass("matched");

    if (match_counter == total_possible_matches) {
        $("#footer p").text("YOU WIN!!!");
        wins += 1;
        $("#wins").text(wins);
        accuracy = wins/tries;
        $("#accuracy").text(accuracy.toFixed(2));
        backgroundMusicDown();
        var fatality = document.getElementById("fatality");
        fatality.play();
        fatality.volume = 1.0;
        setTimeout(backgroundMusicUp, 2000);
    } else {

        $("#footer p").text("Well Done!").css('color', 'white');

        if(match_counter <8){
            var welldone = document.getElementById("wellDone");
            backgroundMusicDown();
            welldone.play();
            welldone.volume = 1.0;
            setTimeout(backgroundMusicUp, 2500);

        }else if(match_counter == 8){
            var finishhim = document.getElementById("finishhim");
            backgroundMusicDown();
            finishhim.play();
            finishhim.volume = 1.0;
            setTimeout(backgroundMusicUp, 1000);
        }

    }
    setTimeout(stopFlip, 100);
}

function not_matched() {
    first_card_clicked.removeClass('revealed').flip(false);
    second_card_clicked.removeClass('revealed').flip(false);
    first_card_clicked = null;
    second_card_clicked = null;
    if (clickable == false) {
        clickable = true;
        if (($('.card').hasClass('matched')) == false) {
            $('.card').flip(false);
        }
    }
    $("#footer p").text("WHOOPS, WRONG!!").css('color', 'yellow');
    var laughRan = Math.random();
    console.log(laughRan);
    var laughTrack = .25;
    if(laughRan < laughTrack) {
        var laugh = document.getElementById("laugh");
        backgroundMusicDown();
        laugh.play();
        laugh.volume = 1.0;
        setTimeout(backgroundMusicUp, 3000);
    }
}

function stopFlip() {
    first_card_clicked.off("click");
    second_card_clicked.off("click");
    first_card_clicked = null;
    second_card_clicked = null;
}

function reset() {
    $(".card").off("click");
    $(".card").flip(false);
    $(".card").on("click").removeClass('revealed matched');
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;
    tries += 1;
    $("#tries").text(tries);
    var fight = document.getElementById("fight");
    backgroundMusicDown();
    fight.play().currentTime=2;
    $("#footer p").text("FIGHT!").css('color', 'red');
    startup();
}