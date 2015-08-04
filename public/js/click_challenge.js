// 禁止鼠标框选内容
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on')
				.css('user-select', 'none')
				.on('selectstart', false);
	};
})(jQuery);

$(document).ready(function() {

	// 游戏开始
	$('#start').on('click', function() {

		// 初始化
		var clicks = 0;

		$('body').css('cursor', 'pointer');

		$('body').disableSelection();

		$('#modal').hide();

		$('.spinner').addClass('spinner_animate');

		$('.filler').addClass('filler_animate');

		$('.mask').addClass('mask_animate');

		// 点击统计，实时输出。
		$('body').on('click', function() {

			clicks++;

			$('#counter').text(clicks);
		});

		// 游戏结束显示内容
		setTimeout(function() {

			var cps = Math.round((clicks / 30) * Math.pow(10, 2)) / Math.pow(10, 2);

			var cpsStr = "clicks";
			var clickStr = "clicks";

			$('h1').text("Time's up!");

			if (clicks == 1) {

				clickStr = "click";
			};

			$('h2').text("You got " + clicks + " " + clickStr + " .");

			if (cps == 1) {

				cpsStr = "click";
			};

			$('#cps').text("That's " + cps + " " + cpsStr + " per second!");

			$('p').html("<a href='click_challenge.html'>Try Again?</a>");

			$('#start').hide();

			$('#modal').show();
		}, 30000)
	});
});