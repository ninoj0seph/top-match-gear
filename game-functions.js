

$(document).ready(function(){

    function Card (id, imgLink) {
        this.id = id;
        this.imgLink = '';
        this.consoleTest = function consoleTest() {
            console.log( this.id + " " + this.imgLink);
        };
    }

    //instantiate
    var newCard = new Card(1, 'images/stella.jpg');


});