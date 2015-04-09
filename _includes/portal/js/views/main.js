var Backbone = require('backbone');

var NavView = require('./nav');
var TopNavView = require('./top-nav');
var ContainerView = require('./container');
var FooterView = require('./footer');
var user = require('../models/user');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.addSubView({
      view: new NavView({model: user}),
      selector: '#wrapper',
      location: 'prepend'
    });

    this.addSubView({
      view: new TopNavView(),
      selector: '#page-wrapper'
    });

    this.addSubView({
      view: new ContainerView(),
      selector: '#page-wrapper'
    });

    this.addSubView({
      view: new FooterView(),
      selector: '#page-wrapper'
    });
  }
});
