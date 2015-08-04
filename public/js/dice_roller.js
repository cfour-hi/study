$(document).ready(function() {

	// 初始化
	$(".pip_4").hide();

	// mousedown 和 mouseup 效果
	pressBtn();

	// 点击执行
	$("#btn").on('click', function() {

		$('#title').text("shake, shake, shake...");

		$('#title').addClass('shake');

		// 刷新
		setTimeout(function() {

			var roll1 = randomInt();
			var roll2 = randomInt();

			var sum = roll1 + roll2;

			$('#title').text(sum);

			$('#title').removeClass('shake');

			dispDice(roll1, '#dice_1');

			dispDice(roll2, '#dice_2');
		}, 1000);
	});

	// 显示骰子点数
	function dispDice(roll, dice) {

		var all = dice + ' .pip';

		var pip_1 = dice + '_pip_1';
		var pip_2 = dice + '_pip_2';
		var pip_3 = dice + '_pip_3';
		var pip_4 = dice + '_pip_4';
		var pip_5 = dice + '_pip_5';
		var pip_6 = dice + '_pip_6';
		var pip_7 = dice + '_pip_7';

		// 骰子点数显示方式
		if (roll == 1) {

			$(all).hide();

			$(pip_4).show();

		} else if (roll == 2) {

			$(all).hide();

			$(pip_1 + ', ' + pip_7).show();

		} else if (roll == 3) {

			$(all).hide();

			$(pip_1 + ', ' + pip_4 + ', ' + pip_7).show();

		} else if (roll == 4) {

			$(all).show();

			$(pip_2 + ', ' + pip_4 + ', ' + pip_6).hide();

		} else if (roll == 5) {

			$(all).show();

			$(pip_2 + ', ' + pip_6).hide();

		} else if (roll == 6) {

			$(all).show();

			$(pip_4).hide();
		};
	};

	function randomInt() {

		return Math.floor(Math.random() * 6 + 1);
	}

	// 鼠标点击时按钮状态效果(ps：可以用 css 搞定)
	function pressBtn() {

		$('#btn').on('mousedown', function() {

			$(this).removeClass('btn_up');

			$(this).addClass('btn_down');
		});

		$('#btn').on('mouseup', function() {

			$(this).removeClass('btn_down');

			$(this).addClass('btn_up');
		});
	};
});


/**
 * 用户点击按钮后随机获取两粒骰子所对应点数
 *
 * 前端页面显示骰子想对应点数
 */