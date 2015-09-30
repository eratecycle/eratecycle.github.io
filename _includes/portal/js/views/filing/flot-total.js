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

  serializeData: function() {
    var results = {
      amounts: 0,
      totals: 0
    }
    if (this.model) {
      results.amounts = this.model.transactions.pluck('amount');
      results.totals = _.reduce(amounts, function(memo, num){ return memo + num; }, 0).toFixed(2);
    }
    results.total = accounting.formatMoney(results.totals);
    return results;
  },

  onShow: function() {
    var barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
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
