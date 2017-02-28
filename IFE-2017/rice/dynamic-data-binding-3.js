function Observer(data) {
  this.data = data;
  this.handlers = {};
  this.watchList = [];
  this.getterList = [];

  this.walk(data);
}

Observer.prototype.walk = function(obj) {
  var val;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') new Observer(val);
      this.convert(key, val);
    }
  }
};

Observer.prototype.convert = function(key, val) {
  var self = this;

  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('你访问了 ' + key);

      self.getterList.push(key);
      return val;
    },
    set: function(newVal) {
      console.log('你设置了 ' + key + '，新的值为 ' + newVal);

      if (newVal === val) return;
      if (typeof newVal === 'object') new Observer(newVal);

      val = newVal;

      if (self.watchList.indexOf(key) === -1) {
        for (var i = self.getterList.length - 2; i >= 0; i--) {
          if (self.watchList.indexOf(self.getterList[i])) {
            self.$emit(key, newVal);
          }
        }
      } else {
        self.$emit(key, newVal);
      }

      self.getterList.length = 0;
    }
  })
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

Observer.prototype.$watch = function(key, callback) {
  if (this.watchList.indexOf(key) === -1) this.watchList.push(key);

  if (!(key in this.handlers)) this.handlers[key] = [];
  this.handlers[key].push(callback);
  return this;
};

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
