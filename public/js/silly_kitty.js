$(document).ready(function() {

	$('.food').draggable({});

	$('.head').droppable({

		drop: function(event, ui) {

			eatAnimation();

			$('.pupil').animate({top: '15', left: '15', height: '30px', width: '30px'});
		},

		over: function(event, ui) {

			$('.pupil').animate({top: '3', left: '3', height: '54px', width: '54px'});
		}
	})

	setTimeout(function() {

		$('#fish_text').fadeOut('slow');
	}, 2000)

	$('.head').on('click', function() {

		$('#text_bubble p').text('Purr...');

		$('#text_bubble').show();

		$('#cat_container').addClass('purr');

		setTimeout(function() {

			$('#cat_container').removeClass('purr');

			$('#text_bubble').fadeOut('600');
		}, 3000)
	})

	$('.paw').on('click', function() {

		var paw = this;

		$('#text_bubble').fadeOut('600');

		$(paw).addClass('paw_lick');

		$('.mouth').animate({height: '10', width: '20', backgroundColor: '#ab0014', left: '90px'});

		setTimeout(function() {

			$(paw).removeClass('paw_lick');

			$('.mouth').animate({height: '3', width: '12', backgroundColor: '#202123', left: '94px'});
		}, 1500)
	})

	$('.ear').on('click', function() {

		$('#text_bubble p').text('Meow!');

		$('#text_bubble').show();

		setTimeout(function() {

			$('#text_bubble').fadeOut('600');
		}, 3000)
	})

	function eatAnimation() {

		$('#nose_container').addClass('eat_nose');

		$('.eye').addClass('eat_eyes');

		$('.mouth').addClass('eat_mouth');

		$('.food').fadeOut('500');

		$('#text_bubble p').text("GULP!");

		$('#text_bubble').show();

		setTimeout(function() {

			$('#nose_container').removeClass('eat_nose');

			$('.eye').removeClass('eat_eyes');

			$('.mouth').removeClass('eat_mouth');

			$('#text_bubble').fadeOut('600');

			replaceFood();
		}, 1000)
	}

	function replaceFood() {

		$('.food').css({'top': 0, 'left': 0});

		$('.food').show();
	}
})