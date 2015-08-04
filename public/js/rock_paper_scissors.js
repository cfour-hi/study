$(document).ready(function() {

	// 初始化
	var userChoise, compChoise;

	var choices = ["rock", "paper", "scissors"];

	// 游戏开始
	$('.game_option').on('click', start);

	function start() {

		$('.game_option').off('click');

		userChoise = this.id;

		compChoise = choices[Math.floor(Math.random() * 3)];

		$('.result').hide();

		$('.fist').show();

		countDown();
	};

	// 倒计时
	function countDown() {

		var seconds = 3; 

		count();

		function count() {

			$('.img_container').addClass('shake');

			$('#result').text(seconds);

			if (seconds == 0) {

				displayResult();

			} else {

				seconds--;

				setTimeout(count, 500)
			};
		};
	};

	// 显示游戏结果
	function displayResult() {

		$('#result').text("shoot!");

		$('.img_container').removeClass('shake');

		$('.fist').hide();

		$('.left.' + compChoise).show();
		$('.right.' + userChoise).show();

		setTimeout(function() {

			if (compChoise == userChoise) {

				$('#result').text("Tie!");

			} else if ((compChoise == "rock" && userChoise == "paper") || (compChoise == "paper" && userChoise == "scissors") || (compChoise == "scissors" && userChoise == "rock")) {

				$('#result').text("You win!");

			} else {

				$('#result').text("You lose!")
			};

			$('.game_option').on("click", start);
		}, 500);
	};
});


/**
 * 用户选择点击某一按钮后获取此按钮 id 并随机获取 computer 可选参数
 *
 * (倒计时和动画效果)
 *
 * 根据相关规则判断输赢并给出相对应输出内容
 */