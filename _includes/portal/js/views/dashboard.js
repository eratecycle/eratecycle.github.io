var Backbone = require('backbone');

var TableView       = require('./dashboard/table');
var FlotAverageView = require('./dashboard/flot-average');
var FlotTotalView   = require('./dashboard/flot-total');
var FlotChartView   = require('./dashboard/flot-chart');
var ChartJSView     = require('./dashboard/chart-js');

module.exports = Backbone.View.extend({

  template: require('../templates/dashboard.jst'),

  onShow: function() {
    this.addSubView({
      view: new TableView({collection: this.model.transactions}),
      selector: '#table'
    });
    this.addSubView({
      view: new FlotAverageView({model: this.model}),
      selector: '#flot-average'
    });
    this.addSubView({
      view: new FlotTotalView({model: this.model}),
      selector: '#flot-total'
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
