/**
 * Created by njporter10 on 7/7/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 2;
var match_counter = 0;
var timesClicked = 0;
$(document).ready(function(){
   $('.card-contain').on('mouseup',function card_clicked() {
       $(this).children('.back').css('z-index', '1');
       timesClicked++;
       if(timesClicked === 1){
           first_card_clicked = $(this).children($('.back')).children($('img')).attr('class');
           console.log(first_card_clicked);
       }
       if(timesClicked > 1){
            $(this).css('z-index', '1');
            timesClicked = 0;
            second_card_clicked = $(this).children($('.back')).children($('img')).attr('class');
            console.log(second_card_clicked);
                if(first_card_clicked==second_card_clicked){
                    alert("Great Match You Found " + second_card_clicked);
                    $(this).remove();
                }
                else{
                    alert("Try Again");
                    $('.back').css('z-index', '0');
                }

        }



   });



});

