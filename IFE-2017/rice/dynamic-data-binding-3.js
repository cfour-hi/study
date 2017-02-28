function Observer(data) {
  this.data = data;
  this.handlers = {};

  this.walk(data);
}

Observer.prototype.walk = function(obj) {
  var val;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') new Observer(val);

      defineProp(this.data, key, val, this, key);
    }
  }
};

Observer.prototype.$emit = function(key) {
  var handlerArgs = Array.prototype.slice.call(arguments, 1);

  if (this.handlers[key] && this.handlers[key].length) {
    for (var i = 0; i < this.handlers[key].length; i++) {
      this.handlers[key][i].apply(this, handlerArgs);
    }
  }

  return this;
}

Observer.prototype.$watch = function(key, watcher) {
  var keyObj = this.data[key];
  var props = [];

  for (var prop in keyObj) {
    if (keyObj.hasOwnProperty(prop)) props.push(prop);
  }

  for (var i = 0; i < props.length; i++) {
    var _key = props[i];
    defineProp(keyObj, _key, keyObj[_key], this, key);
  }

  if (!(key in this.handlers)) this.handlers[key] = [];
  this.handlers[key].push(watcher);
  return this;
};

function defineProp(obj, key, value, ctx, watchKey) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('你访问了 ' + key);
      return value;
    },
    set: function(newVal) {
      console.log('你设置了 ' + key + '，新的值为 ' + newVal);

      if (newVal === value) return;
      value = newVal;

      if (watchKey && ctx.handlers[watchKey] && ctx.handlers[watchKey].length) {
        ctx.$emit(watchKey, newVal);
      }
    }
  });
}

var app = new Observer({
  name: {
    firstName: 'shaofeng',
    lastName: 'liang'
  },
  age: 25
});

app.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
