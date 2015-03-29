var Backbone = require('backbone');
var broker = require('backbone.broker');

var header = require('../templates/nav-header.jst');

module.exports = Backbone.View.extend({
  template: require('../templates/nav.jst'),

  initialize: function(){
    this.listenTo(broker.channel('nav'), 'select', this.highlightSelection);
    this.listenTo(this.model, 'change', this.render);
  },

  onRender: function() {
    if($('body').hasClass('fixed-sidebar')) {
        this.$('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
        });
    }
    this.$('#side-menu').prepend(header(this.model.toJSON()));
  },

  highlightSelection: function(pageId){
    this.$('li').removeClass('active');
    this.$('#nav-'+pageId).addClass('active');
  }

});
