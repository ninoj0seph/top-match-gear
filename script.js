$(document).ready(function () {
    $(".card").click(card_clicked);


var first_card = null;
var second_card = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked() {
   show_card(this);
    if (first_card === null) {
        first_card = this;
    }
    else {
        second_card = this;
        var first_card_image = $(first_card).find(".front img").attr("src");
        var second_card_image = $(second_card).find(".front img").attr("src")
        console.log("FIRST CARD IMG SRC: ", first_card_image);
        console.log("SECOND CARD IMG SRC: ", second_card_image);

        if(first_card_image === second_card_image){
            console.log("\n MATCH");
            match_counter++;
            first_card = null;
            second_card = null;

            if(match_counter === total_possible_matches){
                alert("You won"); //Display a message to the user they have won
            }
            else {
                match_counter = this; //click handler functionality is complete, return
            }
        }
        else {
            console.log("\n NO MATCH")
            setTimeout(function(){
                $().find(".back").show()
                , 2000
                $().find(".back").hide()

                first_card = null;
                second_card = null;

                first_card_image = this;
            })
        }
    }
}

function show_card(ele){
    // use jquery to find the .back element within the ele element. then use .hide() to hide the .back element
    $(ele).find(".back").hide();
}

});