$(document).ready(function() {

	// 初始化
	var circle = 20;

	makeSpots(circle);

	var mouseX = 0, mouseY = 0;

	// PC 端获取鼠标坐标
	$(document).on('mousemove', function(e) {

		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	// 移动端获取触屏点坐标
	document.addEventListener('touchmove', function(e) {

		mouseX = e.pageX;
		mouseY = e.pageY;

	}, false);

	for (var i = 0; i < circle; i++) {

		moveDiv('#spot' + i, randomInt());
	};

	// 初始化 spots
	function makeSpots(num) {

		for (var i = 0; i < circle; i++) {

			var size = randomInt();

			var color = randomColor();

			$('#container').append('<div class="spot" id="spot' + i +'"></div>');

			$('#spot' + i).css({height: size, width: size, backgroundColor: color});
		};
	};

	// spots 跟随鼠标移动和移动速度
	function moveDiv(elm, speed) {

		var xp = 0, yp = 0;

		setInterval(function () {

			xp += (mouseX - xp) / speed;
			yp += (mouseY - yp) / speed;

			$(elm).css({left: xp, top: yp})
		}, 30);
	};

	function randomInt() {

		return Math.floor(Math.random() * 50 + 5);
	};

	function randomColor() {

		return '#' + Math.random().toString(16).substr(2, 6);
	};
});


/**
 * 加载页面 20 个 circle 元素，随机定义其大小和颜色
 *
 * 获取鼠标在页面停留位置的坐标 e.pageX e.pageY
 *
 * 根据算法设置每个 circle 与鼠标的距离和设置更新时间 30ms
 */