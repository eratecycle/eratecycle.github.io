var Backbone = require('backbone');
var moment = require('moment');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/table-row.jst'),

  serializeData: function() {
    var obj = this.model.toJSON();
    obj.date = moment(obj.date, 'YYYYMMDD').format('MM/DD/YY');
    obj.description = obj.charge_type;
    obj.amount = accounting.formatMoney(obj.sum);
    return obj;
  }

});
