$(document).ready(function() {

	$('textarea').focus();

	$('form').on('submit', function(event) {
		event.preventDefault();

		var text = $('textarea').val();
		var y = 0;

		if (text == "") {
			text = "You should probably enter some text next time.";
		}
		
		$('body').css('backgroundColor', '#090919');
		$('header a').addClass('dark');

		$('#container').html("<div class='teleprompter_screen'>" + text + "</div>");

		scrollText(y);

		function scrollText(y) {
			var textHeight = $('.teleprompter_screen').height();

			setTimeout(function() {
				if (y > -1 * textHeight - 150) {
					$('#container').css('top', y);
					y--;

					scrollText(y);
				}
			}, 30)
		}
	})
})


/**
 * 表单提交后获取 textarea 值，判断为空则显示输出特定内容
 *
 * 如果不为空则把 container 元素 html 内容设置为 textarea 值
 *
 * 设置文字内容向上滚动效果
 */