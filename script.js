var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 9;
var matchCounter = 0;
var cardsFlipped = 0;
var firstCardClickedImg = null;
var secondCardClickedImg = null;

$(document).ready(function(){
    $(".card").on("click",cardClicked);
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
        console.log("first: ", firstCardClickedImg);
    }else{//First card already flipped, must be second card
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

}
function revealFront(theCard){
    $(theCard).find(".back").hide();
}
function coverFront(theCard){
    $(theCard).find(".back").show();
}
