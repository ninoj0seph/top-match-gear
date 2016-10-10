var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClickedImg = null;
var secondCardClickedImg = null;
var attemptNum = 0;
var matchAccuracy = 0;
var gamePlayed = 0;
var matchCounter = 0;
var totalPossibleMatches = 9;
//the deck that will be passed into createGameArea
var cardFrontImg = [
    "img/brook.png", 
    "img/chopper.png", 
    "img/franky.png", 
    "img/luffy.png", 
    "img/nami.png", 
    "img/robin.png",
    "img/sanji.png", 
    "img/usopp.png",
    "img/zoro.png"
];
var deckOfTwoEach = cardFrontImg.concat(cardFrontImg);//add the array of img to an array of itself
var cardBackImg = "img/jollyRoger.png";
var cardPerRow = 6;

$(document).ready(function()
{
    createGameArea(deckOfTwoEach);
    $("#game-area").on("click", ".card", cardClicked);
    displayStats();
    $(".reset").click(resetStats);
});

//calls function to reveal and hide front
//check for matches, increase counter, check win condition
function cardClicked()
{
    if($(this).hasClass("flipped")){
        return;
    }
    revealFront(this);

//TODO alter click handlers on reveal so that clicking on revealed does not increase match counter
    //Has first card been clicked and assigned a card?
    if(firstCardClicked === null)
    {
        firstCardClicked = this;
        firstCardClickedImg = $(firstCardClicked).find(".front").attr("src");
        console.log("1st: ", firstCardClickedImg)
    }
    else
    {//firstCardClicked !== null; Second card is being clicked
        attemptNum += 1;
        secondCardClicked = this;
        secondCardClickedImg = $(secondCardClicked).find(".front").attr("src");
        console.log("2nd: ", secondCardClickedImg);
        //is the img src of the two cards the same?

        if(firstCardClickedImg === secondCardClickedImg)
        {
            fadeCard(firstCardClicked);
            fadeCard(secondCardClicked);
            matchCounter += 1;//increase match count by one
            firstCardClicked = null;//clear cards clicked
            secondCardClicked = null;
            //Win condition met?
            if(matchCounter === totalPossibleMatches)
            {
                alert("You won!");
            }
        }
        else
        {//Cards img src don not match
            $("#game-area").off("click", ".card");//No cheating!
            setTimeout(noMatch, 2000);
        }
    }
    console.log("Matched count: " + matchCounter);
    displayStats();
}

function revealFront(theCard)
{

    $(theCard).addClass("flipped").find(".back").hide();

}

function coverFront(theCard)
{

    $(theCard).removeClass("flipped").find(".back").show();
}

function noMatch(){
    //hide reveal card fronts
    coverFront(firstCardClicked);
    coverFront(secondCardClicked);
    //reset stored cards;
    firstCardClicked = secondCardClicked = null;
    //enable card flipping
    $("#game-area").on("click", ".card", cardClicked);
}
function displayStats()
{
    $(".games-played .value").text(gamePlayed);
    $(".attempts .value").text(attemptNum);
    $(".accuracy .value").text(calcAccuracy()+"%");
}

function resetStats()
{
    matchAccuracy = matchCounter = attemptNum = 0;
    //increment number of games played
    gamePlayed++;
    //refreshes displayed stats with new values
    displayStats();
    //Clear out game-area before adding new card arrangement
    $("#game-area").empty();
    createGameArea(deckOfTwoEach);
}
function calcAccuracy(){
    if(attemptNum === 0){
        return 0;
    }else {
        return ((matchCounter / attemptNum) * 100).toFixed(2);
    }
}
//creates a new game area of 3 rows of 6 cards
function createGameArea(deck)
{
    var cardsInDeck = deck.length - 1;
    shuffle(deck, cardsInDeck);//shuffle the deck of images before setting up

    //Loop the length of deckOfTwoEach array. i takes value of j at end of nested loop
    for(var i = 0; i <= cardsInDeck; i)
    {
        var $newRow = $("<div>").addClass("row card-row");//new card row
        //create 6 column of cards with fronts and backs. i passes j starting value.
        for(var j = i; j < i + cardPerRow; j++)
        {
            var $cardBox = $("<div>").addClass("col-sm-2 card-col");//column/container for card
            var $newCard = $("<div>").addClass("card");
            var $frontImg = $("<img>").addClass("front").attr("src", deckOfTwoEach[j]);
            var $backImg = $("<img>").addClass("back").attr("src", cardBackImg);

            $newCard.append($frontImg, $backImg);
            $cardBox.append($newCard);
            $newRow.append($cardBox);
        }
        i = j;//outer loop start where nested left off
        $("#game-area").append($newRow);
    }

}
//takes an array and its length-1 and shuffles in place
function shuffle(deck, deckSize)
{
    //console.log("Array before", deckOfTwoEach);
    var temp = null;
    var randomNum = 0;

    for(var i = deckSize; i > 0; i--)
    {
        randomNum = Math.floor(Math.random()*i);
        temp = deck[i];
        deck[i] = deck[randomNum];
        deck[randomNum] = temp;
    }
    //console.log("Array of img", deckOfTwoEach);
    //console.log("Length after shuffle", deckOfTwoEach.length)
}

function fadeCard(card){
    $(card).find(".front").fadeTo("slow", 0.75);
}