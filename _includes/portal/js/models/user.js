var Backbone = require('backbone');

var FileCollection = require('../collections/files');

var User = Backbone.Model.extend({

  urlRoot: '/user',

  defaults: {
    firstName: '',
    lastName: ''
  },

  initialize: function() {
    this.files = new FileCollection();
  },

  parse: function(data, options) {
    if (data.files) {
      this.files.add(data.files,{merge: true});
      delete data.files;
    }
    return data;
  }

});

module.exports = new User();
