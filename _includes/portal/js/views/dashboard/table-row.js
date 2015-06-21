var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/table-row.jst'),

  serializeData: function() {
    var obj = this.model.toJSON();
    obj.amount = accounting.formatMoney(obj.amount);
    return obj;
  }

});
