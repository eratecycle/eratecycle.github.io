var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../../templates/form470/account-row.jst'),

  events: {
    'click': 'rowSelect',
    'change input': 'entitySelected'
  },

  initialize: function(options) {
    this.user = options.user;

    this.listenTo(this.model,'change',this.render);
  },

  serializeData: function() {
    return this.model.toJSON();
  },

  rowSelect: function() {
    this.$('input').prop('checked', true);
    this.entitySelected();
  },

  entitySelected: function() {
    this.user.set('entity', this.model.toJSON());
  }

});
