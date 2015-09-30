var Backbone = require('backbone');
var        _ = require('underscore');

var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/filing/flot-total.jst'),

  initialize: function() {
    this.listenTo(this.collection,'sync',this.showChart);
  },

  showChart: function() {
    this.render();
    this.onShow();
  },

  onShow: function() {
    var barData = {
      labels: _.map(this.collection.pluck('rate'),function(rate){
        return accounting.formatMoney(rate);
        // return rate.toFixed(2)
      }),
      datasets: [{
        label: "Count By Rate",
        fillColor: "rgba(26,179,148,0.5)",
        strokeColor: "rgba(26,179,148,0.8)",
        highlightFill: "rgba(26,179,148,0.75)",
        highlightStroke: "rgba(26,179,148,1)",
        data: this.collection.pluck('count')
      }]
    };

    var barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        responsive: true,
    }

    if (this.$('#barChart').length > 0) {
      var ctx = this.$('#barChart')[0].getContext('2d');
      var myNewChart = new Chart(ctx).Bar(barData, barOptions);
    }
    // $.plot(this.$("#flot-bar-chart"), [barData], barOptions);
  }

});
