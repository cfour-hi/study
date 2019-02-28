define([
  'util'
], function (_) {

  /**
   * Player
   * @param {Object} options
   * |- * @param {Object} _gobang : 所处棋盘
   * |- * @param {Object} piece : 棋子图片
   * |- * @param {Number} index : 玩家标记
   * |- * @param {String} name : 玩家名称
   */
  var Player = function (options) {
    _.extend(this, options);
  };

  return Player;

});
