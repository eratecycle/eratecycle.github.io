var Backbone = require('backbone');
var moment = require('moment');
var _ = require('underscore');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/flot-chart.jst'),

  initialize: function() {
    this.listenTo(this.collection,'sync',this.showChart);
  },

  showChart: function() {
    var colors = [
      'rgba(220,220,220,0.5)',
      'rgba(26,179,148,0.5)',
      'rgba(126,79,148,0.5)',
      'rgba(26,179,48,0.5)'
    ];

    var charges = _.chain(this.collection.toJSON()).pluck('charge_type').unique().value();

    var doughnutData = _.map(charges, function(charge,idx){
      var charges = this.collection.where({charge_type: charge});
      var total = _.reduce(charges, function(memo, trans){
        return memo + trans.get('sum');
      }, 0).toFixed(2);
      return {
        value: total,
        color: colors[idx],
        label: charge
      }
    }, this);

    var doughnutOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,
      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 0, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps : 100,
      //String - Animation easing effect
      animationEasing : "easeOutBounce",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,
    };

    if (this.$('#flot-chart-content').length > 0) {
      var ctx = this.$('#flot-chart-content')[0].getContext('2d');
      var myNewChart = new Chart(ctx).Pie(doughnutData, doughnutOptions);
    }
  }

});
