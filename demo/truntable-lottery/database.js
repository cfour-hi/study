/**
 * 从 http://trend.caipiao.163.com/ssq/ 获取每一期的开奖结果
 * 2004001 ~ 现在
 * 下载到本地
 */

(function() {
  const database = [];
  const trPeriodList = Array.from(
    document.getElementById('cpdata').querySelectorAll('tr[data-period]')
  );
  trPeriodList.forEach(tr => {
    database.push(JSON.stringify({ period: tr.dataset.period, red: getPeriodRedBall(tr) }));
  });

  downloadDatebase();

  function downloadDatebase() {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([`[${database.join(',')}]`]));
    a.download = 'redball-stat.js';
    a.click();
  }

  function getPeriodRedBall(tr) {
    const ballList = Array.from(tr.querySelectorAll('.ball_red')).concat(
      Array.from(tr.querySelectorAll('.ball_brown'))
    );

    return ballList.map(ball => parseInt(ball.innerHTML));
  }
})();
