$(document).ready(function() {

	makeShapes(); //制作图形

	$('.block').draggable({

		containment: 'window',

		stack: '.block',

		snap: true,

		snapMode: 'outer',

		snapToerance: 13,
	});

	// canvas 内容淡出
	$('.block').on('mouseenter', function() {

		$('#instruction').fadeOut('slow');
	});

	// 制作图形函数
	function makeShapes() {

		var shapes = ['square', 'rectup', 'rectup long', 'rectdown', 'triup', 'trileft', 'triright', 'paraleft', 'pararight', 'circle', 'semitop', 'quartleft', 'quartright'];

		for (var i = 0; i < 13; i++) {

			var shape = shapes[i];

			makeShape(shape);
		};
	};

	// 重复制造多个相同图形
	function makeShape(shape) {

		for (var i = 0; i < 8; i++) {

			$('#toybox').append('<div class="block ' + shape + '"></div>')
		};
	};
});


/**
 * 加载页面 13 个图形，每个图形重复包含 8 个
 *
 * draggable 函数属于 jQuery UI 类别，作用是使 DOM 元素可进行拖放动作。
 *
 * 		可自定义拖放位置： containment
 * 		可自定义拖放状态： stack
 * 		是否自动吸附： snap
 * 		吸附位置： snapMode
 * 		snapToerance ???
 */