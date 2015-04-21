var Backbone = require('backbone');
var composer = require('backbone.composer');
var broker = require('backbone.broker');

var config = require('./config/default');
var user = require('./models/user');
var Router = require('./router');
var MainView = require('./views/main');

Backbone.$ = window.$;
Backbone.View.prototype.attachToTemplate = true;

$(document).ready(function () {

  // send all ajax request to the correct backbend api server
  $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.url = config.apiRoot + options.url;
  });

  // if we get a 401 from any request immediatly log off
  $(document).ajaxComplete(function(e, xhr, settings) {
    if (xhr.status == 401) {
      location.href = '/login';
    }
  });

  // add basic auth creds to all ajax requests
  var creds = sessionStorage.getItem('eratecycle');
  if (creds) {
    creds = JSON.parse(creds);
    $.ajaxSetup({
      headers: { 'Authorization': 'Basic ' + btoa(creds.email + ':' + creds.password) }
    });
  }

  user.fetch();

  var mainView = new MainView({el: 'body'});
  var router = new Router();

  broker.start();
  Backbone.history.start();
});
