var cardCount = 0, matchCount = 0, played = 1;
var firstFlip, secondFlip;

$(document).ready(function(){
    assignCard();

    //code for modal
    $('#settings').click(function(){
        $('#my-modal').css('display', 'block');
    });
    $('.close').click(function(){
        $('#my-modal').css('display', 'none');
    })
});

function assignCard(){
    var randomNumber, splicedImage;
    //name and link of cards
    var myImages = ['asahi','bluemoon', 'bud', 'coors', 'corona','guinness', 'heineken', 'kirin', 'michelob', 'miller', 'modelo', 'newcastle', 'sapporo', 'stella', 'xx'];
    //double the myImages array
    $.merge(myImages, myImages);
    //event delegation
    $.each($('.back-card'), function () {
        randomNumber = Math.floor(Math.random() * myImages.length - 1);
        splicedImage = "url('images/" + myImages.splice(randomNumber, 1) + ".jpg')";
        $(this).attr('image-link', splicedImage).click(function () {
            $(this).css('background-image', $(this).attr('image-link'));
            checkCard($(this));
        });
    });
}

//game logic
function checkCard(cardClicked){
    var cardBack = "url('images/card-back.jpg')";
    if (cardCount % 2 === 0){
        firstFlip = cardClicked;
        cardClicked.css('pointer-events', 'none');
    }else if (cardCount % 2 === 1){
        secondFlip = cardClicked;
        if (firstFlip.attr('image-link') === secondFlip.attr('image-link')){
            matchCount += 1;
            firstFlip.css({'background-image': 'none', 'background-color': 'transparent'}).off('click');
            secondFlip.css({'background-image': 'none', 'background-color': 'transparent'}).off('click');
            $('#prog-bar-fill').css('width', ((matchCount / 14) * 100) + '%');
            if (matchCount > 14){
                reset();
                $('#games-played').text(++played);
                $('#my-modal').css('display','block');
                assignCard();
            }
        }else{
            $('.back-card').css('pointer-events', 'none');
            setTimeout(function(){
                firstFlip.css('background-image', cardBack);
                secondFlip.css('background-image', cardBack);
                $('.back-card').css('pointer-events', 'auto');
            },800);
        }
    }
    $('#attempts').text(cardCount += 1);
    $('#accuracy').text((Math.floor(((matchCount * 2) / cardCount) * 100)) + '%');

    function reset(){ // uncomment to reset individual game stats, currently set for cumulative stats --- cardCount = 0; matchCount = 0;
        $('.back-card').removeAttr('style').addClass('back-card');
        $('#prog-bar-fill').attr('id','#prog-bar-fill');
    }
}