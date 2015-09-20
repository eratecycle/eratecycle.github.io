var Backbone = require('backbone');
var _ = require('underscore');
var accounting = require('accounting');

var TableView = require('./charges/table');

module.exports = Backbone.View.extend({

  template: require('../templates/charges.jst'),

  serializeData: function() {
    var amounts = this.model.transactions.pluck('amount');
    var totals = _.reduce(amounts, function(memo, num){ return memo + num; }, 0).toFixed(2);
    return {
      average: accounting.formatMoney(totals/amounts.length),
      total: accounting.formatMoney(totals)
    }
  },

  onShow: function() {
    this.addSubView({
      view: new TableView(),
      selector: '#table'
    });
  }

});
