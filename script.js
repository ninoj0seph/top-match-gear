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
	$this.addClass('clicked');
	if (first_card_clicked === null) {
		first_card_clicked = $this;
		return;
	} else {
		attempts++;
		second_card_clicked = $this;
		if (first_card_clicked.find('img').attr('src') == second_card_clicked.find('img').attr('src')) {
			match_counter++;
			first_card_clicked.addClass('matched');
			second_card_clicked.addClass('matched');
			if (match_counter == total_possible_matches) {
				$('.win-text').show();
			} else {
				first_card_clicked = null;
				second_card_clicked = null;
			}
		} else {
			$('.card').addClass('disabled');
			setTimeout(function() {
				$('.card').removeClass('disabled');
				first_card_clicked.removeClass('clicked');
				second_card_clicked.removeClass('clicked');
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
	$('.card').removeClass('matched').removeClass('clicked');
	randomize();
	$('.card').removeClass('disabled');
	$('.win-text').hide();
	first_card_clicked = null;
	second_card_clicked = null;
}

var $front = $('.front');
var $card = $('.card');

function numSequence() {
	var numbers = [];
	var random = [];
	var index;
	for (var i=0; i<18; i++) {
		numbers.push(i);
	}
	for (i; i>0; i--) {
		index = Math.floor(Math.random()*i);
		random.push(numbers.splice(index,1)[0]);
	}
	return random;
}

function randomize() {
	var sequence = numSequence();
	$front.remove();
	$card.each(function(i) {
		$(this).prepend($front[sequence[i]]);
	});
}

randomize();