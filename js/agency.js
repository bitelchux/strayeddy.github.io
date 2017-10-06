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

  $('#servicesDropdown').on('shown.bs.dropdown', function () {
    var target = $('#services');
    target = target.length ? target : $('[name=services]');

    if (target.length) {
      $('html, body').animate({
        scrollTop: (target.offset().top - 54)
      }, 1000, "easeInOutExpo");
      return false;
    }
  })

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

  // cause back button to close bootstrap modal windows
  $('div.modal').on('show.bs.modal', function() {
    var modal = this;
    var hash = modal.id;
    window.location.hash = hash;
    window.onhashchange = function() {
      if (!location.hash){
        $(modal).modal('hide');
      }
    }
  });

  $('div.modal').on('hidden.bs.modal', function() {
    var hash = this.id;
    history.replaceState('', document.title, window.location.pathname);
  });

  // when close button clicked simulate back
  $('div.modal button.close').on('click', function(){
    window.history.back();
  })

  // when esc pressed when modal open simulate back
  $('div.modal').keyup(function(e) {
    if (e.keyCode == 27){
      window.history.back();          
    }
  });

  // data news modal
  $(document).ready(function(){
    $('a[href="#newsModal"]').click(function(e) {
      var modalId = $(this).attr('data-news-id');
      var url = 'news/' + modalId + '.html';
      $('#newsModal').load(url,function(result){
        $('#newsModal').modal({show:true});
      });
    }); 
  });

  // show alert bar
  $(window).scroll(function() {
    if ($(document).scrollTop() > 100) {
      $('#alertBar').collapse('show');
      // set alert underneath
      var top = $('#mainNav').outerHeight();
      $('#alertBar').css('top', top + 'px');
    } else {
      $('#alertBar').collapse('hide');
    }
  });

})(jQuery); // End of use strict
