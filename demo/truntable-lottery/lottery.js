; (function () {
  var THRESHOLD = 33;
  var RED_BALL_NUM = 33;

  // --------------------------------------------------------------------------- //
  // +++++++++++++++++++++++++++++++++ 测试中奖 +++++++++++++++++++++++++++++++++ //
  // --------------------------------------------------------------------------- //

  ; (function () {
    var trPeriodList = Array.from(document.getElementById('cpdata').querySelectorAll('tr[data-period]'));

    for (var i = 1; i < 3; i++) {
      var recommendResult = getRecommendResult(trPeriodList.slice(0, -i));
      var lastPeriod = (i === 1 ? trPeriodList.slice(-i) : trPeriodList.slice(-i, -i + 1))[0];
      var lotteryResult = getPeriodRedBall(lastPeriod).sort();

      console.log(`${lastPeriod.dataset.period}:`);
      console.log(`推荐号码：${recommendResult.join()}`);
      console.log(`开奖号码：${lotteryResult.join()}`);

      var redBallWinNum = 0;
      var redBallWinNumList = [];

      lotteryResult.forEach(lotteryNum => {
        if (recommendResult.find(recommendNum => recommendNum === lotteryNum)) {
          redBallWinNum += 1;
          redBallWinNumList.push(lotteryNum);
        }
      }
      );

      console.log(`推荐结果: 命中 ${redBallWinNum} 个红球 => [${redBallWinNumList.join()}]`);
    }
  }());

  // --------------------------------------------------------------------------- //
  // --------------------------------- 测试中奖 --------------------------------- //
  // --------------------------------------------------------------------------- //

  function getRecommendResult (trPeriodList) {
    var recommendList = [];
    var round = trPeriodList.length / THRESHOLD;

    for (var i = 1; i <= round; i++) {
      recommendList.push(getStageRecommendResult(trPeriodList.slice(-(i * THRESHOLD))));
    }

    var recommendRedBalls = {};

    recommendList.forEach(stageRecommendList => {
      stageRecommendList.forEach(num => {
        recommendRedBalls[num] ? recommendRedBalls[num] += 1 : recommendRedBalls[num] = 1;
      });
    });

    var recommendRedBallList = Object.keys(recommendRedBalls);

    recommendRedBallList.sort((a, b) => recommendRedBalls[b] - recommendRedBalls[a]);
    recommendRedBallList = recommendRedBallList.slice(0, 9);

    return recommendRedBallList.map(ball => parseInt(ball));
  }

  function getStageRecommendResult (trPeriodList) {
    var redBallNumList = []

    trPeriodList.forEach(tr => {
      redBallNumList = redBallNumList.concat(getPeriodRedBall(tr));
    });

    var stat = getStatResult(redBallNumList);

    return Object.keys(stat).sort((a, b) => stat[a] - stat[b]).slice(13, 22).map(num => parseInt(num));
  }

  function getStatResult (redBallNumList) {
    var stat = getInitRedBallStat();

    redBallNumList.forEach(num => {
      stat[num] += 1;
    });

    return stat;
  }

  function getInitRedBallStat () {
    var stat = {};

    for (var i = 1; i <= RED_BALL_NUM; i++) {
      stat[i] = 0;
    }

    return stat;
  }

  function getPeriodRedBall (tr) {
    var ballList = Array.from(tr.querySelectorAll('.ball_red')).concat(Array.from(tr.querySelectorAll('.ball_brown')));
    return ballList.map(ball => parseInt(ball.innerHTML));
  }

}());
