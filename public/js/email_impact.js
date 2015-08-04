$(document).ready(function() {

	// 初始化
	$('textarea').focus();

	// 检查是否为移动端
	if (navigator.userAgent.indexOf('Mobile') != -1) {

		$('#start').text('Tap "Start" to start typing and see a visual representation of how long your email is!');

		$('#prompt_container').append("<button>Start</button>");

		$('button').on('click', function() {

			$('#prompt_container').fadeOut('slow');

			$('textarea').focus().css('text-align', "left");
		});
	};

	// 点击执行
	$('body').on('click', function() {

		$('textarea').focus();
	});

	// 按下键盘执行，只执行一次。
	$('textarea').one('keypress', function() {

		$('#prompt_container').fadeOut('slow');

		$('#info_container').fadeIn('slow');
	});

	// 松开键盘执行
	$('textarea').on('keyup', function() {

		var text = $('textarea').val();

		// 根据 text 的长度变换 text 的 size 大小
		// text 长度越长，size 越小
		var size = 130 * (Math.pow(Math.pow(1/13, (1/250)), text.length));

		$('textarea').css('font-size', size + 'px');

		$('span').text(text.length);

		// 根据 text 的长度改变 info_container 的背景颜色
		if (text.length >= 150) {

			$('#info_container').css('backgroundColor', '#f2ad00');
		};

		if (text.length >= 200) {

			$('#info_container').css('backgroundColor', '#ed6700');
		};

		if (text.length >= 250) {

			$('#info_container').css('backgroundColor', '#ba000d');
		};

		if (text.length < 150) {

			$('#info_container').css('backgroundColor', '#42863e');
		};
	});
});