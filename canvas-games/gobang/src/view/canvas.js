define(function () {

  /**
   * CanvasGobang
   * @param {Object} gobang
   */
  var CanvasGobang = function (gobang) {
    this._gobang = gobang;
    this.ctx = gobang.el.getContext('2d');

    this.init();
    this.drawChessboard();
  };

  // 初始化
  CanvasGobang.prototype.init = function () {
    var gb = this._gobang;
    gb.el.width = gb.el.height = (gb.range + 1) * gb.distance;
  };

  // 绘制棋盘
  CanvasGobang.prototype.drawChessboard = function () {
    var gb = this._gobang;
    var max = gb.range * gb.distance;

    this.ctx.clearRect(0, 0, gb.el.width, gb.el.height);

    for (var i = gb.distance; i <= max; i += gb.distance) {
      this.ctx.beginPath();
      this.ctx.moveTo(gb.distance, i);
      this.ctx.lineTo(max, i);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(i, gb.distance);
      this.ctx.lineTo(i, max);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    gb.vm.steps.forEach(function (point) {
      this.drawPiece(point.player.piece, point.x, point.y);
    }, this);
  };

  /**
   * drawPiece - 绘制棋子
   * * @param {Object} piece : 棋子图片
   * * @param {Number} x : 水平方向坐标
   * * @param {Number} y : 垂直方向坐标
   */
  CanvasGobang.prototype.drawPiece = function (piece, x, y) {
    var gb = this._gobang;
    var halfDistance = gb.distance / 2;

    this.ctx.drawImage(piece, x * gb.distance + halfDistance, y * gb.distance + halfDistance);
  };

  // 悔棋
  CanvasGobang.prototype.backspace = function () {
    this.drawChessboard();
  };

  /**
   * cancelBackspace - 撤销悔棋
   * * @param {Number} x : 水平方向坐标
   * * @param {Number} y : 垂直方向坐标
   * * @param {Object} player : 玩家
   */
  CanvasGobang.prototype.cancelBackspace = function (point) {
    this.drawPiece(point.player.piece, point.x, point.y);
  };

  return CanvasGobang;

});
