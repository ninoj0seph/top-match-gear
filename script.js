 var first_card_clicked = null;
 var second_card_clicked = null;
 var total_possible_matches = 2;

 var match_counter = 0;     //incrementer for the number of matches found
 var attempts = 0;          //incrementer for the number of attempted matches
 var accuracy = null;
 var games_played = 0;

 $(document).ready(card_clicked);

 //purpose: handles click events on divs with class card
 //param: none
 //local: thisCard- passes the card clicked
 //global: none
 //functions called: handleCardsWithFlags
 //returns: none
 function card_clicked(){
     display_stats();   //need to add to functions called???? is this correct placement?????
     $(".card").click(function () {
         var thisCard = $(this);
         handleCardsWithFlags(thisCard);
     });
 }

 //purpose: handles what to do when a card is clicked. This is the main handler. It will appropriately assign the first card or second card depending on what it is. Disables the click event while we figure out what to do with cards.
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
             $('.card').off('click');                           //disables click while we check the two cards
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
     if(first_card_clicked.find('.front img').attr('src') === second_card_clicked.find('.front img').attr('src')){
         makeCardsMatch();
     }else{
         setTimeout(makeCardsReappear, 2000);
     }
 }

 //purpose: Adds and removes classes to notify other functions that the two cards are part of a matching pair, then it resets the first and second card. Function will also invoke a function to check if the game has been won. Readies the click handler, as well
 //param: none
 //local: none
 //global: first_card_clicked, second_card_clicked, match_counter
 //functions called: gameIsWon, card_clicked
 //returns: none
 function makeCardsMatch() {
     console.log('cards match');        //leave for now
     first_card_clicked.addClass('matched');
     second_card_clicked.addClass('matched');
     first_card_clicked.removeClass('cardClicked');
     second_card_clicked.removeClass('cardClicked');
     first_card_clicked = null;
     second_card_clicked = null;
     match_counter++;
     card_clicked();                                //readies click handler again
     gameIsWon();
 }

 //purpose: Makes cards clickable and card backs visible after it has been determined that the cards do not match, then it resets the first and second card. Readies the click handlier again.
 //param: none
 //local: none
 //global: first_card_clicked, second_card_clicked
 //functions called: card_clicked
 //returns: none
 function makeCardsReappear() {
     first_card_clicked.find('.back').css('display','initial');
     second_card_clicked.find('.back').css('display','initial');
     first_card_clicked.removeClass('cardClicked');
     second_card_clicked.removeClass('cardClicked');
     first_card_clicked = null;
     second_card_clicked = null;
     card_clicked();                                //readies click handler again
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

 //purpose: displays the user's statistics of the game including games played, attempts, and accuracy
 //param: none
 //local: none
 //global: games_played, attempts, match_counter, accuracy
 //functions called: none
 //returns: none

 //notes: need to figure out good place to call this???? onready???????
 //notes: the values are never updated///yet/// i need to figure out where to update them// so that i can have a value for the accuracy
 function display_stats() {
     $('.games-played .value').text(games_played);
     $('.attempts .value').text(attempts);
     $('.accuracy .value').text(accuracy);
 }



 function reset_stats() {

 }