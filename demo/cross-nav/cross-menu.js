const mouseTrackList = []
const ACTIVE_CLASSNAME = 'active'

function crossMenu (options) {
  const { menu, menuItemTag, submenu, submenuItemTag, delay = 300 } = options
  const menuItems = [...menu.querySelectorAll(menuItemTag)]
  const submenuItems = [...submenu.querySelectorAll(submenuItemTag)]

  menuItems.forEach((item, index) => (item.dataset.index = index + 1))
  submenuItems.forEach((item, index) => (item.dataset.index = index + 1))

  let isMouseInSubmenu = false

  // 记录当前鼠标位置是否处在耳机菜单
  submenu.addEventListener('mouseenter', () => (isMouseInSubmenu = true), false)
  submenu.addEventListener('mouseleave', () => (isMouseInSubmenu = false), false)

  menu.addEventListener('mouseenter', () => document.addEventListener('mousemove', handleMousemMoveMenu, false), false)
  menu.addEventListener('mouseleave', () => document.removeEventListener('mousemove', handleMousemMoveMenu), false)

  let activeMenuItem = null
  let timer = 0

  menu.addEventListener('mouseover', (event) => {
    if (event.target && event.target.nodeName.toLowerCase() === menuItemTag) {
      if (!activeMenuItem) {
        activeMenuItem = event.target
        return toggleActiveMenu(event)
      }

      if (timer) clearTimeout(timer)

      if (isNeedDelay(submenu, mouseTrackList[1], mouseTrackList[0])) {
        timer = setTimeout(() => {
          if (!isMouseInSubmenu) {
            toggleActiveMenu(event)
            timer = 0
          }
        }, delay)
      } else {
        toggleActiveMenu(event)
      }
    }
  }, false)

  let currentIndex = 0

  function toggleActiveMenu (event) {
    menuItems[currentIndex].classList.remove(ACTIVE_CLASSNAME)
    submenuItems[currentIndex].classList.remove(ACTIVE_CLASSNAME)
    currentIndex = +event.target.dataset.index - 1
    menuItems[currentIndex].classList.add(ACTIVE_CLASSNAME)
    submenuItems[currentIndex].classList.add(ACTIVE_CLASSNAME)
  }
}

function isNeedDelay (submenu, prePos, curPos) {
  const { offsetTop, offsetLeft, clientHeight } = submenu
  const topLeft = {
    x: offsetLeft,
    y: offsetTop
  };
  const bottomLeft = {
    x: offsetLeft,
    y: offsetTop + clientHeight
  };

  return isMouseInTrangle(curPos, prePos, topLeft, bottomLeft);
}

function isMouseInTrangle (p, a, b, c) {
  const pa = vector(p, a);
  const pb = vector(p, b);
  const pc = vector(p, c);

  // 参数顺序不能变
  const t1 = vectorProduct(pa, pb);
  const t2 = vectorProduct(pb, pc);
  const t3 = vectorProduct(pc, pa);

  return isSameSign(t1, t2) && isSameSign(t2, t3);
}

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

function handleMousemMoveMenu (event) {
  mouseTrackList.unshift({ x: event.pageX, y: event.pageY });
  if (mouseTrackList.length > 2) mouseTrackList.length = 2;
}
