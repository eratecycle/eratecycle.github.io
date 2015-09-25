var Backbone = require('backbone');
var        _ = require('underscore');

var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/filing/flot-average.jst'),

  serializeData: function() {
    var results = {
      amounts: 0,
      totals: 0
    }
    if (this.model) {
      results.amounts = this.model.transactions.pluck('amount');
      results.totals = _.reduce(amounts, function(memo, num){ return memo + num; }, 0).toFixed(2);
    }
    results.average = accounting.formatMoney(results.totals/results.amounts.length);
    return results;
  }

});
