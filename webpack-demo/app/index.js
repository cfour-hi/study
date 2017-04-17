var _ = require('lodash');
// var moment = require('moment');

require('./index.css');

function component() {
  var element = document.createElement('div');
  // var m = moment;
  // console.log(m);

  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
