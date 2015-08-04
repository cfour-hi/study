$(document).ready(function() {

	var advice = ["That's terrible! You should knock that off!",
				  "Seriously? Why don't you grow the hell up?!",
				  "Aren't you a little old for that crap?",
				  "You are bad and you should feel bad!",
				  "Gross. You are gross.",
				  "Are you going to suck all your life?",
				  "What? Who does that?!",
				  "I thought you were better than that.",
				  "My disapproval is overwhelming.",
				  "Are you freaking kidding me?",
				  "NO! Bad!",
				  "And when do you plan on becoming an adult?",
				  "That is totally unacceptable.",
				  "You should be utterly ashamed.",
				  "Ugh! That's horrible!",
				  "A kitten dies everytime you do that.",
				  "I can't believe you are that disgusting."]

	$('#habit').focus();

	$('form').on('submit', function(event) {
		event.preventDefault();

		var habit = $('#habit').val();

		if (habit == "") {
			habit = "don't fill in forms"
		}

		habit = changePronouns(habit);

		$('#question').text(habit + "?");
		$('#answer').text(advice[Math.floor(Math.random() * 17)]);

		setTimeout(function() {
			$('#habit').val("").focus();
		}, 1000)
	})

	function changePronouns(phrase) {
		var startWithI = phrase.substr(0, 2).toUpperCase();
		var startWithMy = phrase.substr(0, 3).toUpperCase();
		var newPhrase;

		if (startWithI == "I ") {
			newPhrase = phrase.replace("I ", "You ");
		}
		else if (startWithMy == "MY ") {
			newPhrase = phrase.replace("My ", "Your ");
		}
		else {
			newPhrase = "You " + phrase;
		}

		newPhrase = newPhrase.replace(" I ", " you ");
		newPhrase = newPhrase.replace(" my ", " your ");
		newPhrase = newPhrase.replace(" me ", " you ");

		return newPhrase;
	}
})


/**
 * 获取 habit 值并判断如果为空则输出特定内容
 *
 * 如果不为空则判断 habit 值中的敏感词汇，包括开头 I My 和句中 I my me，定义新内容
 *
 * 对内容进行对应的输出
 */