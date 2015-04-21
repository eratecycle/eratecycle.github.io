var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.View.extend({

  template: require('../templates/file-item.jst'),

  initialize: function() {
    this.listenTo(this.model,'change',this.render);
  },

  serializeData: function() {
    return {
      fileName: this.model.get('originalname'),
      dateAdded: moment(this.model.get('dateAdded')).format('MMM D, YYYY')
    }
  }

});
