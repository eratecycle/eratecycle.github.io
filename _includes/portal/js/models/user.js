var Backbone = require('backbone');

var User = Backbone.Model.extend({

  urlRoot: '/user',

  defaults: {
    firstName: '',
    lastName: ''
  }

});

module.exports = new User();
