$(document).ready(function() {

	var hour = 0, min = 0, sec = 0;
	var running = false;

	displayTime();

	$('#start').on('click', function() {
		$('#start').attr('disabled', true);
		running = true;
		countUp();
	})

	$('#stop').on('click', function() {
		$('#start').attr('disabled', false);
		running = false;
	})

	$('#reset').on('click', function() {
		$('#start').attr('disabled', false);
		hour = 0, min = 0, sec = 0;
		running = false;
		displayTime();
	})

	function countUp() {
		setTimeout(function() {
			if (running) {

				sec++;

				if (sec == 60) {
					min++;
					sec = 0;
				}
				if (min == 60) {
					hour++;
					min = 0;
				}
				displayTime();
				countUp();
			};
		}, 1000);
	};

	function displayTime() {
		makeDigitalOnes(sec, "second_ones")
		makeDigitalOnes(min, "minute_ones" )
		makeDigitalOnes(hour, "hour_ones")

		makeDigitalTens(sec, "second_tens")
		makeDigitalTens(min, "minute_tens")
		makeDigitalTens(hour, "hour_tens")
	}

	function makeDigitalOnes(time, unit) {
		var ones = time % 10;
		makeNum(ones, unit);
	}

	function makeDigitalTens(time, unit) {
		var tens = Math.floor(time / 10);
		makeNum(tens, unit);
	}

	function makeNum(num, unit) {
		var unit = '.' + unit;

		if (num == 0) {
			$(unit).show();
			$(unit + '.mid').hide();
		}
		if (num == 1) {
			$(unit).hide();
			$(unit + '.right').show();
		}
		if (num == 2) {
			$(unit).show();
			$(unit + '.top.left,' + unit + '.bottom.right').hide();
		}
		if (num == 3) {
			$(unit).show();
			$(unit + '.left').hide();
		}
		if (num == 4) {
			$(unit).hide();
			$(unit + '.top.left,' + unit + '.mid,' + unit + '.right').show();
		}
		if (num == 5) {
			$(unit).show();
			$(unit + '.bottom.left,' + unit + '.top.right').hide();
		}
		if (num == 6) {
			$(unit).show();
			$(unit + '.top.right').hide();
		}
		if (num == 7) {
			$(unit).hide();
			$(unit + '.hor.top,' + unit + '.right').show();
		}
		if (num == 8) {
			$(unit).show();
		}
		if (num == 9) {
			$(unit).show();
			$(unit + '.bottom.left').hide();
		}
	}
})