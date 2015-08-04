// DOM 禁止鼠标拖动选中内容
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on')
				.css('user-select', 'none')
				.on('selectstart', false);
	}

})(jQuery);

$(document).ready(function() {

	var phrases = ["Nice job!",
					"Excellent clickin'!",
					"That was Awesome!",
					"Man are you good!",
					"Boom!",
					"You're a pro!",
					"Unbelievable!",
					"Insanity!",
					"You're on fire!",
					"That was crazy!",
					"You are blowin' my mind!"];

	var level = 0;

	$('#ball').on('click', function() {

		if (level < 11) {

			flashMessage();

		} else {

			$('#phrase').text('少年，手速这么快！平时没少撸吧！');

			$('#next_level').hide();

			$('#again').show();

			$('#ball').hide();

			$('#congratulation').show();
		};
	});

	function flashMessage() {

		level++;

		$('#ball').hide();

		$('#phrase').text(phrases[level - 1]);

		$('span').text(level + 1);

		$('#congratulation').show();

		speedUp();

		setTimeout(function() {

			$('#congratulation').hide();

			$('#ball').show();

		}, 3000);
	};

	function speedUp() {

		var time = $('.bouncing').css('animation-duration');

		var speed = time.split('s');

		var newSpeed = speed[0] - 1;

		$('.bouncing').css('animation-duration', newSpeed + 's');
	}

	$('#container_right').disableSelection();
	
	$('#congratulation').disableSelection();
});




/**
 * 设计流程
 *
 * 球体被点击触发事件：
 * 
 * 		球体被隐藏，祝贺短语出现
 *
 * 			祝贺短语数组 phrases[],等级级别计算
 *
 * 				等级小于 12 级
 *
 * 					过关游戏继续，等级提升 1 级
 *
 * 				等级达到 12 级
 *
 * 					过关则出现终极贺语，再来一次链接出现
 *
 * 			时间断点 setTimeout()
 *
 * 				祝贺短语隐藏和球体再次出现时间 3000ms
 *
 * Over..
 */


/**
 * 获取游戏等级
 *
 * 根据等级进行判断
 *
 * 小于 12 级执行 flashMessage() 函数（等级递增）
 * 
 * 大于 12 级执行最终显示结果
 */