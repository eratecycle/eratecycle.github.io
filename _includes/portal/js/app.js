var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var MainView = require('./views/main');

var mainView = new MainView({el: 'body'});
