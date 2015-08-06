$(document).ready(function() {
	var words = getArray();
	var word = getWord();
	var letters = shuffle(word);
	var score = 0;
	var chances = 3;

	$('#play').on('click', function() {
		$(this).hide();
		$('#game').show();
		$('#message').text("Here's your first word. Good Luck!");
		$('#guess').focus();
	});

	$('#letters').text(letters);

	$('form').on('submit', function(e) {
		e.preventDefault();
		checkGuess();
	});

	function checkGuess() {
		var guess = $('#guess').val().toUpperCase();
		guess = $.trim(guess);

		if (guess == word) {
			score++;
			$('#word').text("Correct! The word was " + word);
			$('#count').text("Score: " + score);
			$('#message').empty();
			$('form input:submit').attr('disabled', true);

			setTimeout(function() {
				$('form input:submit').attr('disabled', false);
				$('#guess').val('');

				newRound();
			}, 3000);
		}
		else {
			chances--;

			if (chances > 0) {
				$('#message').text("Incorrect! " + chances + " chance left");
				$('#guess').focus();
			} else {
				score--;
				$('#count').text("Score: " + score);
				$('#message').text("Incorrect! You are out of chances");
				$('#word').text("The word was " + word);
				$('form input:submit').attr('disabled', true);

				setTimeout(function() {
					$('form input:submit').attr('disabled', false);
					$('#guess').val('');

					newRound();
				}, 3000)
			};
		};
	};

	function newRound() {
		word = getWord();
		letters = shuffle(word);
		chances = 3;
		$('#message').text("Here is your next word");
		$('#letters').text(letters);
		$('#guess').focus();
		$('#word').empty();
	}

	function shuffle(str) {
		var w = str.split('');
		var len = w.length;

		for (var i=0; i<len-1; i++) {
			var j = Math.floor(Math.random() * (len-i));
			var tmp = w[i];
			w[i] = w[j];
			w[j] = tmp;
		};
		return w.join('');
	};

	function getWord() {
		var newWord = words[Math.floor(Math.random() * words.length)];
		return newWord.toUpperCase();
	};

	function getArray() {
		var array;
		$.ajax({
			type: "GET",
			url: "http://z1992.github.io/study/public/words.html",
			async: false,
			success: function (data) {
				array = data.split('\n');
			}
		});
		return array;
	};
});