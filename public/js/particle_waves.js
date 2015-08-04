$(document).ready(function() {

	// underscore.js 函数调用 
	// _.range() 数组
	// _.each() 遍历
	var numberOfCards = _.range(1000);

	// 遍历添加所有 card 并添加点击事件
	_.each(numberOfCards, function(position) {

		$('<div>', {id: 'card' + position, class: 'card'}).on('click', function(event) {

			$(this).off('click');

			cascade(event, position);

		}).appendTo('#container');
	})

	$('#container').append("<br class='clear' />")

	// 执行
	function cascade(event, position) {

		var pos = position;

		flip(pos);

		setTimeout(function() {

			$('#card' + (pos - 1)).trigger('click');

			$('#card' + (pos + 1)).trigger('click');

			$('#card' + (pos - 40)).trigger('click');

			$('#card' + (pos + 40)).trigger('click');
		}, 50)

		setTimeout(function() {

			$('#card' + pos).on('click', function() {

				$(this).off('click');

				cascade(event, pos);
			})
		}, 800)
	}

	// 画面效果
	function flip(id) {

		var card = '#card' + id;

		$(card).addClass('wave');

		setTimeout(function() {

			$(card).removeClass('wave');
		}, 400)
	}
})


/**
 * 需要注意的是，一个粒子在触发点击事件 800ms 之后才能再次被点击，所以 cascade() 函数内的 card trigger click 事件如果重复到已点击的粒子上是不会再次触发事件的。
 */

/**
 * _.range([start], stop, [step])
 *
 * _.range(10);
 * =>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 */