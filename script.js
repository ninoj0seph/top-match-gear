/*Created by Rosemarie Gonzales on 7/6/16.*/

$(document).ready(function () {
    //Display #stats div
    display_stats($("#stats"));
    //When a card is clicked, execute the following code:
    $(".card").click(function () {
        card_clicked($(this));
    });
    //When the 'Reset Game' button is clicked, execute the following code:
    $(".reset").click(reset_stats);
});

var first_card_clicked = null;
var second_card_clicked = null;
var card_back1 = null;
var card_back2 = null;
var total_possible_matches = 2;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function card_clicked(clicked_card) {
    //Get <div> element with class of .back for assignment to either card_back1 or card_back2.
    var card_back = clicked_card.children("div.back");

    //Get image source to be assigned to first_card_clicked or second_card_clicked.
    var card_src = clicked_card.children("div.front").find("img").attr("src");

    //Assign card_back and card_src to first_card clicked.
    if (first_card_clicked == null) {
        card_back1 = card_back;
        console.log(card_back1.html());//to check the value assigned to card_back1
        card_back1.hide();//show card face

        first_card_clicked = card_src;
        console.log(first_card_clicked);//to check the value assigned to first_card_clicked
    }
    //Assign card_back and card_src to second_card_clicked.
    else {
        card_back2 = card_back;
        console.log(card_back2.html());//to check the value assigned to card_back2
        card_back2.hide();

        second_card_clicked = card_src;
        console.log(second_card_clicked);//to check the value assigned to second_card_clicked
        attempts++;
        console.log("attempts :" + attempts);//to check value of attempts
        display_stats($("#stats"));//update displayed value of attempts in stats

        //Test to see if cards clicked match.
        if (first_card_clicked == second_card_clicked) {

            //Increment match_counter by 1.
            match_counter++;
            console.log(match_counter);

            matches++;
            console.log("matches: " + matches);//check value of matches
            display_stats($("#stats"));

            //reset variables to null
            first_card_clicked = null;
            second_card_clicked = null;

            //check if match_counter is equivalent to total_possible_matches
            if (match_counter == total_possible_matches) {
                $("#winner").text("You are a Memory Match Master!").css("font-size", "200%");
            }
        }
        else {
            //Function to return the back of the cards since they don't match
            var show_card_back = function () {
                card_back1.show();
                card_back2.show();
            };
            //Wait for 2 seconds then run the reset_card function
            setTimeout(show_card_back, 2000);

            //Reset the values of first_card_clicked and second_card_clicked
            first_card_clicked = null;
            console.log(first_card_clicked);//to check that value is back to null
            second_card_clicked = null;
            console.log(second_card_clicked);//to check that value is back to null
        }
    }
}

function display_stats(stats_div) {
    var games_played_value = stats_div.find(".games-played .value");
    var attempts_value = stats_div.find(".attempts .value");
    var accuracy_value = stats_div.find(".accuracy .value");
    if (games_played_value != null) {
        games_played_value.empty();
        games_played_value.append(games_played);
    }
    if (attempts_value != null) {
        attempts_value.empty();
        attempts_value.append(attempts);
    }
    if ((matches != 0) && (attempts != 0)) {
        accuracy = (Math.round((matches / attempts) * 100));
        accuracy_value.empty();
        accuracy_value.append(accuracy + "%");
    }
    else {
        accuracy_value.empty();
        accuracy_value.append(accuracy + "%");
    }
}

function reset_stats() {
    match_counter = 0;
    accuracy = 0;
    matches = 0;
    attempts = 0;
    games_played++;
    display_stats($("#stats"));
    $(".card .back").show();
    $("#winner").empty();
}