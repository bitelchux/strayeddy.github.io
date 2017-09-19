(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });
  
  // Fill up hidden selects of therapy form
  $("input[name=problem]").val($("select[name=problemSelect]").val());
  $("select[name=problemSelect]").change(function(){
    $("input[name=problem]").val($(this).val());
  });
  
  $("input[name=preference]").val($("select[name=preferenceSelect]").val());
  $("select[name=preferenceSelect]").change(function(){
    $("input[name=preference]").val($(this).val());
  });
  
  // Fill up hidden selects of courses form
  $("input[name=course]").val($("select[name=courseSelect]").val());
  $("select[name=courseSelect]").change(function(){
    $("input[name=course]").val($(this).val());
  });
  
  $("input[name=nbPeople]").val($("select[name=nbPeopleSelect]").val());
  $("select[name=nbPeopleSelect]").change(function(){
    $("input[name=nbPeople]").val($(this).val());
  });

})(jQuery); // End of use strict
