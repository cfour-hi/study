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
      return val;
    },
    set: function(newVal) {
      console.log('你设置了 ' + key + '，新的值为 ' + newVal);

      if (newVal === val) return;
      if (typeof newVal === 'object') new Observer(newVal);

      val = newVal;
      self.$emit(key, newVal);
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
  if (!(key in this.handlers)) this.handlers[key] = [];
  this.handlers[key].push(callback);
  return this;
};

var app = new Observer({
  a: 1,
  b: 2,
  c: {
   d: 3,
   e: 4
 }
})

app.data.a;
app.data.a = 11;
app.data.c.d;
app.data.c.d = 33;

var app1 = new Observer({
  name: 'youngwind',
  age: 25
});

// 你需要实现 $watch 这个 API
app1.$watch('age', function(age) {
  console.log(`我的年纪变了，现在已经是：${age}岁了`)
});

app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'
