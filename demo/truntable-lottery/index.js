; (function ($) {
  var lottering = false;
  var angle;

  $('.start').click(function () {
    if (!lottering) {
      lottering = true;
      angle = Math.ceil(Math.random() * 26) + 9;

      // 模拟调用后端接口
      getLotteryResult();
      // 让转盘转一会
      loadRotate();
    }
  });

  var lotteryResult, hasRotate = false;
  function getLotteryResult () {
    if (!hasRotate) {
      // 模拟接口所消耗时间
      var interfaceCallTime = ((Math.random() * 3).toFixed(3)) * 1000;

      hasRotate = true;

      setTimeout(function () {
        lotteryResult = Math.ceil(Math.random() * 8);
        $('ol').append('<li>抽到奖品 ' + lotteryResult + '</li>');

        angle += lotteryResult * -45;
      }, interfaceCallTime);
    }
  }

  // 让转盘转一会
  function loadRotate () {
    $('ul').rotate({
      angle: 0,
      duration: 1000,
      animateTo: 1080,
      easing: function (x, t, b, c, d) {
        // 匀速转动
        return c * (t / d) + b;
      },
      callback: function () {
        if (lotteryResult) {
          lotteryRotate();
        } else {
          loadRotate();
        }
      }
    });
  }

  // 显示大转盘抽奖结果
  function lotteryRotate () {
    $('ul').rotate({
      angle: 0,
      duration: 4000,
      animateTo: 1080 + angle,
      easing: function (x, t, b, c, d) {
        // 先快后慢 (默认)
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      callback: function () {
        hasRotate = false;
        lottering = false;
        lotteryResult = null;
      }
    });
  }
})(jQuery);
