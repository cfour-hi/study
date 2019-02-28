define(function () {

  /**
   * DOMGobang
   * @param {Object} gobang
   */
  var DOMGobang = function (gobang) {
    this._gobang = gobang;
    this.step = 0;
    this.hasBackspace = false;
    this.baseMap = document.createElement('div');
    this.piecesMap = document.createElement('div');

    this.init();
    this.drawChessboard();
  };

  // 初始化
  DOMGobang.prototype.init = function () {
    var gb = this._gobang;
    gb.el.style.width = gb.el.style.height = ((gb.range + 1) * gb.distance) + 'px';

    this.baseMap.className = 'chessboard-base';
    this.piecesMap.className = 'chessboard-pieces';

    while (gb.el.children.length) {
      gb.el.firstElementChild.remove();
    }

    gb.el.appendChild(this.piecesMap);
  };

  // 绘制棋盘
  DOMGobang.prototype.drawChessboard = function () {
    var gb = this._gobang;
    var sideLen = (gb.range - 1) * gb.distance;
    var horLine, verLine;

    for (var i = gb.range - 1; i >= 0; i--) {
      horLine = document.createElement('span');
      horLine.className = 'chessboard-line horizontal-line';
      horLine.style.top = ((i * gb.distance) + gb.distance - 1) + 'px';
      horLine.style.left = (gb.distance - 1) + 'px';
      horLine.style.width = (sideLen + 2) + 'px';
      this.baseMap.appendChild(horLine);
    }

    for (var j = gb.range - 1; j >= 0; j--) {
      verLine = document.createElement('span');
      verLine.className = 'chessboard-line vertical-line';
      verLine.style.top = (gb.distance - 1) + 'px';
      verLine.style.left = ((j * gb.distance) + gb.distance - 1) + 'px';
      verLine.style.height = (sideLen + 2) + 'px';
      this.baseMap.appendChild(verLine);
    }

    // 所有元素添加完成再插入 dom
    gb.el.insertBefore(this.baseMap, this.piecesMap);
  };

  /**
   * drawPiece - 绘制棋子
   * * @param {Object} piece : 棋子图片
   * * @param {Number} x : 水平方向坐标
   * * @param {Number} y : 垂直方向坐标
   */
  DOMGobang.prototype.drawPiece = function (piece, x, y) {
    var gb = this._gobang;
    var halfDistance = gb.distance / 2;
    var piece = piece.cloneNode();
    var backspacePieces;

    // 移除 hidden piece image
    if (this.hasBackspace) {
      backspacePieces = this.piecesMap.querySelectorAll('.backspace-piece');
      for (var i = backspacePieces.length - 1; i >= 0; i--) {
        backspacePieces[i].remove();
      }
    }

    piece.className = 'chessboard-piece';
    piece.style.top = ((y * gb.distance) + gb.distance - halfDistance + 2) + 'px';
    piece.style.left = ((x * gb.distance) + gb.distance - halfDistance + 2) + 'px';

    this.piecesMap.appendChild(piece);
    this.step += 1;
  };

  // 悔棋，这一步仅仅是让棋子不可见 visibility: hidden，避免 reflow
  DOMGobang.prototype.backspace = function () {
    var gb = this._gobang;
    var childs = this.piecesMap.children;

    childs[this.step - 1].classList.add('backspace-piece');
    this.step -= 1;

    if (!this.hasBackspace) {
      this.hasBackspace = true;
    }
  };

  /**
   * cancelBackspace - 撤销悔棋
   * * @param {Number} x : 水平方向坐标
   * * @param {Number} y : 垂直方向坐标
   * * @param {Object} player : 玩家
   *
   * 这一步也仅仅是让已经悔棋的棋子可见，避免 reflow
   */
  DOMGobang.prototype.cancelBackspace = function () {
    var backspacePieces = this.piecesMap.querySelectorAll('.backspace-piece');

    backspacePieces[0].classList.remove('backspace-piece');
    this.step += 1;

    if (backspacePieces.length === 1) {
      this.hasBackspace = false;
    }
  };

  return DOMGobang;

});
