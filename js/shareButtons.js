(function($) {
  "use strict"; // Start of use strict

  // Setup share buttons href
  $('#shareButtons a').each(function(){
    this.href = this.href.replace('#currentUrl', window.location);
  });

})(jQuery); // End of use strict
