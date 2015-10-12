var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../../templates/entity/profile.jst'),
  attachToTemplate: false,

  initialize: function() {
    this.listenTo(this.model,'change entity',this.render);
  },

  serializeData: function() {
    return this.model.toJSON();
  }

});
