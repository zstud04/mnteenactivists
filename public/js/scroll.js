var initialSrc = "img/logobw.png";
var scrollSrc = "img/logogrey.png";

// $(document).ready(function(){
//     $('#showtweet').hide();
// });

$(window).scroll(function() {
   var value = $(this).scrollTop();
   if (value > 110)
      $(".logoimg").attr("src", scrollSrc);
   else
      $(".logoimg").attr("src", initialSrc);
  var y = $(this).scrollTop();
  // if (y > 2700) {
  //   $('#showtweet').fadeIn();
    
  // } else {
  //   $('#showtweet').fadeOut();
  // }
   var z = $(this).scrollTop();
   if (z > 1200 && z<2500) {
    $('.jumbothird').fadeIn();
    
  } else {
    $('.jumbothird').fadeOut();
  }
});

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    var $scroll_nav=$(".scroll-nav");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    $scroll_nav.toggleClass('scrolled',$(this).scrollTop()>$nav.height());

  });
});

jQuery('.navbar-toggler').click(function() {

    if($('.navbar').hasClass('scrolled')==false){//check to see if class is already toggled
      $('.navbar').toggleClass('scrolled');
      $('.scroll-nav').toggleClass('scrolled');
      $(".logoimg").attr("src", scrollSrc);
    }

});

