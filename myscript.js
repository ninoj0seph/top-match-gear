var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

$(document).ready(function () {
    $(".card").click(card_clicked);
});
function card_clicked() {
    if ($(this).find(".back").is(":visible") == false) {
    } else {
        $(this).find(".back").hide();
        if (first_card_clicked == null) {
            first_card_clicked = $(this);
        } else {
            second_card_clicked = $(this);
            if (first_card_clicked.find(".front > img").attr("src") ===
                second_card_clicked.find(".front > img").attr("src")) {
                match_counter++;
                first_card_clicked = null;
                second_card_clicked = null;
                if (total_possible_matches == match_counter) {
                    $("#winning_gif").show();
                    $(".card").hide();
                } else {
                    return;
                }
            } else {
                $(".card").unbind("click");
                function time_out() {
                    first_card_clicked.find(".back").show();
                    second_card_clicked.find(".back").show();
                    $(".card").click(card_clicked);
                    first_card_clicked = null;
                    second_card_clicked = null;
                }
                setTimeout(time_out, 2000)
            }
        }
    }
};
