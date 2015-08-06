$(document).ready(function() {

	// 初始化
	var words = getWordsArray();

	var running = true;

	var start;

	// words 随机变动
	startWords();

	// 判断 words 是否在随机变动，执行对应函数。
	$('.button').on('click', function() {

		if (running) {

			stopWords();

		} else {

			startWords();
		};
	});

	// 执行 words 变动
	function startWords() {

		running = true;

		$('.button').removeClass('start').addClass('stop').val('stop');

		start = setInterval(function() {

			$('#word_container').text(words[Math.floor(Math.random() * words.length)]);
		}, 50);
	};

	// 执行 words 停止变动
	function stopWords() {

		running = false;

		$('.button').removeClass('stop').addClass('start').val('start');

		clearInterval(start);
	};

	function getWordsArray() {

		var array;

		$.ajax({

			type: 'GET',

			url: 'http://z1992.github.io/study/public/words.html',

			async: false,

			success: function(data) {

				array = data.split('\n');
			}
		})

		return array;
	}
});