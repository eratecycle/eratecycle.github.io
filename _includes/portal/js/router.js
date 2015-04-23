var Backbone = require('backbone');
var broker = require('backbone.broker');

var DashboardView = require('./views/dashboard');
var FileUploadView = require('./views/file-upload');
var FileManagerView = require('./views/file-manager');

var user = require('./models/user');
var container = broker.channel('container');
var nav = broker.channel('nav');

module.exports = Backbone.Router.extend({
  routes: {
    '': function() {
      container.publish('show', new DashboardView({model: user}));
      nav.publish('select', 'dashboard');
    },
    'file-manager': function() {
      container.publish('show', new FileManagerView({collection: user.files}));
      nav.publish('select', 'file-manager');
    },
    'file-upload': function() {
      container.publish('show', new FileUploadView());
      nav.publish('select', 'file-manager');
    }
  },

});
