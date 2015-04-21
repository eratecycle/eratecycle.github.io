var Backbone = require('backbone');
var Dropzone = require('dropzone');

var config = require('../config/default');

module.exports = Backbone.View.extend({

  template: require('../templates/file-upload.jst'),

  events: {
    'click button': 'sendFiles'
  },

  initialize: function() {
    Dropzone.autoDiscover = false;
  },

  onRender: function() {
    var self = this;

    // add basic auth creds to all ajax requests
    var creds = sessionStorage.getItem('eratecycle');
    if (creds) {
      creds = JSON.parse(creds);

      this.$('.dropzone').dropzone({

        autoProcessQueue: false,
        uploadMultiple: false,
        parallelUploads: 10,
        maxFiles: 10,
        url: config.apiRoot + '/files',
        headers: { 'Authorization': 'Basic ' + btoa(creds.email + ':' + creds.password) },

        // Dropzone settings
        init: function() {
            self.dropzone = this;
            this.on('sending', function() {
            });
            this.on('success', function(files, response) {
            });
            this.on('complete', function(files, response) {
              console.log('completed');
            });
            this.on('error', function(files, response) {
              console.log('error');
              console.dir(response);
            });
        }
      });
    }
  },

  sendFiles: function(e) {
    e.preventDefault();
    console.dir(this.dropzone);
    this.dropzone.processQueue();
  }

});
