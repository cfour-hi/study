$(document).ready(function() {

	$('form').on('submit', function(event) {

		event.preventDefault();

		// 总分
		var total = getScore();

		var message;

		// 根据总分判断 message 内容
		if (total < 42*1/4) {

			message = "You're definitely not an SF hipster.";

		} else if (total < 42*1/2) {

			message = "You might be an SF hipster.";

		} else if (total < 42*3/4) {

			message = "You're most likely an SF hipster.";

		} else {

			message = "You're a Super SF Hipster!";
		};

		var your_score = "<div id='score'>You're score is " + total + ".</div>";

			message = "<div id='message'>" + message + "</div>";

		// 输出内容
		$('#container').html(your_score + message);

		// 获取总分
		function getScore() {

			var score = 0;

			for (var i = 0; i < 14; i++) {

				var question = i;

				var answer = $('input[name=q' + i + ']:checked').val();

				if (answer) {

					score += parseInt(answer);
				};
			};
			return score;
		};
	});
});


/**
 * 表单提交后计算出分数总和
 *
 * 判断分数总和给出相对应信息
 */