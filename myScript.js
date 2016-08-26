/**
 * Created by Weizguy on 8/25/2016.
 */
var cardArray = [1, 2]; //, 3, 4, 5, 6, 7, 8, 9];
cardArray = cardArray.concat(cardArray);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function randomImg() {

    var ranArray = [];

    while (cardArray.length != 0) {
        var ran = Math.floor(Math.random() * (cardArray.length - 1) - 1) + 1;
        ranArray.push(cardArray[ran]);
        cardArray.splice(ran, 1);
    }


    $('.back').each(function(val) {

        console.log("current image number: ", ranArray[val]);
        $(this).css('background', 'url(' + 'images/cards/' + ranArray[val] + '.jpg' + ')');
        $(this).css('background-size', '150px 200px');

    });
}


$(document).ready(function () {


    randomImg();

    $(".card").flip();
    $(".front").click(function () {
        console.log("card flipped");
        if (first_card_clicked == null) {
            first_card_clicked = 1;
            console.log(first_card_clicked);
        } else
            console.log("second card");
    });
});