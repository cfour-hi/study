; (function () {
  const database = [];
  const trPeriodList = Array.from(document.getElementById('cpdata').querySelectorAll('tr[data-period]'));

  trPeriodList.forEach(tr => {
    database.push({
      period: tr.dataset.period,
      red: getPeriodRedBall(tr)
    });
  });

  consoel.log(JSON.stringify(database));

  function getPeriodRedBall (tr) {
    const ballList = Array.from(tr.querySelectorAll('.ball_red'))
      .concat(Array.from(tr.querySelectorAll('.ball_brown')));

    return ballList.map(ball => parseInt(ball.innerHTML));
  }
}());
