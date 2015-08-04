$(document).ready(function() {

	var animations = ["rotate", "zoom", "jump", "tease", "shake"];

	$('.sushi_box').on('click', function(event) {

		event.stopPropagation();// 使父元素不能够被点击

		var anima = randomInt();
		var animation = animations[anima];
		var amt = this;

		$(amt).addClass(animation);

		setTimeout(function() {
			$(amt).removeClass(animation);
		}, 2000);
	});

	function randomInt() {
		return Math.floor(Math.random() * 5);
	}
});




/**
 * 设计流程
 *
 * 图片被点击触发事件
 *
 * 		随机分配动画效果，时间 2000ms
 *
 * 			设置事件断点 2000ms，移除动画效果
 */


/**
 * sushi_box 元素被点击后添加随机动画效果并设置 timeout 时间 2000ms 移除动画效果
 */