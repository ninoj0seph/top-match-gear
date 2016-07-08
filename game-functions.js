$(document).ready(function(){
    var cardCount = 0;
    var matchCount = 0;
    var firstFlip;
    var secondFlip;
    var cardBack = "url('images/card-back.jpg')";
    var myImages = [
        'asahi','bluemoon', 'bud', 'coors', 'corona','guinness', 'heineken', 'kirin', 'michelob', 'miller',
        'modelo', 'newcastle', 'sapporo', 'stella', 'xx', 'asahi','bluemoon', 'bud', 'coors', 'corona',
        'guinness', 'heineken', 'kirin', 'michelob', 'miller', 'modelo', 'newcastle', 'sapporo', 'stella', 'xx'
    ];
    var randomNumber;
    var myImagesLen;
    var splicedImage;
    var i = 0;

    $.each($('.back-card'), function(){
        myImagesLen = myImages.length - 1;
        randomNumber = Math.floor((Math.random() * myImagesLen) + 0);
        splicedImage = myImages.splice(randomNumber, 1);
        splicedImage = "url('images/" + splicedImage + ".jpg')"

        $(this).attr('image-link', splicedImage)
        .click(function(){
            $(this).css('background-image', $(this).attr('image-link'));
            checkCard($(this));
        });
        i++;
    });

    function checkCard(cardClicked){
        if (cardCount === 0){
            firstFlip = cardClicked;
            cardCount += 1;
            cardClicked.css('pointer-events', 'none'); //console.log('first card');
        } else if(cardCount === 1){
            secondFlip = cardClicked;
            cardCount = 0; //console.log('second card');
            // $('.back-card').css('pointer-events', 'none');
            if (firstFlip.attr('image-link') === secondFlip.attr('image-link')){ //console.log('match');
                matchCount += 1;

                firstFlip.css('background-image', 'none').css('background-color', 'transparent').off('click').removeClass('back-card');
                secondFlip.css('background-image', 'none').css('background-color', 'transparent').off('click').removeClass('back-card');

                $('.back-card').css('pointer-events', 'auto'); ///////////
                if(matchCount > 14){ //check if win
                    alert('winner winner chicken dinner');
                }
            }else{//console.log('no match');
                $('.back-card').css('pointer-events', 'none');
                setTimeout(function(){
                   firstFlip.css('background-image', cardBack);
                    $('.back-card').css('pointer-events', 'auto');
                },1500);
                setTimeout(function(){
                   secondFlip.css('background-image', cardBack);
                    $('.back-card').css('pointer-events', 'auto');
                },1500);
            }
        }
    }
});