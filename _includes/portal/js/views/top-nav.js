var Backbone = require('backbone');
var broker = require('backbone.broker');

module.exports = Backbone.View.extend({

  template: require('../templates/top-nav.jst'),

  events: {
    'click .navbar-minimalize': 'toggleNavBar'
  },

  toggleNavBar: function() {
    broker.channel('nav').publish('toggle');
  }

});
