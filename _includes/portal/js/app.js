var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MainView = require('./views/main');
var NavView = require('./views/nav');
var UserModel = require('./models/user');

$(document).ready(function () {
  var navView = new NavView({el: 'nav', model: new UserModel()});
  var mainView = new MainView({el: 'body'});
});
