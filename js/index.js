$(function(){

  var e = $('.notice');
  var n = e.find('ul');
  var a = n.find('>li');
  var hmenu  = $('.header--menu');
  var menuSrc = hmenu.children('img').attr('src');
  var nav = $('nav');

  //공지사항
  a.each(function(){
    var n = $(this);
    n.addClass('-close');
    n.find('>dl>dt').on('click',function(){
      n.toggleClass('-close');
    });
  });

  //select 
  $('#lang_select').on('change',function(){
    var url = $(this).val();
    if(url){
      window.location = url;
    }
    return false;
  });
  //nav
  hmenu.on('click',function(e){
    e.preventDefault();
    $(this).toggleClass('open');
    if($(this).hasClass('open')){
      menuSrc = menuSrc.replace('btn_menu.png','btn_menu_close.png');
      hmenu.children('img').attr('src', menuSrc);
      nav.fadeIn();
    }else {
      menuSrc = menuSrc.replace('btn_menu_close.png','btn_menu.png');
      hmenu.children('img').attr('src', menuSrc);
      nav.fadeOut();
    }
  });
  

  $('.nav-list a[href^="#"]').on("click", function(e) {
    e.preventDefault();
      var n = $(e.currentTarget).attr("href")
        , t = $("#" == n || "" == n ? "html" : n).offset().top;
      return $("body,html").animate({
          scrollTop: t           
      }, 400,function(){
        $('nav.sp').fadeOut();
        menuSrc = menuSrc.replace('btn_menu_close.png','btn_menu.png');
        hmenu.children('img').attr('src', menuSrc);
        hmenu.removeClass('open');
      });
  });

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    if(isMobile) {
      $('nav').addClass('sp');
     }


    //animation
    TweenMax.set('.aniObj',{autoAlpha: 0,y:'40'});

    //200828 수정 TweenMax.from('header',1.2,{y:'-100'}); 
    TweenMax.from('.about--title',.6,{y:30,autoAlpha:0,delay:.8,ease: Power2.easeOut});
    TweenMax.staggerFrom('.about--txt p',1,{y:25,autoAlpha:0,delay:1,ease:Power3.easeOut},.2);

    var $animation_elements = $('.aniObj');
    var $window = $(window);
    
    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
    
      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top + 100;
        var element_bottom_position = (element_top_position + element_height);
    
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          TweenMax.to($element,1,{y:0,autoAlpha:1});
        } else {
        TweenMax.to($element,1,{y:'40',autoAlpha:0});
        }
      });
    }
    
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    
});