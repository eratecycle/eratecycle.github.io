var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/table-row.jst'),

  serializeData: function() {
    var obj = this.model.toJSON();
    obj.date = obj['INVOICE DATE'];
    obj.serviceId = obj['SERVICE ID'];
    obj.description = obj['SERVICE TYPE'];
    obj.amount = accounting.formatMoney(obj['PREDISCOUNTED CHARGEb']);
    return obj;
  }

});
