$(document).ready(function() {

	$('.boxes').on('mouseover', function() {

		var color = randomColor();

		$(this).css({backgroundColor: color, boxShadow: '0 0 10px white', zIndex: '2'});
	});

	$('.boxes').on('mouseout', function() {
		$(this).css({boxShadow: 'none', zIndex: '1'});
	});

	function randomColor() {
		return '#' + Math.random().toString(16).substr(2, 6);
	}
});


/**
 * 当鼠标移动到 boxes 类元素上将添加随机的背景颜色和 box-shadow 以及 z-index 值最高
 */