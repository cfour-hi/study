// 禁止鼠标框选内容
(function($) {

	$.fn.disableSelection = function() {

		return this.attr('unselectable', 'on')
					.css('user-select', 'none')
					.on('selectstart', false);
	};
})(jQuery);

$(document).ready(function() {

	// 初始化
	var state = 'on';

	var mouse;

	$('body').disableSelection();

	$('#bulb_' + state).hide();

	$('#chain_' + state).hide();

	setTimeout(function() {

		$('#message').fadeOut(1500);
	}, 2500);

	// 拖拽事件
	$('#chain_container').draggable({

		containment: "parent",

		start: function(e) {

			mouse = e.pageY;
		},

		stop: function(e) {

			flipSwitch(e);

			animateChain();
		}
	});

	function animateChain() {

		$('#chain_container').animate({top: 0}, 100);
	};

	// 判断是否拖拽到位
	function flipSwitch(e) {

		if (e.pageY >= mouse + 100) {

			$('body').addClass(state);

			$('#bulb_' + state).show();

			$('#chain_' + state).show();

			if (state == 'on') {

				state = 'off';

			} else {

				state = 'on';
			};

			$('body').removeClass(state);

			$('#bulb_' + state).hide();

			$('#chain_' + state).hide();
		};
	};
});