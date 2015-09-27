var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/table-row.jst'),

  serializeData: function() {
    var obj = this.model.toJSON();
    obj.description = obj.charge_type;
    obj.amount = accounting.formatMoney(obj.sum);
    return obj;
  }

});
