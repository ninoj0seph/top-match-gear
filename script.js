$('.card').click(card_clicked);
$('.reset').click(game_reset);

var first_card_clicked = null,
		second_card_clicked = null,
		total_possible_matches = 9,
		match_counter = 0,
		attempts = 0,
		accuracy = 0,
		games_played = 0;

function card_clicked() {
	var $this = $(this);
	if ($this.hasClass('clicked') || $this.hasClass('disabled') || $this.hasClass('matched')) return;

	// $this.find('.back').hide();
	$this.addClass('clicked');
	// $this.addClass('disabled');
	if (first_card_clicked === null) {
		first_card_clicked = $this.find('img');
		return;
	} else {
		attempts++;
		second_card_clicked = $this.find('img');
		if (first_card_clicked.attr('src') == second_card_clicked.attr('src')) {
			match_counter++;
			first_card_clicked.closest('.card').addClass('matched');
			second_card_clicked.closest('.card').addClass('matched');
			if (match_counter == total_possible_matches) {
				var winText = $('<p>').addClass('win-text').text("You WIN!");
				$('.stats').append(winText);
			} else {
				first_card_clicked = null;
				second_card_clicked = null;
			}
		} else {
			$('.card').addClass('disabled');
			setTimeout(function() {
				$('.card').removeClass('disabled');
				// first_card_clicked.closest('.card').find('.back').show();
				// second_card_clicked.closest('.card').find('.back').show();
				first_card_clicked.closest('.card').removeClass('clicked');
				second_card_clicked.closest('.card').removeClass('clicked');
				first_card_clicked = null;
				second_card_clicked = null;
			}, 1000);
		}
	}
	accuracy = Math.round(match_counter / attempts * 100); //percentage
	display_stats();
}

function display_stats() {
	$('.attempts .value').text(attempts);
	$('.accuracy .value').text(accuracy + '%');
	$('.games-played .value').text(games_played);
}

function reset_stats() {
	accuracy = 0;
	match_counter = 0;
	attempts = 0;
	games_played++;
}

function game_reset() {
	reset_stats();
	display_stats();
	$('.card').removeClass('matched').removeClass('disabled').removeClass('clicked');
	$('.back').show();
	$('.win-text').remove();
	first_card_clicked = null;
	second_card_clicked = null;
}