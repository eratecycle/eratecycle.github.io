var Backbone = require('backbone');
var        _ = require('underscore');

var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/flot-average.jst'),

  serializeData: function() {
    var amounts = this.model.transactions.pluck('amount');
    var totals = _.reduce(amounts, function(memo, num){ return memo + num; }, 0).toFixed(2);
    return {
      average: accounting.formatMoney(totals/amounts.length)
    }
  }

});
