; (function () {
  const THRESHOLD = 33;
  const RED_BALL_NUM = 33;

  // --------------------------------------------------------------------------- //
  // +++++++++++++++++++++++++++++++++ 测试中奖 +++++++++++++++++++++++++++++++++ //
  // --------------------------------------------------------------------------- //

  ; (function () {
    const trPeriodList = Array.from(document.getElementById('cpdata').querySelectorAll('tr[data-period]'));

    for (let i = 1; i < 3; i++) {
      const recommendResult = getRecommendResult(trPeriodList.slice(0, -i));
      const lastPeriod = (i === 1 ? trPeriodList.slice(-i) : trPeriodList.slice(-i, -i + 1))[0];
      const lotteryResult = getPeriodRedBall(lastPeriod).sort((a, b) => a - b);

      console.log(`${lastPeriod.dataset.period}:`);
      console.log(`推荐号码：${recommendResult.join()}`);
      console.log(`开奖号码：${lotteryResult.join()}`);

      let redBallWinNum = 0;
      const redBallWinNumList = [];

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
    const recommendList = [];
    const round = trPeriodList.length / THRESHOLD;

    for (let i = 1; i <= round; i++) {
      recommendList.push(getStageRecommendResult(trPeriodList.slice(-(i * THRESHOLD))));
    }

    const recommendRedBalls = {};

    recommendList.forEach(stageRecommendList => {
      stageRecommendList.forEach(num => {
        recommendRedBalls[num] ? recommendRedBalls[num] += 1 : recommendRedBalls[num] = 1;
      });
    });

    let recommendRedBallList = Object.keys(recommendRedBalls);

    recommendRedBallList.sort((a, b) => recommendRedBalls[b] - recommendRedBalls[a]);
    recommendRedBallList = recommendRedBallList.slice(0, 9);

    return recommendRedBallList.map(ball => parseInt(ball));
  }

  function getStageRecommendResult (trPeriodList) {
    let redBallNumList = []

    trPeriodList.forEach(tr => {
      redBallNumList = redBallNumList.concat(getPeriodRedBall(tr));
    });

    const stat = getStatResult(redBallNumList);

    return Object.keys(stat).sort((a, b) => stat[a] - stat[b]).slice(13, 22).map(num => parseInt(num));
  }

  function getStatResult (redBallNumList) {
    const stat = getInitRedBallStat();

    redBallNumList.forEach(num => {
      stat[num] += 1;
    });

    return stat;
  }

  function getInitRedBallStat () {
    const stat = {};

    for (let i = 1; i <= RED_BALL_NUM; i++) {
      stat[i] = 0;
    }

    return stat;
  }

  function getPeriodRedBall (tr) {
    const ballList = Array.from(tr.querySelectorAll('.ball_red')).concat(Array.from(tr.querySelectorAll('.ball_brown')));
    return ballList.map(ball => parseInt(ball.innerHTML));
  }

}());
