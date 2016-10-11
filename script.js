$(document).ready(function () {
    $(".card").on("click", card_clicked);
    //update_stats();

    var first_card = null;
    var second_card = null;
    var total_possible_matches = 9;
    var match_counter = 0;
    var cards_flipped = 0;

    var matches = 0;
    var attempts = 0;
    var accuracy = 0;
    var games_played = 0;

    function update_stats() {
        $(".attempts > .value").html(attempts);
        $(".accuracy > .value").html(accuracy + " %");
        $(".games-played > .value").html(games_played)
    };

    function card_clicked() {
        show_card(this);
        if (first_card === null) {
            first_card = this;
        }
        else {
            second_card = this;
            var first_card_image = $(first_card).find(".front img").attr("src");
            var second_card_image = $(second_card).find(".front img").attr("src");
            // console.log("FIRST CARD IMG SRC: ", first_card_image);
            // console.log("SECOND CARD IMG SRC: ", second_card_image);

            console.log("ATTEMPTS", attempts++); // TEST TEST TEST
            attempts++;

            if (first_card_image === second_card_image) {
                console.log("\nIT'S A MATCH");
                match_counter++;
                first_card = null;
                second_card = null;

                console.log("MATCHES", matches++); // TEST TEST TEST
                matches++;

                if (match_counter === total_possible_matches) {
                    alert("You won");
                }
                else {
                    match_counter = this;
                }
            }
            else {
                console.log("\nNOT A MATCH");
                setTimeout(function () {
                    cover_card(first_card);
                    cover_card(second_card);
                    first_card = null;
                    second_card = null;
                    cards_flipped = 0;
                }, 2000);
                //console.log("ACCURACY", accuracy()); //TEST TEST TEST

            }
            //console.log("ACCURACY", accuracy()); //TEST TEST TEST
            accuracy = (matches / attempts * 100).toFixed(2);
            update_stats()
        }

    };


    function show_card(ele) {
        $(ele).find(".back").hide();
    }

    function cover_card(ele) {
        $(ele).find(".back").show();
    }
});

