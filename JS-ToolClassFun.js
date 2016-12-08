/**
 * 获取 URL querystring 中的参数
 * get param from URL querystring
 *
 * @[param] {String} name
 * 如不传则返回所有查询对象
 * return all query objects when not has value
 *
 * @return {Null || String || Object} 
 */
var getQueryString = function(name) {
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