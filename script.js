var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClickedImg = null;
var secondCardClickedImg = null;
var attemptNum = 0;
var matchAccuracy = 0;
var gamePlayed = 0;
var matchCounter = 0;
var cardsFlipped = 0;
var totalPossibleMatches = 9;
//the deck that will be passed into createGameArea
var cardFrontImg = ["img/brook.png", "img/brook.png",
                    "img/chopper.png", "img/chopper.png",
                    "img/franky.png", "img/franky.png",
                    "img/luffy.png", "img/luffy.png",
                    "img/nami.png", "img/nami.png",
                    "img/robin.png", "img/robin.png",
                    "img/sanji.png", "img/sanji.png",
                    "img/usopp.png", "img/usopp.png",
                    "img/zoro.png", "img/zoro.png"
];
var cardBackImg = "img/jollyRoger.png";
var cardPerRow = 6;

$(document).ready(function(){
    createGameArea(cardFrontImg);
    $("#game-area").on("click", ".card", cardClicked);
    displayStats();
    $(".reset").click(resetStats);
});

//calls function to reveal and hide front
//check for matches, increase counter, check win condition
function cardClicked()
    {
    //prevent users from revealing all cards at once
    if(cardsFlipped  < 2){
        revealFront(this);
        cardsFlipped +=1;
    }
    else
    {//two cards already revealed
        return false;
    }

    //Has first card been clicked and assigned a card?
    if(firstCardClicked === null)
    {
        firstCardClicked = this;
        firstCardClickedImg = $(firstCardClicked).find(".front").attr("src");
    }
    else
    {//firstCardClicked !== null; Second card is being clicked
        attemptNum += 1;
        secondCardClicked = this;
        secondCardClickedImg = $(secondCardClicked).find(".front").attr("src");
        //is the img src of the two cards the same?

        if(firstCardClickedImg === secondCardClickedImg)
        {
            cardsFlipped = 0;//reset number of cards clicked
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
            setTimeout(function()
            {
                //hide card fronts with card backs
                coverFront(firstCardClicked);
                coverFront(secondCardClicked);
                firstCardClicked = secondCardClicked = null;
                cardsFlipped = 0;
            }, 2000);
        }
    }
    matchAccuracy = ((matchCounter/attemptNum)*100).toFixed(2);
    displayStats();
}
function revealFront(theCard)
{
    $(theCard).find(".back").hide();
}

function coverFront(theCard)
{
    $(theCard).find(".back").show();
}

function displayStats()
{
    $(".games-played .value").text(gamePlayed);
    $(".attempts .value").text(attemptNum);
    $(".accuracy .value").text(matchAccuracy+"%");
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
    createGameArea(cardFrontImg);
}

//creates a new game area of shuffle cards with 3 rows of 6 cards
function createGameArea(deck)
{
    var cardsInDeck = deck.length - 1;
    shuffle(deck, cardsInDeck);//shuffle the deck of images before setting up

    //Loop the length of cardFrontImg array. i takes value of j at end of nested loop
    for(var i = 0; i <= cardsInDeck; i)
    {
        var $newRow = $("<div>").addClass("row card-row");//new card row
        //create 6 column of cards with fronts and backs. i passes j starting value.
        for(var j = i; j < i + cardPerRow; j++)
        {
            var $cardBox = $("<div>").addClass("col-sm-2 card-col");//column/container for card
            var $newCard = $("<div>").addClass("card");
            var $frontImg = $("<img>").addClass("front").attr("src", cardFrontImg[j]);
            var $backImg = $("<img>").addClass("back").attr("src", cardBackImg);

            $newCard.append($frontImg, $backImg);
            $cardBox.append($newCard);
            $newRow.append($cardBox);
        }
        i = j;
        $("#game-area").append($newRow);
    }

}
//shuffles array of img src
function shuffle(deck, deckSize)
{
    //console.log("Array before", cardFrontImg);
    var temp = null;
    var randomNum = 0;

    for(var i = deckSize; i > 0; i--)
    {
        randomNum = Math.floor(Math.random()*deckSize);
        temp = deck[i];
        deck[i] = deck[randomNum];
        deck[randomNum] = temp;
    }
    // console.log("Array of img", cardFrontImg);
    // console.log("Length after shuffle", cardFrontImg.length)
}