$(document).ready(function() {

	// 执行函数
	getTime();

	// 获取时间并把时间转换为 color。
	function getTime() {

		var today = new Date();

		var hour = today.getHours();
		var minute = today.getMinutes();
		var second = today.getSeconds();

		// 转换 color
		var color = timeColor(hour, minute, second);

		hour = formatTime(hour);
		minute = formatTime(minute);
		second = formatTime(second);

		$('#time').text(hour + ':' + minute + ':' + second);

		$('#bg_color').text(color);

		$('body').css('backgroundColor', '#' + color);

		// 刷新
		setTimeout(function() {

			getTime();
		}, 500);
	};

	function formatTime(time) {

		if (time < 10) {

			time = '0' + time;
		};

		return time;
	};

	function formatColor(color) {

		if (color.length < 2) {

			color = '0' + color;
		};

		return color;
	};

	// 时间转换为 color
	function timeColor(hour, minute, second) {

		var red = Math.round(255 * (hour / 23)).toString(16);

		var green = Math.round(255 * (minute / 59)).toString(16);

		var blue = Math.round(255 * (second / 59)).toString(16);

		red = formatColor(red);
		green = formatColor(green);
		blue = formatColor(blue);

		return (red + green + blue).toUpperCase();
	};
});


/**
 * 获取当前时间并转换为 小时：分钟：秒钟 样式
 *
 * 根据算法把小时、分钟、秒钟转换为相对应的 16 进制 RGB 颜色数值
 *
 * 把对用元素和效果加载至页面
 */