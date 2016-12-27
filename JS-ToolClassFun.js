/**
 * 获取 URL querystring 中的参数
 * get param from URL querystring
 * 默认返回所有查询对象
 * return all query objects by default
 *
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
* 获取格式化后的金额 (保留两位小数)
* get the formatted amound (keep two decimal places)
* e.g. 12345 => 12,345.00
* 
* @param {Number} money
* @return {String}
*/
var getFormatMoney = function(money) {
  var splitMoney = money.toFixed(2).toString().split('.');
  var aInteger = splitMoney[0].split('');
  var len = aInteger.length;
  var index = len % 3;
  for (var i = len - 1; i > 0; i--) {
    if (i % 3 === index) {
      aInteger.splice(i, 0, ',');
    }
  }
  var sMoney = aInteger.join('');
  return +splitMoney[1] ? sMoney + '.' + splitMoney[1] : sMoney;
};

/**
* 获取格式化后的日期
* get the formatted date
* 默认返回以 '-' 为分隔符的今天日期
* return today's date with '-' as the delimiter by default
*
* @param {Date} date
* @param {String} delimiter
* @return {String}
*/
var getFormatDate = function(date, delimiter) {
  date = date ? new Date(date) : new Date();
  if (!delimiter) {
    delimiter = '-';
  }

  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  return [y, m, d].join(delimiter);
};