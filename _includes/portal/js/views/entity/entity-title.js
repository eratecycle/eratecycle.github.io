var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({

  template: require('../../templates/entity/entity-title.jst'),

  initialize: function() {
    this.listenTo(this.model,'change entity',this.render);
  },

  serializeData: function() {
    var defaults = {
      identifier: '',
      name: '',
      contact: ''
    };
    return _.extend(defaults, this.model.get('entity'));
  }

});
