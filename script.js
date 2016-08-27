 var first_card_clicked = null;
 var second_card_clicked = null;
 var total_possible_matches = 2;

 //meant to be a local variable somewhere
 var match_counter = 0;

 $(document).ready(card_clicked);

 //purpose: handles click events on divs with class card
 //param: none
 //local: thisCard- passes the card clicked
 //global: none
 //functions called: handleCardsWithFlags
 //returns: none
 function card_clicked(){
     $(".card").click(function () {
         var thisCard = $(this);
         handleCardsWithFlags(thisCard);
     });
 }

 //purpose: handles what to do when a card is clicked. This is the main handler. It will appropriately assign the first card or second card depending on what it is
 //param: cardElement - div with class 'card' that was clicked in  card_clicked
 //local: none
 //global: first_card_clicked, second_card_clicked
 //functions called: cardIsMatchedAlready, checkForTwoCards
 //returns: none
 function handleCardsWithFlags(cardElement){
     cardElement.children('.back').css('display',"none");

     if(!cardIsMatchedAlready(cardElement)) {   //is the card already part of a matched pair
         if (first_card_clicked === null) {         //is the first card empty
             cardElement.addClass('cardClicked');   //add flag stating the card has been clicked
             first_card_clicked = $(cardElement);   //assign the currently clicked card to the first card
         }
         else if (!cardElement.hasClass('cardClicked')) {       //has the card already been clicked/revealed
             second_card_clicked = $(cardElement);              //assign the currently clicked card to the second card
         }
         checkForTwoCards();
     }
 }

 //purpose: check whether or not the currently clicked card is in a matched pair
 //param: cardElement - the card clicked
 //local: none
 //global: none
 //functions called: none
 //returns: the truth of whether or not the currently clicked card is in a matched pair
 function cardIsMatchedAlready(cardElement) {
     console.log('checking if it is already matched');
     if(cardElement.hasClass('matched')){
         return true;
     } else{
         return false;
     }
 }

 //purpose: checks whether two cards were clicked. If two cards were clicked it will call a function to see if they are a match
 //param: none
 //local: none
 //global: first_card_clicked, second_card_clicked
 //functions called: checkForMatches
 //returns: none
 function checkForTwoCards(){
     if(first_card_clicked && second_card_clicked) {
         checkForMatches();
     }
 }

 //purpose: function checks if the first_card_clicked and second_card_clicked are equal. Will call appropriate functions to reset the cards depending on whether or not the cards match
 //param: none
 //local: none
 //global: first_card_clicked, second_card_clicked
 //functions called: makeCardsMatch
 //                 makeCardsReappear
 //returns: none
 function checkForMatches() {
     console.log("check for matches");
     if(first_card_clicked.find('.front img').attr('src') === second_card_clicked.find('.front img').attr('src')){
         makeCardsMatch();
     }else{
         setTimeout(makeCardsReappear, 2000);
     }
 }

 //purpose: Adds and removes classes to notify other functions that the two cards are part of a matching pair, then it resets the first and second card. Function will also invoke a function to check if the game has been won.
 //param: none
 //local: none
 //global: first_card_clicked, second_card_clicked, match_counter
 //functions called: gameIsWon
 //returns: none
 function makeCardsMatch() {
     console.log('cards match');
     first_card_clicked.addClass('matched');
     second_card_clicked.addClass('matched');
     first_card_clicked.removeClass('cardClicked');
     second_card_clicked.removeClass('cardClicked');
     first_card_clicked = null;
     second_card_clicked = null;
     match_counter++;
     gameIsWon();
 }

 //purpose: Makes cards clickable and card backs visible after it has been determined that the cards do not match, then it resets the first and second card.
 //param: none
 //local: none
 //global: first_card_clicked, second_card_clicked
 //functions called:
 //returns: none
 function makeCardsReappear() {
     first_card_clicked.find('.back').css('display','initial');
     second_card_clicked.find('.back').css('display','initial');
     first_card_clicked.removeClass('cardClicked');
     second_card_clicked.removeClass('cardClicked');
     first_card_clicked = null;
     second_card_clicked = null;
 }

 //purpose: checks with the game is won
 //param: none
 //local: none
 //global: match_counter, total_possible_matches
 //functions called: none
 //returns: none
 function gameIsWon() {
     if(match_counter === total_possible_matches){
         $("#gameWon").css('display','initial');
     }
 }