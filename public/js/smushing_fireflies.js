$(document).ready(function() {

	$('body').on('click', function(e) {

		var rand = randomInt(0, 20);
		var color = randomColor();
		$('#container').append("<div class='drop box" + rand + "'></div>");
		$('.box' + rand).css({top: e.pageY, left: e.pageX, backgroundColor: color});
	})

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function randomColor() {
		return '#' + Math.random().toString(16).substr(2, 6);
	}
})


/**
 * body 内任意坐标位置点击在此左边添加随机 box 元素
 */