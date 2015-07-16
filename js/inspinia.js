// INSPINIA Landing Page Custom scripts
$(document).ready(function () {

    // Highlight the top nav as scrolling
    // $('body').scrollspy({
    //     target: '.navbar-fixed-top',
    //     offset: 80
    // })

    // Page scrolling feature
    $('a.page-scroll').bind('click', function(event) {
        var link = $(this);
        var href = link.attr('href');
        href = href.substring(href.indexOf('#'));
        if (href.length > 0) {
          $('html, body').stop().animate({
              scrollTop: $(href).offset().top - 70
          }, 500);
          event.preventDefault();
        }
    });

    var pageId = $('[data-page]').attr('data-page');
    if (pageId) {
      $('#nav-'+pageId).addClass('active');
      $('#nav-'+pageId+' a').attr('href', '#page-top');
    }

});

// Activate WOW.js plugin for animation on scrol
new WOW().init();
