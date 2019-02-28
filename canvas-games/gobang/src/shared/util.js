define(function () {

  var util = {};

  util.extend = function (to, from) {
    for (var key in from) {
      to[key] = from[key];
    }
    return to;
  };

  return util;

});
