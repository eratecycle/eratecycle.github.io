var Backbone = require('backbone');
var _ = require('underscore');

var EntitySearch = require('../../collections/entities');
var AccountRowView = require('./account-row');

module.exports = Backbone.View.extend({

  template: require('../../templates/entity/account.jst'),
  attachToTemplate: false,

  events: {
    'click #entity-search': 'entitySearch'
  },

  initialize: function() {
    this.entityCollection = new EntitySearch();
    this.listenTo(this.entityCollection, 'add', this.addRow);
    this.listenTo(this.entityCollection, 'remove', this.removeSubViewForModel);
  },

  addRow: function(model) {
    this.addSubView({
      view: new AccountRowView({model:model, user: this.model}),
      selector: 'tbody'
    });
  },

  entitySearch: function(e) {
    e.preventDefault();
    this.model.set('zipCode', this.$('#zipCode').val());
    this.entityCollection
    .fetch({
      data: {
        zipCode: this.model.get('zipCode')
      }
    })
    .done(function(){
      this.trigger('resize');
    }.bind(this));
  }

});
