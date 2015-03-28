var Backbone = require('backbone');
Backbone.$ = window.$;
var composer = require('backbone.composer');

var MainView = require('./views/main');

$(document).ready(function () {
  Backbone.View.prototype.attachToTemplate = true;
  var mainView = new MainView({el: 'body'});
});
