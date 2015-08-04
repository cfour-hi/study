$(document).ready(function() {

	// 初始化
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sup", "Oct", "Nov", "Dec"];

	// 判断是否填写生日信息
	$('form').on('submit', function(event) {

		event.preventDefault();

		if ($('#bday').val() == 0) {

			$('.party').text("No Birthday? No Partys for You!")

		} else {

			birthdaySplit();
		};
	});

	// 解析生日日期和时间
	function birthdaySplit() {

		var birthday = $('#bday').val();

		if (birthday.indexOf('/') >= 0) {

			birthday = birthday.split('/');	// [month, day, year]

			var year = birthday[2];
			var month = birthday[0] - 1;
			var day = birthday[1];

		} else {

			birthday = birthday.split('-');	// [year, month, day]

			var year = birthday[0];
			var month = birthday[1] - 1;
			var day = birthday[2];
		};

		var birthtime = $('#time').val().split(':');

		var hour = birthtime[0];
		var minute = birthtime[1];

		countData(year, month, day, hour, minute);
	};

	// 计算相关日期
	function countData(year, month, day, hour, minute) {

		var today = new Date();

		var age = today.getFullYear() - year;

		var bmonth = months[month];

		var todayStr = today.toDateString();

		var bday = new Date(year, month, day); // 设置日期

		var btime = new Date(year, month, day, hour, minute);

		if (today.getMonth() < month || today.getMonth() == month && today.getDay() < day) {

			age--;
		};
		
		var ageInDays = Math.floor((today - bday) / (1000 * 60 * 60 * 24)); // 两日期相减，得到的是两日期之间的毫秒数值

		var ageInMins = Math.floor((today - btime) / (1000 * 60));	// 如果时间为空，则值为 NaN

		var tenKDay = new Date(bday.getTime() + 86400000 * 10000);

		var twentyKDay = new Date(bday.getTime() + 86400000 * 20000);

		var fiveHundKHour = new Date(bday.getTime() + 3600000 * 500000);

		var millionMin = new Date(bday.getTime() + 60000 * 1000000);

		var tenMillionMin = new Date(bday.getTime() + 60000 * 10000000);

		var fiftyMillionMin = new Date(bday.getTime() + 60000 * 50000000);

		var onBillionSec = new Date(bday.getTime() + 1000 * 1000000000);

		if (today.getMonth() == bday.getMonth() && today.getDate() == bday.getDate()) {

			$('.party').text("Today's your birthday?! PARTY TIME!");

		} else if (todayStr == ( tenKDay.toDateString() || twentyKDay.toDateString() || fiveHundKHour.toDateString() || millionMin.toDateString() || tenMillionMin.toDateString() || fiftyMillionMin.toDateString() || onBillionSec.toDateString())) {

			$('.party').text("Looks Like We've Got a Party Here!");

		} else {

			$('.party').text("Boo! No Parties Today.");
		};

		$('.bdays.date').text("Your birthday is " + bmonth + " " + day);

		if ( age == 1 ) {

			$('.bdays.age.years').text("You're " + age + " year old");

		} else {

			$('.bdays.age.years').text("You're " + age + " years old");
		};

		if (ageInDays == 1) {

			$('.bdays.age.days').text("You're " + ageInDays + " day old");

		} else {

			$('.bdays.age.days').text("You're " + ageInDays + " days old");
		};

		if ( ageInMins == 1 ) {

			$('.bdays.age.mins').text("You're " + ageInMins + " minute old");

		} else {

			$('.bdays.age.mins').text("You're " + ageInMins + " minutes old");
		};

		if (today <= tenKDay) {

			$('.bdays.10k').text("Your 10,000th day is " + tenKDay.toDateString());

		} else {

			$('.bdays.10k').text("Your 10,000th day was " + tenKDay.toDateString());
		};

		if (today <= twentyKDay) {

			$('.bdays.20k').text("Your 20,000th day is " + twentyKDay.toDateString());

		} else {

			$('.bdays.20k').text("Your 20,000th day was " + twentyKDay.toDateString());
		};

		if (today <= fiveHundKHour) {

			$('.bdays.500k').text("Your 500,000th hour is " + fiveHundKHour.toDateString());

		} else {

			$('.bdays.500k').text("Your 500,000th hour was " + fiveHundKHour.toDateString());
		};

		if (today <= millionMin) {

			$('.bdays.1mil').text("Your one millionth minute is " + millionMin.toDateString());

		} else {

			$('.bdays.1mil').text("Your one millionth minute was " + millionMin.toDateString());
		};

		if (today <= tenMillionMin) {

			$('.bdays.10mil').text("Your ten millionth minute is " + tenMillionMin.toDateString());

		} else {

			$('.bdays.10mil').text("Your ten millionth minute was " + tenMillionMin.toDateString());
		};

		if (today <= fiftyMillionMin) {

			$('.bdays.50mil').text("Your fifty millionth minute is " + fiftyMillionMin.toDateString());

		} else {

			$('.bdays.50mil').text("Your fifty millionth minute was " + fiftyMillionMin.toDateString());
		};

		if (today <= onBillionSec) {

			$('.bdays.1bil').text("Your one billionth second is " + onBillionSec.toDateString());

		} else {

			$('.bdays.1bil').text("Your one billionth second was " + onBillionSec.toDateString());
		};
	};
});



/**
 * 此内容主要掌握 Date 对象方法
 *
 * 通过表单获取生日时间信息并进行解析年、月、日、小时和分钟
 *
 * 通过 Date 对象各种方法和以上生日时间信息进行计算
 *
 * 可得出对应年龄、生活天数、生活分钟数、第10K天日期、20K天日期、500K分钟日期、1M分钟日期、10M分钟日期、50M分钟日期、1B秒钟日期
 */