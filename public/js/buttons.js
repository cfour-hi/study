$(document).ready(function() {

	// 初始化
	$('.btn').text('Click Me!');

	$('.btn:first').show();

	$('.btn').on('click', function() {

		$(this).hide();

		newButton();
	})

	// 新按钮初始化
	function newButton() {

		var btn = randomInt(0, 5);

		if (btn == 3) {

			$('#btn_' + btn).css({top: randomInt(50, 450), left: randomInt(50 ,800), backgroundColor: randomColor(), height: randomInt(22, 100), width: randomInt(80, 200)}).show();

		} else {

			$('#btn_' + btn).css({top: randomInt(50, 450), left: randomInt(50, 800)}).show();
		}
	}

	function randomInt(min, max) {

		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor() {

		return '#' + Math.random().toString(16).substr(2, 6);
	}
})