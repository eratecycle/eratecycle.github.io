var Backbone = require('backbone');
var FileCollection = require('../collections/files');
var FileItemView = require('./file-item');

module.exports = Backbone.View.extend({

  template: require('../templates/file-manager.jst'),

  events: {
    'click #files-all': 'clickAllFiles',
    'click #files-invoices': 'clickInvoices',
    'click #files-forms': 'clickForms'
  },

  initialize: function() {
    this.collection = new FileCollection();
    this.listenTo(this.collection, 'add', this.addItem);
    this.listenTo(this.collection, 'remove', this.removeSubViewForModel);
    this.collection.forEach(this.addItem, this);
  },

  onShow: function() {
    this.collection.fetch();
  },

  addItem: function(model) {
    this.addSubView({
      view: new FileItemView({model:model}),
      selector: '#file-list'
    });
  },

  clickAllFiles: function(evt) {
    evt.preventDefault();
    this.$('#files-all').addClass('active');
    this.$('#files-invoices').removeClass('active');
    this.$('#files-forms').removeClass('active');
  },

  clickInvoices: function(evt) {
    evt.preventDefault();
    this.$('#files-all').removeClass('active');
    this.$('#files-invoices').addClass('active');
    this.$('#files-forms').removeClass('active');
  },

  clickForms: function(evt) {
    evt.preventDefault();
    this.$('#files-all').removeClass('active');
    this.$('#files-invoices').removeClass('active');
    this.$('#files-forms').addClass('active');
  }

});
