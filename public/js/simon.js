$(document).ready(function() {
	var colors = ["green", "red", "yellow", "blue"];
	var curPattern = [];
	var i = 0;
	var level = 1;

	$('#play').on('click', function() {
		$('#modal').hide();
		makePattern();
	})

	function makePattern() {
		$('#level').text("Level " + level);
		var color = colors[Math.floor(Math.random() * colors.length)];

		setTimeout(function() {
			curPattern.push(color);
			flashPattern();
		}, 500)
	}

	function playSound(color) {
		var url = color + '.wav';
		document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/" + url + "' type='audio/wav'></audio>";
	}

	function lightPad(color) {
		$('#' + color).addClass('glow_' + color);
		playSound(color);

		setTimeout(function() {
			$('#' + color).removeClass('glow_' + color);
		}, 300)
	}

	function getAttempt() {
		var attempt = [];
		var j = 0;

		$('.pad').on('click', function() {
			var color = this.id;
			attempt.push(color);
			lightPad(color);

			if (curPattern[j] != attempt[j]) {
				playSound('fail');
				$('.pad').off();
				$('#fail').show().fadeOut('slow');
				curPattern = [];
				level = 0;

				setTimeout(function() {
					makePattern();
				}, 800)
			}
			else if (curPattern.length == attempt.length) {
				level++;
				$('.pad').off();
				makePattern();
			}
			else {
				j++;
			}
		})
	}

	function flashPattern() {
		setTimeout(function() {
			if (i < curPattern.length) {
				lightPad(curPattern[i]);
				i++;
				flashPattern();
			}
			else {
				i = 0;
				getAttempt();
			}
		}, 500)
	}
})