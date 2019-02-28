!(function (global) {

  var _ = {};

  _.extend = function (to, from) {
    for (var key in from) {
      to[key] = from[key];
    }
    return to;
  };

  global._ = _;

})(this);
