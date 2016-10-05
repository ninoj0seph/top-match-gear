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

$(document).ready(function(){
    $(".card").on("click",cardClicked);
    displayStats();
    $(".reset").click(resetStats);
});
//calls function to reveal and hide front
//check for matches, increase counter, check win condition
function cardClicked(){
    //prevent users from revealing all cards at once
    if(cardsFlipped  < 2){
        revealFront(this);
        cardsFlipped +=1;
    }else{//two cards already revealed
        return false;
    }
    if(firstCardClicked === null){//Has first card been flipped?
        firstCardClicked = this;
        firstCardClickedImg = $(firstCardClicked).find(".front").attr("src");
    }else{//First card already flipped, must be second card
        attemptNum += 1;
        secondCardClicked = this;
        secondCardClickedImg = $(secondCardClicked).find(".front").attr("src");
        //is the img src of the two cards the same?
        if(firstCardClickedImg === secondCardClickedImg){
            cardsFlipped = 0;//reset number of cards clicked
            matchCounter += 1;//increase match count by one
            firstCardClicked = null;//clear cards clicked
            secondCardClicked = null;
            if(matchCounter === totalPossibleMatches){//Win condition
                alert("You won!");
            }
        }else{//Cards img src don not match
            setTimeout(function(){
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
function revealFront(theCard){
    $(theCard).find(".back").hide();
}
function coverFront(theCard){
    $(theCard).find(".back").show();
}
function displayStats(){
    $(".games-played .value").text(gamePlayed);
    $(".attempts .value").text(attemptNum);
    $(".accuracy .value").text(matchAccuracy+"%");
}
function resetStats(){
    console.log("Resetting Stats");
    matchAccuracy = matchCounter = attemptNum = 0;
    displayStats();
    $(".back").show();
}