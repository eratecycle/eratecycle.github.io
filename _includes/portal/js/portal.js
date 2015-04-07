var Backbone = require('backbone');
var composer = require('backbone.composer');
var broker = require('backbone.broker');

var user = require('./models/user');
var Router = require('./router');
var MainView = require('./views/main');

Backbone.$ = window.$;
Backbone.View.prototype.attachToTemplate = true;

$(document).ready(function () {

  $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    if (location.hostname.indexOf('localhost') !== -1) {
      options.url = 'http://localhost:9010' + options.url;
    } else {
      options.url = 'http://eratecycle.herokuapp.com' + options.url;
    }
  });

  var creds = sessionStorage.getItem('eratecycle');
  if (creds) {
    creds = JSON.parse(creds);
    $.ajaxSetup({
        headers: { 'Authorization': 'Basic ' + btoa(creds.email + ':' + creds.password) }
    });
  }

  var mainView = new MainView({el: 'body'});
  var router = new Router();

  user.fetch().fail(function(xhr, textStatus, err){
    if (xhr.status == 401) {
      location.href = '/login';
    }
  });
  broker.start();
  Backbone.history.start();
});
