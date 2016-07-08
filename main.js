//Declare and assign 3 global (see scope presentation) variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var you_won = "<p style='font-size:50px; position:relative; left:20vw;'>You won!</p>"

$(document).ready(function(){
    //.click is like using the onclick attribute we used before
    //It creates an event handler for when div1 is clicked
    //Add click method to a jQuery Selector with the parameter equal to a function called card_clicked
    $(".card").on("click", function(){
        hideBack($(this));
        //console.log('front will be ',front);
        //console.log('back will be ',back);
        card_clicked($(this));
    });
});

//declare a new function
function card_clicked(clicked_card){
    if (first_card_clicked == null){
        first_card_clicked = clicked_card;
        return;
    } else {
        second_card_clicked = clicked_card;
        if (first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')) {
            match_counter += 1;
            first_card_clicked = null; second_card_clicked = null;
            if (match_counter == total_possible_matches) {
                $('#game-area').html(you_won);
            } else {
                return;
            }
        } else {
            disableClicks();
            setTimeout(showBack,2000);
            setTimeout(enableClicks,2000);
            return;
        }
    }
}

function  showBack(){
    first_card_clicked.find('.back').show();
    second_card_clicked.find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
}

function hideBack(card) {
    $(card).find('.back').hide();
}
function disableClicks() {
    $(document.body).css('pointer-events','none');
}
function enableClicks() {
    $(document.body).css('pointer-events','auto');
}