/* config */
require.config({
  baseUrl: 'src',
  paths: {
    'util': 'shared/util',
    'Gobang': 'ctrl/gobang',
    'Player': 'ctrl/player',
    'AIPlayer': 'ctrl/ai-player',
    'Chessboard': 'model/chessboard',
    'CanvasGobang': 'view/canvas',
    'DOMGobang': 'view/dom'
  }
});

/* bootstrap */
require([
  'Gobang'
], function (Gobang) {

  var ACTIVE = 'active';
  var gobang;

  var whitePiece = new Image();
  var blackPiece = new Image();
  whitePiece.src = 'assets/white-piece.png';
  blackPiece.src = 'assets/black-piece.png';

  // 开始游戏
  Array.prototype.forEach.call(document.querySelectorAll('.start-game'), function (el) {
    el.addEventListener('click', function () {
      var type = this.dataset.type;
      var gameWrap = document.querySelector('.game-wrap');
      var el;

      if (type === 'canvas') {
        el = document.createElement('canvas');
      } else if (type === 'dom') {
        el = document.createElement('div');
      } else {
        console.error('开始游戏时 type 值错误！');
      }

      el.className = 'gobang';
      if (gameWrap.firstElementChild) {
        gameWrap.firstElementChild.remove();
      }
      gameWrap.appendChild(el);

      gobang = new Gobang({
        el: el,
        type: type,
        range: 15,
        distance: 40,
        whitePiece: whitePiece,
        blackPiece: blackPiece,
        winLen: 5,
        // withAI: true,
        onStep: stepPiece,
        onGameover: gameover,
        onBackspace: backspace,
        onCancelBackspace: cancelBackspace
      });

      this.closest('.dialog-modal').classList.remove(ACTIVE);
    }, false);
  });

  // 悔棋
  document.querySelector('.backspace').addEventListener('click', function () {
    gobang.backspace();
  }, false);

  // 撤销悔棋
  document.querySelector('.cancel-backspace').addEventListener('click', function () {
    gobang.cancelBackspace();
  }, false);

  var nextPiece = document.querySelector('.next-piece');
  // 每下一步棋会被触发的 hook 函数
  function stepPiece(player) {
    if (player.index === 0) {
      nextPiece.classList.remove('black-piece');
      nextPiece.classList.add('white-piece');
    } else if (player.index === 1) {
      nextPiece.classList.remove('white-piece');
      nextPiece.classList.add('black-piece');
    } else {
      console.error('玩家 index 值出错！');
    }
  }

  var gameoverDialog = document.querySelector('.dialog-modal__gameover');
  // 游戏结束回调
  function gameover(result) {
    var gameover = gameoverDialog.querySelector('.game-over');

    if (typeof result === 'string' && result === 'tie') {
      gameover.textContent = '和局';
    } else if (typeof result === 'object' && result.name) {
      gameover.textContent = result.name + '赢';
    } else {
      console.error('游戏胜负结果错误！');
    }

    gameoverDialog.classList.add(ACTIVE);
  }

  // 悔棋回调
  function backspace(player) {
    stepPiece(player);
  }

  // 撤销悔棋回调
  function cancelBackspace(player) {
    stepPiece(player);
  }

});
