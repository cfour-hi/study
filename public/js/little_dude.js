$(document).ready(function() {

	(function(dude, $) {

		// 公共属性
		var health = 10;
		var love = 10;
		var happiness = 10;

		// 公共方法
		dude.feed = function() {

			health += randomInt(2, 4);

			$('#mouth').addClass('feed');

			setTimeout(function() {

				$('#mouth').removeClass('feed');
			}, 1000)

			decrementVitalSigns('feed');
		}

		dude.hug = function() {

			love += randomInt(2, 4);

			$('#head').addClass('hug');

			setTimeout(function() {

				$('#head').removeClass('hug');
			}, 700)

			decrementVitalSigns('hug');
		}

		dude.play = function() {

			happiness += randomInt(2, 4);

			$('#duge_container').addClass('play');

			setTimeout(function() {

				$('#duge_container').removeClass('play');
			}, 1000)

			decrementVitalSigns('play');
		}

		// 私有方法
		function decrementVitalSigns(action) {

			if (action == 'feed') {

				love -= randomInt(1, 2);
				happiness -= randomInt(1, 2);

			} else if (action == 'hug') {

				health -= randomInt(1, 2);
				happiness -= randomInt(1, 2);

			} else if (action == 'play') {

				health -= randomInt(1, 2);
				love -= randomInt(1, 2);
			}

			updateStats();

			styleDude();

			if (health <= 0 || love <= 0 || happiness <= 0) {

				$('#modal').show();
			}
		}

		// dude 样式
		function styleDude() {

			if (health >= 23) {

				$('#head').css({
					top: 50,
					left: 50,
					height: 350,
					width: 415
				});
			} else if (health >= 18) {

				$('#head').css({
					top: 100,
					left: 100,
					height: 250,
					width: 300
				});
			} else if (health >= 12) {

				$('#head').css({
					top: 125,
					left: 130,
					height: 200,
					width: 240
				});
			} else {
				$('#head').css({
					top: 150,
					left: 160,
					height: 150,
					width: 180
				});
			}

			if (love >= 23) {

				$('#head').css('backgroundColor', '#d6003d');
			} else if (love >= 18) {

				$('#head').css('backgroundColor', '#ff749c');
			} else if (love >= 14) {

				$('#head').css('backgroundColor', '#ff749c');
			} else if (love < 14 && love >= 6) {

				$('#head').css('backgroundColor', '#fffffa');
			} else {

				$('#head').css('backgroundColor', '#d8e6d4');
			}

			if ((health < 6) || (love < 6) || (happiness < 6)) {

				$('#mouth').removeClass('smile').removeClass('joy').addClass('frown');
			} else if (happiness >= 14) {

				$('#mouth').removeClass('smile').removeClass('frown').addClass('joy');
			} else {

				$('#mouth').removeClass('frown').removeClass('joy').addClass('smile');
			}
		}

		// 更新状态
		function updateStats() {

			if (health <= 0 || love <= 0 || happiness <= 0) {

				$('#health').text("Health: XXX");

				$('#love').text("Love: XXX");

				$('#happiness').text("Happiness: XXX");

			} else {

				$('#health').text("Health: " + health);

				$('#love').text("Love: " + love);

				$('#happiness').text("Happiness: " + happiness);
			}
		}
	})(window.dude = window.dude || {}, jQuery);

	$('#btn_feed').on('click', dude.feed);

	$('#btn_hug').on('click', dude.hug);

	$('#btn_play').on('click', dude.play);

	function randomInt(min, max) {

		return Math.floor(Math.random() * (max - min + 1) + min);
	}
})