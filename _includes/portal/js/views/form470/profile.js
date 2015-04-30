var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../../templates/form470/profile.jst'),
  attachToTemplate: false,

  initialize: function() {
    this.listenTo(this.model,'change entity',this.render);
  },

  serializeData: function() {
    return this.model.toJSON();
  }

});
