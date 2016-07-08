/**
 * Created by njporter10 on 7/7/16.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 2;
var match_counter = 0;
var timesClicked = 0;
var click_counter=0;


$(document).ready(function(){
   $('.card-contain').on('mouseup',function card_clicked() {
       $(this).children('.back').css('z-index', '1');
       click_counter++;
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
                    match_counter++;
//----------------------this is the number of matches and type of birds---------------------------
                    var matches = $('<li>',{
                        appendTo: $('.attempts'),
                        html: 'Match ' + match_counter +" - " + " Bird Name: " + second_card_clicked,
                        style: 'color: blue; list-style-type: none'
                    });
//---------------------this displays the accuracy of the player----------------------------------
                    var accuracy = $('<p>',{
                        appendTo: $('.accuracy'),
                        html: match_counter/click_counter *10 + "%"
                    });

                }
                else{
                    alert("Try Again");
                    $('.back').css('z-index', '0');
                }
 //--------------------this displays that you win to the window----------------------------------
           if(match_counter == 8){
               var you_win = $('<div>',{
                   appendTo:$('.youWin'),
                   style: "height:200px; width: 300px; background-color: red; font-size:20px; position:absolute; z-index:1; float:right",
                   text: 'You found all the bird matches!'
               });
               alert('You found all the bird matches!')
           }
        }


   });






});

