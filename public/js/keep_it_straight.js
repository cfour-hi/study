$(document).ready(function() {

	$('.start').on('mouseenter', function() {

		// 初始化
		var win = false;

		var failPhrases = ["That's lame.",
					 	   "Ouch, too bad.",
					 	   "I am sure you're good at something.",
					 	   "That wasn't too pretty.",
					 	   "Well, at least you tried.",
					 	   "Maybe cursors just aren't your thing.",
					 	   "I've seen worse failures.",
					 	   "Well that sucked.",
					 	   "Are you using your foot?"];

		// 游戏进行判断
		$('.game_container').on('mouseleave', function() {

			if (win == false) {

				var phrase = failPhrases[Math.floor(Math.random() * 9)];

				$('#model').html("<h1>FAIL!</h1><h2>" + phrase + "</h2><a href='javascript:void(0)' class='button' id='try_again'>Try Again?</a><a href='keep_it_straight.html' class='button'>Start Over</a>").show();

				// 页面重载
				$('#try_again').on('click', function(e) {

					e.preventDefault();

					location.reload();
				});
			};
		});

		// 游戏闯关成功
		$('.end').on('mouseenter', function() {

				$('#model').show();

				win = true;
		});
	});
});


/**
 * 鼠标放入红色半圆区域开始闯关，不移出白色区域前提下达到蓝色区域闯关成功
 *
 * 获取鼠标所处位置状态，在不同位置进行相对应操作
 *
 * 定义变量 win 判断闯关是否成功，防止闯关成功后鼠标移出相关区域会又去执行闯关失败相对应函数
 */