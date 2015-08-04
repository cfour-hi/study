// 禁止鼠标框选内容
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on')
				.css('user-select', 'none')
				.on('selectstart', false);
	};
})(jQuery);

$(document).ready(function() {

	// 初始化
	var count = 0;

	var id;

	$('body').disableSelection();

	// 点击执行
	$('body').on('click', function(e) {

		if (count == 0) {

			$('#container').append("<img src='img/throbber_1.gif' class='throbber' id='" + id + "' />");

			$('#' + id).css({'margin-top': '50px'});

			count++;

			showText("That's odd. Try clicking somewhere else.");

		} else if (count == 1) {

			makeThrobbers(e);

			showText("So weird! Maybe try the other side?");

		} else if (count == 2) {

			makeThrobbers(e);

			showText("Welp. I got nothing else for you. You're on your own now.");

			setTimeout(function() {

				$('p').fadeOut('2000');
			}, 4000);

		} else {

			makeThrobbers(e);
		};
	});

	// text 文字显示
	function showText(txt) {

		setTimeout(function() {

			$('p').fadeOut('500');

			setTimeout(function() {

				$('p').text(txt).fadeIn('500');
			}, 500);
		}, 500);
	};

	// 显示缓冲图片
	function makeThrobbers(e) {

		var rand = Math.floor(Math.random() * 14);

		id = "t" + count;

		var throbber = "throbber_" + rand + ".gif";

		if (rand == 5) {

			throbber = "throbber_" + rand + ".png";
		};

		$('body').append("<img src='img/" + throbber + "' class='throbber' id=" + id + " />")

		if (rand == 5) {

			$('#' + id).addClass('spin');
		};

		$('#' + id).css({'position': 'absolute', 'top': e.pageY, 'left': e.pageX});

		count++;
	};
});