 /* new */
$(document).ready(card_clicked);

function card_clicked() {
    $(".card").click(function () {
        var thisCard = $(this);

        thisCard.children('.back').css('display', "none");  //do i want to rework this.
    });
}