$(document).ready(function() {

	// 初始化
	var curDrops = 'rain';

	// 初始化数量和坐标
	makeDrop(150, randomInt(35, 280));

	// 初始化雨滴的数量和速度
	makeRain(150, 150);

	// 桃心
	$('#heart_btn').on('click', function() {

		$('.drop').removeClass(curDrops).addClass('heart');

		removeBacon();

		curDrops = 'heart';
	});

	// 雨滴
	$('#rain_btn').on('click', function() {

		$('.drop').removeClass(curDrops).addClass('rain');

		removeBacon();

		curDrops = 'rain';
	});

	// bacon
	$('#bacon_btn').on('click', function() {

		$('.drop').removeClass(curDrops);

		insertBacon(150);

		curDrops = 'bacon';
	});

	// 执行插入 bacon
	function insertBacon(num) {

		if (num > 0) {

			$('#drop_' + num).html("<img src='images/bacon_" + randomInt(1, 2) + ".png' />");

			num--;

			insertBacon(num);
		};
	};

	// 移除 bacon
	function removeBacon() {

		$('.drop').html("");
	};

	// 执行
	function makeRain(num, speed) {

		if (num > 0) {

			setTimeout(function() {

				$('#drop_' + randomInt(1, 150)).addClass('animate');

				num--;

				makeRain(num, speed);
			}, speed);
		};
	};

	// 执行
	function makeDrop(num, position) {

		if (num > 0) {

			var drop = "<div class='drop rain' id='drop_" + num + "'></div>";

			$('#drop_container').append(drop);

			$('#drop_' + num).css('left', position);

			num--;

			makeDrop(num, randomInt(60, 280))
		};
	};

	function randomInt(min, max) {

		return Math.floor(Math.random() * (max - min + 1) + min);
	};
});