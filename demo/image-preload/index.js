; (function ($) {
  $('nav a').on({
    mouseenter: function () {
      var index = $(this).index();
      var $img = $('ul li').eq(index).find('img');
      var imgSrc = $img.attr('data-src');

      if (!imgSrc) return;

      $img.attr('src', imgSrc);
      $img.removeAttr('data-src');

      console.log('已经预加载：' + imgSrc);
    },
    click: function () {
      var index = $(this).index();

      $('nav a, ul li').removeClass('active');
      $('nav a').eq(index).addClass('active');
      $('ul li').eq(index).addClass('active');
    }
  });
})(jQuery);
