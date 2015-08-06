var Backbone = require('backbone');
var        _ = require('underscore');

var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/flot-total.jst'),

  serializeData: function() {
    var amounts = this.model.transactions.pluck('amount');
    var totals = _.reduce(amounts, function(memo, num){ return memo + num; }, 0).toFixed(2);
    return {
      total: accounting.formatMoney(totals)
    }
  },

});
