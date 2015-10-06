var Backbone = require('backbone');
var _ = require('underscore');
var accounting = require('accounting');

module.exports = Backbone.Model.extend({
  idAttribute: '_id',

  toJSON: function() {
    var json = _.clone(this.attributes);
    json.charge_amount = accounting.toFixed(json.charge_amount/100,2);
    json.tax_amount = accounting.toFixed(json.tax_amount/100,2);
    return json;
  }

});
