//add a class dynamically called has been clicked so that i can ignore clicks of cards that have already have been revealed


var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;


//meant to be a local variable somewhere
var match_counter = 0;

$(document).ready(card_clicked);

function card_clicked(){
    $(".card").click(function () {
        //this.addClass('cardClicked');
        var thisCard = $(this);

        thisCard.children('.top').css('display',"none");  //do i want to rework this.

        myNewFn(thisCard);
    });
}


//addd a flag
function myNewFn(cardElement){
    if(first_card_clicked === null){
        first_card_clicked = $(cardElement);
        console.log('first card bro');
    }
    else if(first_card_clicked === cardElement) {
        console.log('do nothing . they are the same')
    }else{
        console.log('second card dude');
        first_card_clicked = null;
    }
}