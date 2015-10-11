var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../../templates/form470/entity-title.jst'),

  initialize: function() {
    this.listenTo(this.model,'change entity',this.render);
  },

  serializeData: function() {
    return {
      title: this.model.get('entity') ? this.model.get('entity').name : 'Entity'
    }
  }

});
