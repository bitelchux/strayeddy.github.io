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
    if(!$("#mainNav").hasClass("stay-shrinked")) {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
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

  // privacy modal
  $(document).ready(function(){
    $('a[href="#privacyPolicyModal"]').click(function(e) {
      var url = '/privacy/privacy-' + $('html').attr('lang') + '.html';
      $('#privacyPolicyModal').load(url,function(result){
        $('#privacyPolicyModal').modal({show:true});
      });
    }); 
  });

  // hide show more button when showing more content
  $( ".show-more-button" ).click(function() {
    $('.show-more-button').hide();
  });

  // french users
  var checkPopupExist = setInterval(function() {
    
    if ($('#PopupSignupForm_0').length) {
      $("iframe").contents().find("#mc-LANGUAGE").val("EN");

      // translate mailchimp popup in french
      if($('html').attr('lang')=='fr') {
        $("iframe").contents().find("#mc-LANGUAGE").val("FR");

        $("iframe").contents().find(".content__titleDescription span span").text('JOIGNEZ NOTRE INFO-LETTRE');
        $("iframe").contents().find(".content__titleDescription div:eq(1)").text('Inscrivez-vous gratuitement aujourd\'hui et soyez le premier à être informé des événements et des promotions.');
        $("iframe").contents().find("label").text('Adresse Email');
        $("iframe").contents().find(".content__button input").val('Abonnez-vous Maintenant');

        // Check submit
        $("iframe").contents().find(".content__button").click(function(){
          // french users
          var checkSuccessPopupExist = setInterval(function() {
            
            if ($("iframe").contents().find(".popup-signup-success").length) {
              $("iframe").contents().find(".popup-signup-success").text('MERCI DE VOUS ÊTRE ABONNÉ!');
              clearInterval(checkSuccessPopupExist);
            }
          }, 100);
        });
      }
      
      // Hide language field
      $("iframe").contents().find("#uniqName_3_1").hide();

      clearInterval(checkPopupExist);
    }
  }, 100);

  // replace share-buttons with html
  $("[data-share-buttons]").load("/templates/share-buttons.html", function() {
    var url = ($(this).data("share-buttons")) ? $(this).data("share-buttons") : window.location;
    $(this).find("a").each(function(){
      this.href = this.href.replace('#currentUrl', url);
    });
  });


})(jQuery); // End of use strict

