var Backbone = require('backbone');
var broker = require('backbone.broker');

var DashboardView = require('./views/dashboard');
var FileUploadView = require('./views/file-upload');
var EntityView = require('./views/entity');
var EntityAddView = require('./views/entity/index');
var ChargesView = require('./views/charges');
var FilingView = require('./views/filing');
var FileManagerView = require('./views/file-manager');
var ProfileView = require('./views/profile');
var ContactsView = require('./views/contacts');
var MailboxView = require('./views/mailbox');

var user = require('./models/user');
var container = broker.channel('container');
var nav = broker.channel('nav');

module.exports = Backbone.Router.extend({
  routes: {
    ''             : 'homeRoute',
    'entity/list'  : 'showEntityList',
    'entity/add'   : 'showEntityAdd',
    'dashboard'    : 'showDashboard',
    'file-manager' : 'showFileManager',
    'file-upload'  : 'showFileUpload',
    'filing'       : 'showFilingTool',
    'charges'      : 'showChargesTool',
    'profile'      : 'showProfile',
    'contacts'     : 'showContacts',
    'mailbox'      : 'showMailbox',
    'notifications': 'showNotifications'
  },

  homeRoute: function() {
    if (user.get('entities') && user.get('entities').length > 0) {
      this.showEntityList();
    } else {
      this.showEntityAdd();
    }
  },

  showDashboard: function() {
    user.fetch().done(function(){
      container.publish('show', new DashboardView({model: user}));
      nav.publish('select', 'dashboard');
    });
  },

  showEntityList: function() {
    container.publish('show', new EntityView({model: user}));
    nav.publish('select', 'entity-list');
  },

  showEntityAdd: function() {
    container.publish('show', new EntityAddView({model: user}));
  },

  showFilingTool: function() {
    container.publish('show', new FilingView({model: user}));
    nav.publish('select', 'filing');
  },

  showChargesTool: function() {
    container.publish('show', new ChargesView({model: user}));
    nav.publish('select', 'charges');
  },

  showFileManager: function() {
    container.publish('show', new FileManagerView());
    nav.publish('select', 'file-manager');
  },

  showFileUpload: function() {
    container.publish('show', new FileUploadView());
    nav.publish('select', 'file-manager');
  },

  showProfile: function() {
    container.publish('show', new ProfileView());
  },

  showContacts: function() {
    container.publish('show', new ContactsView());
  },

  showMailbox: function() {
    container.publish('show', new MailboxView());
  },

  showNotifications: function() {
    container.publish('show', new NotificationsView());
  }

});
