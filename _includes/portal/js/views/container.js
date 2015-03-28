var Backbone = require('backbone');
var broker = require('backbone.broker');

var FileUploadView = require('./file-upload');

module.exports = Backbone.View.extend({

  initialize: function() {
    this.listenTo(broker.channel('container'),'show', this.showView);
  },

  showView: function(view) {
    this.setView(view);
  }

});
