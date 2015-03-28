var Backbone = require('backbone');
var composer = require('backbone.composer');
var broker = require('backbone.broker');

var Router = require('./router');
var MainView = require('./views/main');

Backbone.$ = window.$;

$(document).ready(function () {

  Backbone.View.prototype.attachToTemplate = true;
  var mainView = new MainView({el: 'body'});
  var router = new Router();

  broker.start();
  Backbone.history.start();
});
