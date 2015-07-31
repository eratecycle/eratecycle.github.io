var Backbone = require('backbone');
var FileItemView = require('./file-item');

module.exports = Backbone.View.extend({

  template: require('../templates/file-manager.jst'),

  events: {
    'click #files-all': 'clickAllFiles',
    'click #files-invoices': 'clickInvoices',
    'click #files-forms': 'clickForms'
  },

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
  },

  clickAllFiles: function(evt) {
    evt.preventDefault();
    console.log('clickAllFiles');
  },

  clickInvoices: function(evt) {
    evt.preventDefault();
    console.log('clickInvoices');
  },

  clickForms: function(evt) {
    evt.preventDefault();
    console.log('clickForms');
  }

});
