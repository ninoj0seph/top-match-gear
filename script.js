var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 10;
var match_counter = 0;

$(document).ready(function (){
    click_handler();
});

function card_clicked() {
    $(this).addClass("flip");
    if(first_card_clicked === null){
        first_card_clicked = $(this).parent().find(".front img").attr("src");
        console.log(first_card_clicked);
        return;
    } else {
        second_card_clicked = $(this).parent().find(".front img").attr("src");
        console.log(second_card_clicked);
        if(first_card_clicked === second_card_clicked){
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            setTimeout(function () {
                if(total_possible_matches === match_counter){
                    alert("You Win!");
                }
            }, 75);
        }
    }
}


function click_handler() {
    $(".back").click(card_clicked);
}