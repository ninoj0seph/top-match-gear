/**
 * Created by njporter10 on 7/11/16.
 */
/**
 * Created by njporter10 on 7/7/16.
 */
var card_front1 = null;
var card_back1 = null;
var card_front2 = null;
var card_back2 = null;


$(document).ready(function(){
  $('.card-contain').on('click',function card_clicked(){
      console.log('Hello');
      $(this).find('.back').show();
  });

});






