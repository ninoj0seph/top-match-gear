var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;


function card_clicked(clickedCard) {
     //console.log(clickedCard);
     var frontOfCardClicked= $(clickedCard).find('.front');
    //console.log(frontCard);
     var $backFace = $(clickedCard).find('.back');
    //console.log(clickedCard);
    /*if (first_card_clicked == null || second_card_clicked == null) {
        $backFace.hide();
    };*/

    $backFace.hide();

    if (first_card_clicked === null) {
        first_card_clicked = clickedCard;
        second_card_clicked = null;
        //console.log('This is the first card', first_card_clicked);
    } else {
        second_card_clicked = clickedCard;
          var first_card_image = $(first_card_clicked).find('.front img').attr('src');
        //console.log('This is the first image', first_card_image);
          var second_card_image = $(second_card_clicked).find('.front img').attr('src');
        //console.log('This is the second image', second_card_image);

        if(first_card_image === second_card_image   ) {
            match_counter ++;
            console.log('MATCH!', match_counter );
            first_card_clicked = null;
            second_card_clicked = null;

            if(match_counter == total_possible_matches) {
                console.log('You have won.')
            } else {
                return;
            };
            return;
        } else {
            setTimeout(function(){
                $(first_card_clicked).find('.back').show();
                $(second_card_clicked).find('.back').show();
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);

            console.log('no MATCH!');
            return;
        }

    }

}
