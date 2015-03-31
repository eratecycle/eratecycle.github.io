var Backbone = require('backbone');
var Dropzone = require('dropzone');

module.exports = Backbone.View.extend({

  template: require('../templates/file-upload.jst'),

  onShow: function() {
    var myDropZone = new Dropzone('.dropzone', {

      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 10,
      maxFiles: 10,

      // Dropzone settings
      init: function() {
          var myDropzone = this;

          this.element.querySelector('button[type=submit]').addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              myDropzone.processQueue();
          });
          this.on('sendingmultiple', function() {
          });
          this.on('successmultiple', function(files, response) {
          });
          this.on('errormultiple', function(files, response) {
          });
      }
    });
  }

});
