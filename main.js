//Declare and assign 3 global (see scope presentation) variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

//declare a new function
function card_clicked(front,back){
    //$(elem).hide();
    if (first_card_clicked == null){
        first_card_clicked = front;
        console.log("first card clicked= ",first_card_clicked);
        return;
    } else {
        second_card_clicked = front;
        console.log("second card clicked= ",second_card_clicked);
        if (first_card_clicked == second_card_clicked) {
            match_counter += 1;
            first_card_clicked = null; second_card_clicked = null;
            console.log(" first_card_clicked ",  first_card_clicked, "second_card_clicked ", second_card_clicked);
            if (match_counter == total_possible_matches) {
                alert("You won!");
            } else {
                alert("Not done yet");
                return;
            }
        } else {
            setTimeout(showBack,3000);
            function  showBack(){
                alert("what now?");
            }
            //$('.card').attr('src',back);
            return;
        }
    }
}

$(document).ready(function(){
    //.click is like using the onclick attribute we used before
    //It creates an event handler for when div1 is clicked
    //Add click method to a jQuery Selector with the parameter equal to a function called card_clicked
    $(".card").on("click", function(){
        $(this).find('.back').hide();
        var front = $(this).find('.front').html();
        var back = $(this).find('.back').html();
        //console.log('front will be ',front);
        //console.log('back will be ',back);
        card_clicked(front,back);
    });
});