// 禁止选中插件
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
	};
})(jQuery);

$(document).ready(function() {

	// 初始化
	var canvas = document.getElementById('canvas'),

	ctx = canvas.getContext('2d'),

	h = window.innerHeight - 120,
	w = window.innerWidth - 40;

	canvas.height = h;
	canvas.width = w;

	// Object pen
	(function (pen, $, undefined) {

		// 公共属性
		pen.x = 390;
		pen.y = 265;
		pen.size = 10;
		pen.color = '#000';

		marks = [];

		// 公共方法
		pen.move = function() {

			penTipMove();
		};

		pen.draw = function() {

			drawMarks();
		};

		// 私有方法
		function penTipMove() {

			ctx.clearRect(0, 0, w, h);

			// 重绘之前 canvas 上的画笔 Mark
			_.each(marks, function(m) {

				ctx.fillStyle = m.color;

				ctx.fillRect(m.x, m.y, m.size, m.size);
			});

			if (pen.color == '#fff') {

				ctx.beginPath();
				ctx.rect(pen.x, pen.y, pen.size, pen.size);
				ctx.fillStyle = pen.color;
				ctx.fill();

				/*ctx.lineWidth = 1;
				ctx.strokeStyle = '#000';
				ctx.stroke();*/
			} else {

				ctx.fillStyle = pen.color;
				ctx.fillRect(pen.x, pen.y, pen.size, pen.size);
			};
		};

		function Mark() {

			this.x = pen.x;
			this.y = pen.y;
			this.size = pen.size;
			this.color = pen.color;
		};

		function drawMarks() {

			penTipMove();

			marks.push(new Mark());
		};
	} (window.pen = window.pen || {}, jQuery));

	$('canvas').disableSelection();

	// 执行
	$('#canvas').on('mousemove', function(e) {

		getPenPosition(e);

		pen.move();
	});

	$('#canvas').on('mousedown', function(e) {

		getPenPosition(e);

		pen.draw();

		$('#canvas').on('mousemove', function(e) {

			getPenPosition(e);

			pen.draw();
		});

		$('#canvas').on('mouseup', function(e) {

			$('#canvas').off('mousemove', pen.draw());

			$('#canvas').on('mousemove', function(e) {

				getPenPosition(e);

				pen.move();
			});
		});
	});

	// 改变画笔颜色
	$('.color').on('change', function() {

		var newColor = $('.color').val();

		pen.color = '#' + newColor.toLowerCase();
	});

	// 改变画笔尺寸大小
	$('.size').on('change', function() {

		var size = $('.size').val();

		if (!($.isNumeric(size))) {

			alert('Size must be a number!');
		} else {

			pen.size = size;
		};
	});

	// 橡皮擦
	$('.eraser').on('click', function() {

		pen.color = '#fff';
	});

	// 格式化 canvas
	$('.erase_all').on('click', function() {

		if (confirm('Are you sure you want to erase everything?')) {

			ctx.clearRect(0, 0, w, h);

			marks = [];
		} else {

			return;
		};
	});

	// 获取画笔坐标
	function getPenPosition(e) {

		pen.x = e.pageX - canvas.offsetLeft;
		pen.y = e.pageY - canvas.offsetTop;
	};
});