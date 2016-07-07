/**
 * Created by njporter10 on 7/7/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 2;
var match_counter = 0;

$(document).ready(function(){
   $('.card-contain').one('mouseup',function card_clicked(){
       $(this).children('.front').css('z-index', '0');
       })




});

