/**
 * 获取 URL querystring 中的参数
 * get param from URL querystring
 * 默认返回所有查询对象
 * return all query objects by default
 *
 * @[param] {String} name
 * 如不传则返回所有查询对象
 * return all query objects when not has value
 * @param {String} name
 * @return {Null || String || Object}
 */
var getUrlQueryStr = function(name) {
  var querystring = location.search;
  var param = {};
  var kvs = null;
  var kv = null;

  if (!querystring) return null;

  querystring = querystring.replace(/^\?/, '');
  kvs = querystring.split('&');

  kvs.forEach(function(elem, index, arr) {
    kv = elem.split('=');
    param[kv[0]] = decodeURIComponent(kv[1]);
  });

  return (name ? param[name] : param);
};

/**
 * 获取字符串字符长度
 * get the character string length
 *
 * @param {String} str
 * @return {Number} strLen
 */
var getStrCharCodeLen = function(str) {
  var strLen = 0;
  [].forEach.call(str, function(elem, index, arr) {
    var charCode = elem.charCodeAt(0);
    if (charCode < 0x007f) {
      strLen += 1;
    } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
      strLen += 2;
    } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
      strLen += 3;
    }
  });
  return strLen;
};

/**
 * 普通数字替换为金额数字
 *
 * @param {Number} num
 * return {String} num
 */
var getGroupNum = function(num) {
  num = num + '';
  var splitNum = num.split('.');
  var integer = splitNum[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(integer)) {
    integer = integer.replace(rgx, '$1,$2');
  }
  return integer + '.' + splitNum[1];
}
