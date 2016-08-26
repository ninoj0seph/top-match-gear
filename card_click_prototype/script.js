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
        thisCard.children('.top').css('display',"none");

        handleCardsWithFlags(thisCard);
    });
}

function handleCardsWithFlags(cardElement){
    if(!cardIsMatchedAlready(cardElement)) {
        if (first_card_clicked === null) {
            cardElement.addClass('cardClicked');
            first_card_clicked = $(cardElement);
            console.log('first card bro');
        }
        else if (cardElement.hasClass('cardClicked')) {
            console.log('do nothing . the same card was picked')
        } else {
            console.log('second card dude');
            second_card_clicked = $(cardElement);
        }
        checkForTwoCards();
    }
}

function cardIsMatchedAlready(cardElement) {
    console.log('checking if it is already matched');
    if(cardElement.hasClass('matched')){
        return true;
    }
    else{
        return false;
    }
}

function checkForTwoCards(){
    if(first_card_clicked && second_card_clicked) {
        console.log('two cards clicked');
        //i want to add the true check for matches method here
        //based on the matchingness of the backgrounds/images
        console.log('before check');
        checkForMatches();
        console.log('after check');
    }else {
        console.log('one card clicked');
    }
}

function checkForMatches() {
    console.log("check for matches");
    if(first_card_clicked.find('.bottom').attr('class') === second_card_clicked.find('.bottom').attr('class')){
        console.log('cards match');
        makeCardsMatch();
    }else{
        console.log("cards don't match");
        setTimeout(makeCardsReappear, 2000);
    }
}

function makeCardsMatch() {
    console.log('cards match');
    first_card_clicked.addClass('matched');
    second_card_clicked.addClass('matched');
    first_card_clicked.removeClass('cardClicked');
    second_card_clicked.removeClass('cardClicked');
    first_card_clicked = null;
    second_card_clicked = null;
}

function makeCardsReappear() {
    console.log("cards don't match");
    console.log('making cards reappear');
    first_card_clicked.find('.top').css('display','initial');
    second_card_clicked.find('.top').css('display','initial');
    first_card_clicked.removeClass('cardClicked');
    second_card_clicked.removeClass('cardClicked');
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('cards reset');
}

// function newFnWithFlags(cardElement){
//     if(first_card_clicked === null){
//         cardElement.addClass('cardClicked');
//         first_card_clicked = $(cardElement);
//         console.log('first card bro');
//     }
//     else if(cardElement.hasClass('cardClicked')) {
//         console.log('do nothing . the same card was picked')
//     }else{
//         console.log('second card dude');
//         first_card_clicked = null;
//     }
// }

//add a flag
// function myNewFn(cardElement){
//     if(first_card_clicked === null){
//         //cardElement.addClass('cardClicked');
//         first_card_clicked = $(cardElement);
//         console.log('first card bro');
//     }
//     else if(first_card_clicked === cardElement) {
//         console.log('do nothing . they are the same')
//     }else{
//         console.log('second card dude');
//         first_card_clicked = null;
//     }
// }



