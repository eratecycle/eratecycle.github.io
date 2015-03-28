var Backbone = require('backbone');
var header = require('../templates/nav-header.jst');

module.exports = Backbone.View.extend({
  template: require('../templates/nav.jst'),
  attachToTemplate: true,

  initialize: function(){
    var pageId = $('[data-page]').attr('data-page');
    if (pageId) {
      $('#nav-'+pageId).addClass('active');
    }

    this.listenTo(this.model, 'change', this.render);
  },

  onRender: function() {
    if($("body").hasClass('fixed-sidebar')) {
        this.$('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
        });
    }
    this.$('#side-menu').prepend(header(this.model.toJSON()));
  }

});
