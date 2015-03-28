var Backbone = require('backbone');

var NavView = require('./nav');
var UserModel = require('../models/user');

module.exports = Backbone.View.extend({
  initialize: function(){
    console.log('it worked');

    this.addSubView({
      view: new NavView({model: new UserModel()}),
      selector: '#wrapper',
      location: 'prepend'
    });
  }
});
