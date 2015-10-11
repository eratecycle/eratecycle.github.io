var Backbone = require('backbone');
var accounting = require('accounting');
var moment = require('moment');

module.exports = Backbone.View.extend({

  template: require('../../templates/form470/table-row.jst'),

  serializeData: function() {
    var obj = this.model.toJSON();
    obj.date = moment(obj.invoice_date, 'YYYYMMDD').format('MM/DD/YY');
    obj.service_id = obj.service_id ? obj.service_id : '';
    obj.description = obj.service_type;
    obj.amount = accounting.formatMoney(obj.charge_amount);
    return obj;
  }

});
