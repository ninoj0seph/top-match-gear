$(document).ready(function(){

    for (var i = 50;i<=350;i+=5){
        $('#weight').append($('<option>').val(i).html(i));
    }
    $('#weight').val(155);

    for (var i = 1;i<=20;i+=1){
        $('#amount-drank').append($('<option>').val(i).html(i));
    }

    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    if (hour.length < 2){hour = '0' + hour;}
    if (min.length < 2){min = '0' + hour;}
    var currentTime = hour + ':' + min;

    $('#start-time').val(currentTime);
    $('#end-time').val(currentTime);

    $('#amount-drank').click(createDrink);

});

function createDrink() {
    $('.drinks').remove();
    var count = parseInt($amountOfDrinks.val());

    for (var i = 0; i < count; i++) {
        var drinkInfo = $('<p>').text('Drink ' + (i + 1));
        var drinkContainer = $('<div>').addClass('drinks').appendTo('body');

        drinkInfo.appendTo(drinkContainer);
    }
}