/*Created by Rosemarie Gonzales on 7/6/16.*/

$(document).ready(function () {
    //When a card is clicked, execute the following code:
    $(".card").click(function () {
        card_clicked($(this));
    });
    //When the 'Reset Game' button is clicked, execute the following code:
    $(".reset").click(function () {
        location.reload();
    });
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var card_back1 = null;
var card_back2 = null;


function card_clicked(clicked_card) {

    /* Previous code..Keep for future referece:
     var card_back = clicked_card.find(".back");
     card_back.hide();*/

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

        //Test to see if cards clicked match.
        if (first_card_clicked == second_card_clicked) {

            //Increment match_counter by 1.
            match_counter++;
            console.log(match_counter);

            //reset variables to null
            first_card_clicked = null;
            second_card_clicked = null;

            //check if match_counter is equivalent to total_possible_matches
            if (match_counter == total_possible_matches) {
                return $("#game-area").html("You are a Memory Match Master!").css({
                    "padding": "100px",
                    "text-align": "center"
                }).animate({"font-size": "250%"});
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
