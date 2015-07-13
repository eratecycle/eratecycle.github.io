var Backbone = require('backbone');
var _ = require('underscore');
var accounting = require('accounting');

var TableView = require('./dashboard/table');
var FlotChartView = require('./dashboard/flot-chart');
var ChartJSView = require('./dashboard/chart-js');

module.exports = Backbone.View.extend({

  template: require('../templates/dashboard.jst'),

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
      view: new TableView({collection: this.model.transactions}),
      selector: '#table'
    });
    this.addSubView({
      view: new FlotChartView({model: this.model}),
      selector: '#flot-chart'
    });
    this.addSubView({
      view: new ChartJSView({model: this.model}),
      selector: '#chart-js'
    });
  }

});
