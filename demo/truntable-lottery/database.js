; (function () {
  const database = [];
  const trPeriodList = Array.from(document.getElementById('cpdata').querySelectorAll('tr[data-period]'));

  trPeriodList.forEach(tr => {
    database.push(JSON.stringify({
      period: tr.dataset.period,
      red: getPeriodRedBall(tr)
    }));
  });

  downloadDatebase();

  function downloadDatebase() {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([`[${database.join(',')}]`]));
    a.download = 'redball-database.json';
    a.click();
  }

  function getPeriodRedBall (tr) {
    const ballList = Array.from(tr.querySelectorAll('.ball_red'))
      .concat(Array.from(tr.querySelectorAll('.ball_brown')));

    return ballList.map(ball => parseInt(ball.innerHTML));
  }
}());
