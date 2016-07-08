/*Created by Rosemarie Gonzales on 7/6/16.*/

$(document).ready(function () {
    $(".card").click(function () {
        card_clicked($(this));
    });
    $(".reset").click(function () {
        location.reload();
    });
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked(clicked_card) {
    //Flip the back of the card to show card face
    var card_back = clicked_card.find(".back");
    card_back.hide();

    //Get image source to be assigned to first_card_clicked or second_card_clicked
    var clicked_card1 = clicked_card.children("div.front");
    var card_src = clicked_card1.find("img").attr("src");
    console.log(card_src);

    //Assign card_src to first_card clicked
    if (first_card_clicked == null) {
        first_card_clicked = card_src;
        console.log(first_card_clicked);
        return first_card_clicked;
    }
    //Assign card_src to second_card_clicked
    else {
        second_card_clicked = card_src;
        console.log(second_card_clicked);

        //Test to see if cards clicked match
        if (first_card_clicked == second_card_clicked) {

            //Increment match_counter by 1
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
 /*           var reset_card = function(){
                card_back1.show();
                card_back2.show();
            };
            setTimeout(reset_card, 2000);*/
            first_card_clicked = null;
            console.log(first_card_clicked);
            second_card_clicked = null;
            console.log(second_card_clicked);
            return first_card_clicked;
            return second_card_clicked;
        }
    }
}
