!(function () {

  var ACTIVE = 'active';
  var gameoverDialog = document.querySelector('.dialog-modal__gameover');

  /**
   * Canvas
   * @param {Element} el
   * 包含自身属性和所需图形对象
   */
  var Canvas = function (el) {
    this.el = el;
    this.ctx = el.getContext('2d');
    this.w = el.width;
    this.h = el.height;
    this.level = 1;
    this.timeout = 0;
    this.graphs = {};

    this.createGraph();
  };
  var canvasProto = Canvas.prototype;

  /**
   * 创建内部所需图形
   * 这里包括贪吃蛇和食物
   */
  canvasProto.createGraph = function () {
    this.graphs.snake = new Snake(this);
    this.graphs.bowl = new Bowl(this);
  };

  canvasProto.draw = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);

    // 绘制所有内部图形
    Object.keys(this.graphs).forEach(function (graph) {
      this.graphs[graph].draw();
    }, this);

    // 因为是贪吃蛇在移动所以更新方法绑定在贪吃蛇对象上
    this.graphs.snake.update();
  };

  /**
   * Canvas
   * @param {Object} cvs 图形所在 canvas 对象
   */
  var Bowl = function (cvs) {
    this.cvs = cvs;
    this.foods = [];
    this.foodSize = 10;

    this.init(cvs.level);
  };
  var bowlProto = Bowl.prototype;

  bowlProto.init = function (level) {
    for (var i = level - 1; i >= 0; i--) {
      var point = getFoodPoint(this.cvs, this.foodSize);
      var hasFoodPoint = checkHasFoodPoint(point, this.foods);

      if (hasFoodPoint) {
        i += 1;
      } else {
        this.foods.push(point);
      }
    }
  };

  bowlProto.draw = function () {
    var ctx = this.cvs.ctx;
    this.foods.forEach(function (food) {
      ctx.fillStyle = '#f04134';
      ctx.fillRect(food.x * this.foodSize, food.y * this.foodSize, this.foodSize, this.foodSize);
    }, this);
  };

  /**
   * Snake
   * @param {Object} cvs 图形所在 canvas 对象
   */
  var Snake = function (cvs) {
    this.cvs = cvs;
    this.size = 10;
    this.dir = 'right';
    this.segments = new Array(10);
    this.eaten = 0;
    this.speed = 200;

    this.init();
  };
  var snakeProto = Snake.prototype;

  // 初始化添加贪吃蛇的身体每段的坐标
  snakeProto.init = function () {
    var len = this.segments.length;
    for (var i = 0; i < len; i++) {
      this.segments[i] = { x: len - i, y: 0 };
    }
  };

  snakeProto.draw = function () {
    var ctx = this.cvs.ctx;
    this.segments.forEach(function (seg) {
      ctx.fillStyle = '#108ee9';
      ctx.fillRect(seg.x * this.size, seg.y * this.size, this.size, this.size);
    }, this);
  };

  // 贪吃蛇数据更新和碰撞检测
  snakeProto.update = function () {
    var nextX = this.segments[0].x;
    var nextY = this.segments[0].y;

    switch (this.dir) {
      case 'right':
        nextX += 1;
        break;
      case 'left':
        nextX -= 1;
        break;
      case 'up':
        nextY -= 1;
        break;
      case 'down':
        nextY += 1;
        break;
    }

    if (this.checkCollision(nextX, nextY)) {
      // game over
      clearTimeout(this.cvs.timeout = 0);
      gameoverDialog.classList.add(ACTIVE);
      return;
    }

    // 检测是否吃到食物
    this.checkFood(nextX, nextY);
    this.move(nextX, nextY);

    this.cvs.timeout = setTimeout(function () {
      this.cvs.draw();
    }.bind(this), this.speed);
  };

  // 碰撞检测
  snakeProto.checkCollision = function (x, y) {
    // 是否碰撞到自己身体
    for (var i = this.segments.length - 1; i >= 0; i--) {
      if (this.segments[i].x === x && this.segments[i].y === y) {
        return true;
      }
    }

    // 是否碰撞到边框
    if (x === -1 || x * this.size === this.cvs.w || y === -1 || y * this.size === this.cvs.h) {
      return true;
    }

    return false;
  };

  // 食物检测
  snakeProto.checkFood = function (x, y) {
    var cvs = this.cvs;
    var snake = cvs.graphs.snake;

    // 是否吃到食物
    cvs.graphs.bowl.foods.forEach(function (food, index, foods) {
      if (food.x === x && food.y === y) {
        snake.eaten += 1;
        snake.segments.push({
          x: food.x,
          y: food.y
        });
        foods.splice(index, 1);

        // 难度升级
        if (!foods.length) {
          cvs.level += 1;
          snake.speed *= 0.8;
          cvs.graphs.bowl = new Bowl(cvs);
        }
      }
    }, this);
  };

  snakeProto.move = function (x, y) {
    var tail = this.segments.pop();
    tail.x = x;
    tail.y = y;
    this.segments.unshift(tail);
  };

  var inMobile = /mobile/i.test(window.navigator.userAgent);
  var canvas = document.querySelector('.snake-canvas');
  var cvs;

  if (inMobile) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    canvas.width = w - (w % 10) - 20;
    canvas.height = h - (h % 10) - 170;
  }

  // 开始游戏
  Array.prototype.forEach.call(document.querySelectorAll('.start-game'), function (el) {
    el.onclick = function () {
      cvs = new Canvas(canvas);
      cvs.draw();

      this.closest('.dialog-modal').classList.remove(ACTIVE);
    };
  });

  document.onkeydown = function (event) {
    if (!cvs) { return; }

    var key = event.keyCode;
    var snake = cvs.graphs.snake;

    if (key === 37 || key === 38 || key === 39 || key === 40) {
      event.preventDefault();
    }

    if (key === 37 && snake.dir !== 'right') {
      snake.dir = 'left';
    } else if (key === 38 && snake.dir !== 'down') {
      snake.dir = 'up';
    } else if (key === 39 && snake.dir !== 'left') {
      snake.dir = 'right';
    } else if (key === 40 && snake.dir !== 'up') {
      snake.dir = 'down';
    }
  };

  Array.prototype.forEach.call(document.querySelectorAll('.controller-dir'), function (ctrl) {
    // Google 移动端点击延迟 300ms 解决方案 PEP
    // https://github.com/jquery/PEP
    ctrl.addEventListener('pointerdown', function () {
      var dir = this.dataset.dir;
      var snake = cvs.graphs.snake;

      this.classList.add(ACTIVE);
      setTimeout(function () {
        this.classList.remove(ACTIVE);
      }.bind(this), 120);

      if (dir === 'left' && snake.dir !== 'right') {
        snake.dir = 'left';
      } else if (dir === 'up' && snake.dir !== 'down') {
        snake.dir = 'up';
      } else if (dir === 'right' && snake.dir !== 'left') {
        snake.dir = 'right';
      } else if (dir === 'down' && snake.dir !== 'up') {
        snake.dir = 'down';
      }
    });
  });

  // 获取食物随机坐标点
  function getFoodPoint(cvs, size) {
    return {
      x: Math.floor(Math.random() * (cvs.w - size) / size),
      y: Math.floor(Math.random() * (cvs.h - size) / size)
    };
  }

  // 检测食物是否有重复坐标点
  function checkHasFoodPoint(point, foods) {
    for (var i = foods.length - 1; i >= 0; i--) {
      if (foods[i].x === point.x && foods[i].y === point.y) {
        return true;
      }
    }
    return false;
  }

})();
