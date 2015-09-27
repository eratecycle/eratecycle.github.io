var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.View.extend({

  template: require('../templates/file-item.jst'),

  events: {
    'click .file-remove': 'clickRemove'
  },

  initialize: function() {
    this.listenTo(this.model,'change',this.render);
  },

  serializeData: function() {
    return {
      fileName: this.model.get('file_name'),
      fileNameEncoded: encodeURIComponent(this.model.get('file_name')),
      dateAdded: moment(this.model.get('date_added')).format('MMM D, YYYY')
    }
  },

  clickRemove: function(evt) {
    evt.preventDefault();
    console.log('unimplemented remove');
  }

});
