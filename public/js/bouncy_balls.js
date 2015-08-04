// DOM 禁止鼠标拖动选中内容
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on')
					.css('user-select', 'none')
					.on('selectstart', false);
	};
})(jQuery);

$(document).ready(function() {

	// 初始化
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');

	var balls = [];

	var w = window.innerWidth,
		h = window.innerHeight - 24;

	var colorToggle = 'solid';

	canvas.width = w;
	canvas.height = h;

	$('body').disableSelection();

	start(); //球移动

	// 制造球
	$('#canvas').on('click', function(e) {

		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;

		makeBall(x, y);	
		makeBall(x, y);
	});

	// 单色
	$('#solid').on('click', function(e) {

		e.stopPropagation();

		colorToggle = 'solid';
	});

	// 闪烁
	$('#blink').on('click', function(e) {

		e.stopPropagation();

		colorToggle = 'blink';
	});

	/*$('canvas').on('mousemove', function(e) {

		mouse.x = e.pageX - canvas.offsetLeft;
		mouse.y = e.pageY - canvas.offsetTop;
	})*/

	// Object 球
	function Ball(x, y, x2, y2) {

		this.x = x;
		this.y = y;
		this.x2 = x2;
		this.y2 = y2;

		this.move = function() {

			if (this.x > w - 10) {

				this.x = w - 10;
				this.x2 = -this.x2;

			} else if (this.x < 10) {

				this.x = 10;
				this.x2 = -this.x2;
			};

			if (this.y > h - 10) {

				this.y = h - 10;
				this.y2 = -this.y2;

			} else if (this.y < 10) {

				this.y = 10;
				this.y2 = -this.y2;
			};

			this.x += this.x2;
			this.y += this.y2;

			ctx.beginPath();
			ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		};
	};

	// 添加球
	function makeBall(x, y) {

		balls.push(new Ball(x, y, randomInt(2, 10), randomInt(2, 10)));
	};

	// 开始初始化球 object
	function start() {

		setInterval(clock, 30);
	};

	// 初始化球的颜色和移动
	function clock() {

		ctx.clearRect(0, 0, w, h);

		if (colorToggle == 'solid') {

			ctx.fillStyle = '#eee';

		} else {

			ctx.fillStyle = randomColor();
		};

		for (var i = 0; i < balls.length; i++) {

			balls[i].move();
		};
	};

	function randomInt(min, max) {

		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	function randomColor() {

		return '#' + Math.random().toString(16).substr(2, 6);
	};
});