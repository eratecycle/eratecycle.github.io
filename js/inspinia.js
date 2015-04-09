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

    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
      if (location.hostname.indexOf('localhost') !== -1) {
        options.url = 'http://localhost:9010' + options.url;
      } else {
        options.url = 'http://eratecycle.herokuapp.com' + options.url;
      }
    });

});

// Activate WOW.js plugin for animation on scrol
new WOW().init();
