var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/charges/table-row.jst'),

  serializeData: function() {
    var obj = this.model.toJSON();
    obj.date = obj.invoice_date;
    obj.service_id = obj.service_id ? obj.service_id : '';
    obj.description = obj.service_type;
    obj.amount = accounting.formatMoney(obj.charge_amount);
    return obj;
  }

});
