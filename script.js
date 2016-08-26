$('.card').click(card_clicked);

var first_card_clicked = null,
		second_card_clicked = null,
		total_possible_matches = 2,
		match_counter = 0;

function card_clicked() {
	var $this = $(this);

	if ($this.hasClass('disabled')) return;

	$this.find('.back').hide();
	$this.addClass('disabled');
	if (first_card_clicked === null) {
		first_card_clicked = $this.find('img');
	} else {
		second_card_clicked = $this.find('img');
		if (first_card_clicked.attr('src') == second_card_clicked.attr('src')) {
			match_counter++;
			if (match_counter == total_possible_matches) {
				var winText = $('<p>').text("You WIN!");
				$('.stats').append(winText);
				setTimeout(function() {
					$('.card').removeClass('disabled');
					$('.back').show();
					first_card_clicked = null;
					second_card_clicked = null;
					match_counter = 0;
					winText.remove();
				}, 2000);
			} else {
				first_card_clicked = null;
				second_card_clicked = null;
			}
		} else {
			$('.card').addClass('disabled');
			setTimeout(function() {
				$('.card').removeClass('disabled');
				first_card_clicked.closest('.card').find('.back').show();
				second_card_clicked.closest('.card').find('.back').show();
				first_card_clicked = null;
				second_card_clicked = null;
			}, 2000);
		}
	}
}