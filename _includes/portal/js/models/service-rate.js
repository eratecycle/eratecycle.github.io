var Backbone = require('backbone');
var _ = require('underscore');
var accounting = require('accounting');

module.exports = Backbone.Model.extend({
  toJSON: function() {
    var json = _.clone(this.attributes);
    json.rate = accounting.toFixed(json.rate/100,2);
    return json;
  }

});
