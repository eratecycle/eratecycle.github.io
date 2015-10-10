var Backbone = require('backbone');

var ServiceMonthly  = require('../collections/service-monthly');
var TableView       = require('./dashboard/table');
var FlotAverageView = require('./dashboard/flot-average');
var FlotTotalView   = require('./dashboard/flot-total');
var FlotChartView   = require('./dashboard/flot-chart');
var ChartJSView     = require('./dashboard/chart-js');

module.exports = Backbone.View.extend({

  template: require('../templates/dashboard.jst'),

  initialize: function() {
    this.collection = new ServiceMonthly();
  },

  onShow: function() {
    this.addSubView({
      view: new TableView({collection: this.collection}),
      selector: '#table'
    });
    this.addSubView({
      view: new FlotAverageView({collection: this.collection}),
      selector: '#flot-average'
    });
    this.addSubView({
      view: new FlotTotalView({collection: this.collection}),
      selector: '#flot-total'
    });
    this.addSubView({
      view: new FlotChartView({collection: this.collection}),
      selector: '#flot-chart'
    });
    this.addSubView({
      view: new ChartJSView({collection: this.collection}),
      selector: '#chart-js'
    });
    this.collection.fetch();
  }

});
