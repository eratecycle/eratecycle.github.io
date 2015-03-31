var Backbone = require('backbone');
var TableView = require('./dashboard/table');
var FlotChartView = require('./dashboard/flot-chart');
var ChartJSView = require('./dashboard/chart-js');

module.exports = Backbone.View.extend({

  template: require('../templates/dashboard.jst'),

  onShow: function() {
    this.addSubView({view: new TableView, selector: '#table'})
    this.addSubView({view: new FlotChartView, selector: '#flot-chart'})
    this.addSubView({view: new ChartJSView, selector: '#chart-js'})
  }

});
