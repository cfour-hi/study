$(document).ready(function() {

	// 初始化
	var animations = ['crawl', 'dangle', 'stretch', 'flip', 'jump'];

	var boxNum = $("#wrap div").length;

	// 初始化每个 box 颜色
	for (var i = 0; i < boxNum; i++) {

		$('#wrap div:eq(' + i + ')').css('background-color', randomColor);
	};

	// box 点击执行
	$('.box').on('click', function() {

		var animate = animations[Math.floor(Math.random() * 5)];

		var box = this;

		// 这里不能直接用 this，需要把 this 赋值给变量
		$(box).addClass(animate);

		// 刷新，移除动画效果。
		setTimeout(function() {

			$(box).removeClass(animate);
		}, 4000);
	});

	function randomColor() {

		return '#' + Math.random().toString(16).substr(2, 6);
	};
});


/**
 * 前端页面加载随机分配 box 颜色
 *
 * 任意 box 被点击随机获取动画效果 (所有动画效果时长均为 4s)
 *
 * 设置 timeout 时间 4000ms
 */