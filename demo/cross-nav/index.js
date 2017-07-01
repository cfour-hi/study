; (function ($) {
  var $menu = $('.menu');
  var $submenu = $('.submenu');
  var submenuList = $submenu.find('li');

  var isMouseInSubmenu = false;
  var timer = 0;
  var mouseTrackList = [];
  var $activeMenu = null;

  // 记录当前鼠标位置是否处在耳机菜单
  $submenu.on('mouseenter', function () {
    isMouseInSubmenu = true;
  }).on('mouseleave', function () {
    isMouseInSubmenu = false;
  });

  $menu.on('mouseenter', function () {
    $(document).on('mousemove', mouseMoveInMenuHandler);
  }).on('mouseleave', function () {
    $(document).unbind('mousemove');
  }).on('mouseenter', 'li', function (e) {
    if (!$activeMenu) {
      $activeMenu = $(e.target);
      return submenuList[$activeMenu.index()].classList.add('active');
    }
    if (timer) clearTimeout(timer)
    if (isNeedDelay($submenu, mouseTrackList[1], mouseTrackList[0])) {
      timer = setTimeout(function () {
        if (isMouseInSubmenu) return;
        submenuList.removeClass('active');
        submenuList[$(e.target).index()].classList.add('active');
        timer = 0
      }, 300);
    } else {
      submenuList.removeClass('active');
      submenuList[$(e.target).index()].classList.add('active');
    }
  });

  function vector (a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y
    };
  }

  function vectorProduct (a, b) {
    return a.x * b.y - b.x * a.y;
  }

  // 参数同为正数或负数
  function isSameSign (a, b) {
    return (a ^ b) >= 0;
  }

  function isMouseInTrangle (p, a, b, c) {
    var pa = vector(p, a);
    var pb = vector(p, b);
    var pc = vector(p, c);

    // 参数顺序不能变
    var t1 = vectorProduct(pa, pb);
    var t2 = vectorProduct(pb, pc);
    var t3 = vectorProduct(pc, pa);

    return isSameSign(t1, t2) && isSameSign(t2, t3);
  }

  function isNeedDelay (submenu, prePos, curPos) {
    var offset = submenu.offset();
    var topLeft = {
      x: offset.left,
      y: offset.top
    };
    var bottomLeft = {
      x: offset.left,
      y: offset.top + submenu.height()
    };

    return isMouseInTrangle(curPos, prePos, topLeft, bottomLeft);
  }

  // 记录鼠标在主菜单移动的位置
  function mouseMoveInMenuHandler (e) {
    mouseTrackList.unshift({ x: e.pageX, y: e.pageY });
    if (mouseTrackList.length > 2) mouseTrackList.length = 2;
  }
})(jQuery);
