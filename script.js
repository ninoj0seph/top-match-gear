firstCardClicked = null;
secondCardClicked = null;
totalPossibleMatches = 3;
matchCountered = 0;

$(document).ready(function(){
    $(".card").click(cardClicked);

    function cardClicked(){
        $(this).find(".back").hide();
        if(firstCardClicked === null){
            firstCardClicked = $(this).find(".front").attr("src");
        }else{
            secondCardClicked = $(this).find(".front").attr("src");
            if(firstCardClicked === secondCardClicked){
                matchCountered += 1;
                firstCardClicked = null;
                secondCardClicked = null;
                if(matchCountered === totalPossibleMatches){
                    alert("You won!");
                }
            }else{
                setTimeout(function(){
                    $()
                    firstCardClicked = secondCardClicked = null;
                }, 2000);
            }
        }

    }
});

