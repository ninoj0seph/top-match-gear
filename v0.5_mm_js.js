$(document).ready(function () {
    var first_card_clicked = null;
    var second_card_clicked = null;
    var total_possible_matches = 2;
    var match_counter = 0;


    $(".card").on("click", ".cardBack", card_clicked);
    function card_clicked() {
        $(this).toggle(500);
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
            return;
        } else {
            second_card_clicked = $(this);
            //console.log(second_card_clicked);
            var card1_src = first_card_clicked.prev().find("img").attr("src");
            var card2_src = second_card_clicked.prev().find("img").attr("src");
            //console.log(card1_src);
            if (card1_src == card2_src) {//if true
                match_counter += 1;
                first_card_clicked = null;
                second_card_clicked = null;
                console.log(match_counter);
                if (match_counter == total_possible_matches) {
                    alert("You have succeeded my friend!");
                } else {
                    return;
                }
            } else { //if false
                $(".cardBack").delay(1000).show(500);
                $(".cardBack").unbind(card_clicked);
                first_card_clicked = null;
                second_card_clicked = null;
                return;
            }

        }
    }




});

