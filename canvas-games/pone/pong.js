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
    this.score = 0;
    this.timeout = 0;
    this.graphs = {};

    this.createGraph();
  };
  var canvasProto = Canvas.prototype;

  /**
   * 创建内部所需图形
   * 这里包括一个球和左右两边球拍
   */
  canvasProto.createGraph = function () {
    this.graphs.ball = new Ball(this);
    this.graphs.paddleL = new Paddle(this, 'left');
    this.graphs.paddleR = new Paddle(this, 'right');
  };

  canvasProto.draw = function () {
    this.ctx.clearRect(0, 0, this.w, this.h);

    // 绘制所有内部图形
    Object.keys(this.graphs).forEach(function (graph) {
      this.graphs[graph].draw();
    }, this);

    // 因为是球在运动所以更新方法绑定在球体对象上
    this.graphs.ball.update();
  };

  /**
   * Paddle
   * @param {Object} cvs 图形所在 canvas 对象
   * @param {String} dir 所处方位
   *
   */
  var Paddle = function (cvs, dir) {
    this.cvs = cvs;
    this.w = 10;
    this.h = 100;
    this.x = (dir === 'left') ? 0 : cvs.w - this.w;
    this.y = cvs.h / 2;
  };
  var paddleProto = Paddle.prototype;

  paddleProto.draw = function () {
    var ctx = this.cvs.ctx;
    ctx.fillStyle = '#108ee9';
    ctx.fillRect(this.x, (this.y - this.h / 2), this.w, this.h);
  };

  paddleProto.move = function (y) {
    this.y = y;
  };

  /**
   * Ball
   * @param {Object} cvs 图形所在 canvas 对象
   */
  var Ball = function (cvs) {
    this.cvs = cvs;
    this.x = getRangeInt(this.cvs.w / 4, this.cvs.w / 2);
    this.y = getRangeInt(this.cvs.h / 4, this.cvs.h / 2);
    this.vx = 5;
    this.vy = 5;
    this.radius = 10;
    this.speed = 30;
  };
  var ballProto = Ball.prototype;

  ballProto.draw = function () {
    var ctx = this.cvs.ctx;
    ctx.beginPath();
    ctx.fillStyle = '#f04134';
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  };

  // 球体数据更新和碰撞检测
  ballProto.update = function () {
    this.move();

    var cvs = this.cvs;
    var collision = this.checkCollision();

    // 得分
    if (collision.score) {
      this.vx *= -1;
      cvs.score += 1;

      // 难度升级
      if (!(cvs.score % 5)) {
        this.speed *= 0.8;
        cvs.graphs.paddleL.h *= 0.9;
        cvs.graphs.paddleR.h *= 0.9;
      }
    }

    if (collision.gameover) {
      // game over
      cvs.score = 0;
      clearTimeout(cvs.timeout = 0);
      gameoverDialog.classList.add(ACTIVE);
    } else {
      // 重绘
      cvs.timeout = setTimeout(function () {
        cvs.draw();
      }.bind(this), this.speed);
    }
  };

  /**
   * 检测球体碰撞
   * 碰撞到左右边框 game over
   * 碰撞到左右球拍改变 x 轴运动方向
   */
  ballProto.checkCollision = function () {
    var paddleL = this.cvs.graphs.paddleL;
    var paddleR = this.cvs.graphs.paddleR;
    var pointLeft = paddleL.w + this.radius;
    var pointRight = this.cvs.w - paddleR.w - this.radius;
    var score = false;
    var gameover = false;
    var paddleHalfH = paddleL.h / 2;

    // 球体与球拍碰撞检测
    if (this.x < pointLeft) {
      if (this.y >= paddleL.y - paddleHalfH && this.y <= paddleL.y + paddleHalfH) {
        this.x = pointLeft;
        score = true;
      }
    } else if (this.x > pointRight) {
      if (this.y >= paddleR.y - paddleHalfH && this.y <= paddleR.y + paddleHalfH) {
        this.x = pointRight;
        score = true;
      }
    }

    // 球体与左右边框碰撞检测
    if (this.x <= 0 || this.x >= this.cvs.w) {
      gameover = true
    }

    return {
      score: score,
      gameover: gameover
    };
  };

  /**
   * 球体移动
   * 更新球体坐标属性数据
   */
  ballProto.move = function () {
    // 碰撞到上下边框改变 y 轴运动方向
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > this.cvs.h - this.radius) {
      this.y = this.cvs.h - this.radius;
      this.vy *= -1;
    }

    this.x += this.vx;
    this.y += this.vy;
  };

  var inMobile = /mobile/i.test(window.navigator.userAgent);
  var canvas = document.querySelector('.pong-canvas');
  var cvs;

  if (inMobile) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    canvas.width = w - (w % 10) - 20;
    canvas.height = h - (h % 10) - 20;
  }

  // 开始游戏
  Array.prototype.forEach.call(document.querySelectorAll('.start-game'), function (el) {
    el.onclick = function () {
      cvs = new Canvas(canvas);
      cvs.draw();

      this.closest('.dialog-modal').classList.remove(ACTIVE);
    };
  });

  // 移动和 PC 端操作方式不一样
  if (inMobile) {
    var startY, paddleY;

    canvas.addEventListener('touchstart', function (event) {
      startY = event.changedTouches[0].pageY;
      paddleY = cvs.graphs.paddleL.y;
    });

    canvas.addEventListener('touchmove', function (event) {
      var distanceY = event.changedTouches[0].pageY - startY;
      var y = paddleY + distanceY;
      cvs.graphs.paddleL.move(y);
      cvs.graphs.paddleR.move(y);
    });
  } else {
    canvas.onmousemove = function (event) {
      var y = event.pageY - this.offsetTop;
      cvs.graphs.paddleL.move(y);
      cvs.graphs.paddleR.move(y);
    };
  }

  // 阻止页面下拉默认事件 － 导致容器下拉出现域名
  document.addEventListener('touchmove', function (event) {
    event.preventDefault();
  });

  // 获取限定范围内随机数
  function getRangeInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

})();
