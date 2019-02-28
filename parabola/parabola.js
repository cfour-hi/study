(function() {

  // 抛物线公式
  // y = a * x * x + b * x + c

  var Parabola = function(options) {
    // 抛物线开始点坐标
    this.x1 = options.origin.x;
    this.y1 = -options.origin.y;

    // 抛物线结束点坐标
    this.x2 = options.target.x;
    this.y2 = -options.target.y;

    // 抛物线运动元素
    this.el = options.el;

    // 运动速度（x 轴每帧偏移大小）
    this.speed = options.speed || 10;

    // 抛物线运动完成后的回调
    if (options.onMotionDone) this.onMotionDone = options.onMotionDone

    // 决定 a 值的大小
    this.curvature = options.curvature || 1;

    // 已知两点坐标，求 a, b, c 的值。
    // a > 0 抛物线开口朝上
    // a < 0 抛物线开口朝下
    // a 的绝对值大小决定抛物线开口的大小 => 绝对值越小，开口越大。
    // a 的值根据两点在 y 轴距离和 curvature 值计算
    //
    // curvature 值的作用有两点
    // 1. 决定抛物线开口大小
    //    值越大，开口越小。
    // 2. 决定对称轴的位置
    //    值越大，距离原点（ options.origin ）越近。
    this.a = Math.pow(Math.sqrt(Math.abs(this.y1 - this.y2)), this.curvature) / 1000;
    if (options.direction === 'down') this.a = -this.a;

    /**
     * b 值求解过程
     *
     * y1 = a * x1 * x1 + b * x1 + c      c = y1 - a * x1 * x1 - b * x1
     *                                =>
     * y2 = a * x2 * x2 + b * x2 + c      c = y2 - a * x2 * x2 - b * x2
     *
     * => y1 - a * x1 * x1 - b * x1 = y2 - a * x2 * x2 - b * x2
     *
     * => b * x1 - b * x2 = (y1 - a * x1 * x1) - (y2 - a * x2 * x2)
     *
     * => b * (x1 - x2) = (y1 - a * x1 * x1) - (y2 - a * x2 * x2)
     *
     * => b = ((y1 - a * x1 * x1) - (y2 - a * x2 * x2)) / (x1 - x2)
     */
    var t1 = this.y1 - this.a * this.x1 * this.x1;
    var t2 = this.y2 - this.a * this.x2 * this.x2;

    this.b = (t1 - t2) / (this.x1 - this.x2);
    this.c = t1 - this.b * this.x1;
  }

  Parabola.prototype.start = function() {
    var self = this;

    requestAnimationFrame(parabola2target);

    var x = self.x1;
    var y, translateX, translateY;
    function parabola2target() {
      // 横坐标运动到 x 对应的纵坐标 y 的值
      y = self.a * x * x + self.b * x + self.c;

      // 在页面中一个元素偏移
      // x 轴（左右）偏移往左需减，往右需增。
      // y 轴（上下）偏移往上需减，往下需增。
      translateX = x - self.x1;
      translateY = self.y1 - y;

      self.el.style.transform = 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0)';

      x -= self.speed;
      if (x > self.x2) {
        requestAnimationFrame(parabola2target);
      } else {
        if (self.onMotionDone) self.onMotionDone();
      }
    }
  }

  window.Parabola = Parabola;

})();
