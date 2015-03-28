var Backbone = require('backbone');
var header = require('../templates/nav-header.jst');

module.exports = Backbone.View.extend({

  initialize: function(){
    var pageId = $('[data-page]').attr('data-page');
    if (pageId) {
      $('#nav-'+pageId).addClass('active');
    }

    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function() {
    this.$('#side-menu').prepend(header(this.model.toJSON()));
    return this;
  }

});
