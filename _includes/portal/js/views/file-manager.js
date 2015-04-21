var Backbone = require('backbone');
var FileItemView = require('./file-item');

module.exports = Backbone.View.extend({

  template: require('../templates/file-manager.jst'),

  initialize: function() {
    this.listenTo(this.collection,'add',this.addItem);
    this.listenTo(this.collection,'remove',this.removeSubViewForModel);
    this.collection.forEach(this.addItem, this);
  },

  addItem: function(model) {
    this.addSubView({
      view: new FileItemView({model:model}),
      selector: '#file-list'
    });
  }

});
