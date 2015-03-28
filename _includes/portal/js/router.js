var Backbone = require('backbone');
var broker = require('backbone.broker');

var DashboardView = require('./views/dashboard');
var FileUploadView = require('./views/file-upload');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'showDashboard'
  },

  showDashboard: function() {
    broker.channel('container').publish('show', new DashboardView());
  }
});
