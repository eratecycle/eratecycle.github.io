var Backbone = require('backbone');
var broker = require('backbone.broker');

module.exports = Backbone.View.extend({
  template: require('../templates/nav.jst'),

  initialize: function(){

    // Minimalize menu when screen is less than 768px
    $(window).bind('load resize', function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small');
        } else {
            $('body').removeClass('body-small');
        }
    });

    this.listenTo(broker.channel('nav'), 'select', this.highlightSelection);
    this.listenTo(broker.channel('nav'), 'toggle', this.toggleNav);
    this.listenTo(this.model, 'change', this.render);
  },

  serializeData: function() {
    return this.model.toJSON();
  },

  onShow: function() {
    // unComment this only when you have a fixed-sidebar
    if ($('body').hasClass('fixed-sidebar')) {
        this.$('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
        });
    }
  },

  highlightSelection: function(pageId){
    this.$('li').removeClass('active');
    this.$('#nav-'+pageId).addClass('active');
  },

  toggleNav: function() {
    $('body').toggleClass('mini-navbar');

    var fadeInSideMenu = function() {
      this.$('#side-menu').fadeIn(500);
    }.bind(this);

    var fadeOutSideMenu = function() {
      this.$('#side-menu').fadeOut(500);
    }.bind(this);

    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        this.$('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(fadeInSideMenu, 100);
    } else if ($('body').hasClass('fixed-sidebar')){
        this.$('#side-menu').hide();
        setTimeout(fadeOutSideMenu, 300);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        this.$('#side-menu').removeAttr('style');
    }
  },

  onClose: function() {
    $(window).off('load resize');
  }

});
