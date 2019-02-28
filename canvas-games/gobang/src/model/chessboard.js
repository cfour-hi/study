define([
  'util',
  'Player',
  'AIPlayer',
], function (_, Player, AIPlayer) {

  var Chessboard = function (gobang) {
    this._gobang = gobang;
    this.gameover = false;
    this.playerIndex = 0;
    this.players = [];
    this.steps = [];
    this.backspaces = [];
    this.pieces = new Array(gobang.range);

    this.init();
    this.createPlayer();
  };

  // 初始化 range * range 二维数组
  Chessboard.prototype.init = function () {
    for (var i = this.pieces.length - 1; i >= 0; i--) {
      this.pieces[i] = new Array(this._gobang.range);

      for (var j = this.pieces[i].length - 1; j >= 0; j--) {
        this.pieces[i][j] = {
          x: i,
          y: j,
          player: null,
          score: 0
        }
      }
    }
  };

  // 创建玩家
  Chessboard.prototype.createPlayer = function () {
    var player1 = new Player({
      _gobang: this,
      piece: this._gobang.whitePiece,
      index: 0,
      name: '白棋'
    });

    var p2Args = {
      _gobang: this,
      piece: this._gobang.blackPiece,
      index: 1,
      name: '黑棋'
    }

    var player2 = this._gobang.withAI ? new AIPlayer(p2Args) : new Player(p2Args);

    this.players.push(player1);
    this.players.push(player2);
  };

  /**
   * checkGameover - 检查游戏是否结束
   * * @param {Number} x : 水平方向坐标
   * * @param {Number} y : 垂直方向坐标
   * * @param {Object} player : 玩家
   */
  Chessboard.prototype.checkGameover = function (x, y, player) {
    var countHorizontal = 0;
    var countVertical = 0
    var countBackslash = 0;
    var countSlash = 0;
    var i;
    var j;

    if (this.steps.length >= Math.pow(this._gobang.range, 2)) {
      return 'tie';
    }

    // 水平方向检查
    for (i = x; i >= 0; i--) {
      if (this.pieces[i][y].player === player) {
        countHorizontal += 1;
      } else {
        break;
      }
    }

    for (j = x + 1; j < this._gobang.range; j++) {
      if (this.pieces[j][y].player === player) {
        countHorizontal += 1;
      } else {
        break;
      }
    }

    if (countHorizontal >= this._gobang.winLen) {
      return player;
    }

    // 垂直方向检查
    for (i = y; i >= 0; i--) {
      if (this.pieces[x][i].player === player) {
        countVertical += 1;
      } else {
        break;
      }
    }

    for (j = y + 1; j < this._gobang.range; j++) {
      if (this.pieces[x][j].player === player) {
        countVertical += 1;
      } else {
        break;
      }
    }

    if (countVertical >= this._gobang.winLen) {
      return player;
    }

    // 左上向右下检查（反斜线）
    for (i = x, j = y; i >= 0 && j >= 0; i-- , j--) {
      if (this.pieces[i][j].player === player) {
        countBackslash += 1;
      } else {
        break;
      }
    }

    for (i = x + 1, j = y + 1; i < this._gobang.range && j < this._gobang.range; i++ , j++) {
      if (this.pieces[i][j].player === player) {
        countBackslash += 1;
      } else {
        break;
      }
    }

    if (countBackslash >= this._gobang.winLen) {
      return player;
    }

    // 右上向左下检查（斜线）
    for (i = x, j = y; i < this._gobang.range && j >= 0; i++ , j--) {
      if (this.pieces[i][j].player === player) {
        countSlash += 1;
      } else {
        break;
      }
    }

    for (i = x - 1, j = y + 1; i >= 0 && j < this._gobang.range; i-- , j++) {
      if (this.pieces[i][j].player === player) {
        countSlash += 1;
      } else {
        break;
      }
    }

    if (countSlash >= this._gobang.winLen) {
      return player;
    }

    return false;
  };

  /**
   * pushStep - 下棋
   * * @param {Number} x : 水平方向坐标
   * * @param {Number} y : 垂直方向坐标
   */
  Chessboard.prototype.putPiece = function (x, y) {
    // 如果悔棋之后又下棋则把悔棋数组清空
    if (this.backspaces.length > 0) {
      this.backspaces.length = 0;
    }

    this.pieces[x][y].player = this.players[this.playerIndex];
    this.steps.push(this.pieces[x][y]);
    this.playerIndex = togglePlayerIndex(this.playerIndex);
  };

  // 悔棋
  Chessboard.prototype.pushBackspace = function () {
    // 先进后出 从 steps 内取出坐标放入 backspaces
    var point = this.steps.pop();
    this.backspaces.push(_.extend({}, point));
    this.pieces[point.x][point.y].player = null;
    this.playerIndex = togglePlayerIndex(this.playerIndex);
  };

  // 撤销悔棋
  Chessboard.prototype.cancelBackspace = function () {
    // 先进后出 从 backspaces 内取出坐标放入 steps
    var point = this.backspaces.pop();
    this.pieces[point.x][point.y].player = point.player;
    this.steps.push(point);
    this.playerIndex = togglePlayerIndex(this.playerIndex);

    return point;
  };

  function togglePlayerIndex(index) {
    return index === 0 ? 1 : 0;
  }

  return Chessboard;

});
