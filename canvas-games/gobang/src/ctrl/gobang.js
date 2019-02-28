define([
  'util',
  'Chessboard',
  'CanvasGobang',
  'DOMGobang'
], function (_, Chessboard, CanvasGobang, DOMGobang) {

  /**
   * Gobang
   * @param {Object} options
   * |- * @param {Element} el : canavs 元素
   * |- * @param {String} type : 绘制类型
   * |- * @param {Number} range : 棋盘范围
   * |- * @param {Number} distance : 棋盘间隔
   * |- * @param {Object} whitePiece : 白色棋子
   * |- * @param {Object} blackPiece : 黑色棋子
   * |-   @param {Boolean} withAI : 人机对战
   * |-   @param {Function} onStep : 下棋 callback
   * |-   @param {Function} onGameover : 游戏结束 callback
   * |-   @param {Function} onBackspace : 悔棋 callback
   * |-   @param {Function} onCancelBackspace : 撤销悔棋 callback
   */
  var Gobang = function (options) {
    _.extend(this, options);

    // 生成棋盘模型
    this.vm = new Chessboard(this);

    this.init();
    this.initEvents();
  };

  Gobang.prototype.init = function () {
    // 根据 type 值创建对应的视图
    if (this.type === 'canvas') {
      this.view = new CanvasGobang(this);
    } else if (this.type === 'dom') {
      this.view = new DOMGobang(this);
    } else {
      console.error('初始化棋盘时 type 值错误！');
    }
  };

  Gobang.prototype.initEvents = function () {
    this.el.onclick = function (event) {
      if (this.vm.gameover) {
        return console.warn('游戏已结束！');
      }

      x = Math.round((event.clientX - this.el.offsetLeft - this.distance) / this.distance);
      y = Math.round((event.clientY - this.el.offsetTop - this.distance) / this.distance);

      if (x < 0 || x >= this.range || y < 0 || y >= this.range) {
        return console.warn('超出有效点击范围！');
      }

      this.putPiece(x, y);
    }.bind(this);
  };

  // 下棋
  Gobang.prototype.putPiece = function (x, y) {
    var point = this.vm.pieces[x][y];

    if (point.player) {
      return console.warn('当前位置已有棋子！');
    }

    // 数据更新
    this.vm.putPiece(x, y);

    // 视图更新
    this.view.drawPiece(point.player.piece, x, y);

    // 触发下棋回调
    if (this.onStep) {
      this.onStep(this.vm.players[this.vm.playerIndex]);
    }

    var result = this.vm.checkGameover(x, y, point.player);
    // 触发游戏结束回调
    if (result && this.onGameover) {
      console.info('游戏结束！');
      this.vm.gameover = true;
      this.onGameover(result);
    }
  };

  // 悔棋
  Gobang.prototype.backspace = function () {
    if (this.vm.steps.length === 0) {
      return console.warn('已经无棋可悔！');
    }

    // 数据更新
    this.vm.pushBackspace();

    // 视图更新
    this.view.backspace();

    // 触发悔棋回调
    if (this.onBackspace) {
      this.onBackspace(this.vm.players[this.vm.playerIndex]);
    }
  };

  // 撤销悔棋
  Gobang.prototype.cancelBackspace = function () {
    if (this.vm.backspaces.length === 0) {
      return console.warn('已经撤销所有悔棋！');
    }

    // 数据更新
    var point = this.vm.cancelBackspace();

    // 视图更新
    this.view.cancelBackspace(point);

    // 触发撤销悔棋回调
    if (this.onCancelBackspace) {
      this.onCancelBackspace(this.vm.players[this.vm.playerIndex]);
    }
  };

  return Gobang;

});
