$(document).ready(function () {
    var first_card_clicked = null;
    var second_card_clicked = null;
    var total_possible_matches = 2;
    var match_counter = 0;


    $(".card").on("click", ".cardBack", card_clicked);
    function card_clicked() {
        $(this).hide(500);
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            return;
        } else {
            second_card_clicked = $(this);
            //console.log(second_card_clicked);
            var card1_src = first_card_clicked.prev().find("img").attr("src");//fcc on .cardBack then finds card front img
            var card2_src = second_card_clicked.prev().find("img").attr("src");
            //console.log(card1_src);
            //if true
            if (card1_src == card2_src) {
                match_counter += 1;
                first_card_clicked = null;
                second_card_clicked = null;
                console.log(match_counter);
                if (match_counter == total_possible_matches) {
                    alert("You have succeeded my friend!");
                } else {
                    return;
                }
                //if false
            } else { 
                $(".cardBack").delay(1000).show(500);
                $(".cardBack").unbind(card_clicked);// removes function so a clicked third card does not interfere with the previous card clicked functions
                first_card_clicked = null;
                second_card_clicked = null;
                return;
            }

        }
    }




});

