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
    if (hour.toString().length < 2){hour = '0' + hour;}
    if (min.toString().length < 2){min = '0' + min;}
    var currentTime = hour + ':' + min;

    $('#start-time').val(currentTime);
    $('#end-time').val(currentTime);

    $('#amount-drank').change(function(){
        createDrink();
        $('#drink').remove();
    });

});
function createDrink(){
    var tempCount = $('input[type=number]').length / 2;
    var count = $('#amount-drank').val();
    
    for (var i = 0; i < count; i++) {
        $('#drink').clone().appendTo('fieldset');
    }
    for (var i = 0; i < tempCount - 1; i++) {
        $('#drink').remove();
    }
    $('input[type=button]').remove();
    
    var mainDiv = $('<div>').addClass('form-group');
    var secDiv = $('<div>').addClass('col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1');
    var inputButton = $('<input type="button">').addClass('form-control btn-danger').attr(
        {'id': 'calculate',
            'value': 'Calculate',
            'data-toggle': 'modal',
            'data-target':'#myModal'
        });
    inputButton.click(function(){
        calculateBAC();

    });

    mainDiv.appendTo('fieldset');
    secDiv.appendTo(mainDiv);
    inputButton.appendTo(secDiv);
}
function calculateBAC(){
    var weight = $('#weight').val();
    weight = parseFloat(weight);

    var genderMultiplier = $('#gender').val();
    genderMultiplier = parseFloat(genderMultiplier);

    var startTime = $('#start-time').val();
    var startHour = startTime.substring(0,2);
    var startMin = startTime.substring(3,5);

    var endTime = $('#end-time').val();
    var endHour = endTime.substring(0,2);
    var endMin = endTime.substring(3,5);

    var time1 = new Date(1970, 0, 1,  startHour, startMin);
    var time2 = new Date(1970, 0, 1, endHour, endMin);

    if (time2 < time1) {
        time2.setDate(time2.getDate() + 1);
    }

    var timeDiff = time2 - time1; //who in their right mind works in milliseconds? the flash?
    var timeDiff = timeDiff / 1000 / 60 / 60; //convert to hours

    var alcoholConsumed = 0;
    var ozArray = $('input[type=number]:odd');
    var abvArray = $('input[type=number]:even');

    for (var i = 0; i< ozArray.length; i++){
        var oz = parseFloat(ozArray[i].value);
        var abv = parseFloat(abvArray[i].value);
        alcoholConsumed += abv * oz;
    }
    alcoholConsumed = alcoholConsumed / 100;

    var bac = (alcoholConsumed * 5.14 / weight * genderMultiplier) - 0.015 * timeDiff;

    $('#abv-text').html('Your Blood Alcohol Content is ' + bac.toFixed(2)  + '%');
    $('#myModal').show();

}