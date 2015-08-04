// 禁止鼠标框选内容
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on')
				.css('user-select', 'none')
				.on('selectstart', false);
	};
})(jQuery);

$(document).ready(function() {

	// box 点击
	$('.box_shadow').on('click', function() {

		var current = $(this).css('box-shadow');

		var ary = current.split('px');

		var blur = ary[ary.length - 3];
		var spread = ary[ary.length - 2];

		var newBlur = parseInt(blur) + 1;
		var newSpread = parseInt(spread) + 3;

		$(this).css('box-shadow', '0 0 ' + newBlur + 'px ' + newSpread + 'px rgba(0, 0, 0, 0.5)' );
	});

	// text 点击
	$('.text_shadow').on('click', function(event) {

		var current = $(this).css('text-shadow');

		var ary = current.split('px');

		var blur = ary[ary.length - 2];
		var vert = ary[ary.length - 3];

		var newBlur = parseInt(blur) + 1;
		var newVert = parseInt(vert) + 1;

		event.stopPropagation(); 
		//使用stopPropagation()函数可以阻止当前事件向祖辈元素的冒泡传递，也就是说该事件不会触发执行当前元素的任何祖辈元素的任何事件处理函数。

		$(this).css('text-shadow', '0 ' + newVert + 'px ' + newBlur + 'px black');
	});

	$('body').disableSelection();
});


/**
 * body 元素不能被选中
 *
 * box_shadow 元素被点击，则此对应元素 css 样式 box-shadow 模糊距离和阴影尺寸递增
 *
 * text_shadow 元素被点击效果与 box_shadow 元素一样
 */