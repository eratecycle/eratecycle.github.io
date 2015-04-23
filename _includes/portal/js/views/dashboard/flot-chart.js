var Backbone = require('backbone');
var moment = require('moment');
var _ = require('underscore');

module.exports = Backbone.View.extend({

    template: require('../../templates/dashboard/flot-chart.jst'),

    onShow: function() {
      var access = this.model.transactions.where({description: 'Access'});
      var transport = this.model.transactions.where({description: 'Data Transport'});

      var accessTotal = _.reduce(access, function(memo, trans){
        return memo + trans.get('amount');
      }, 0).toFixed(2);

      var transportTotal = _.reduce(transport, function(memo, trans){
        return memo + trans.get('amount');
      }, 0).toFixed(2);

      var doughnutData = [
        {
          value: transportTotal,
          color:"rgba(220,220,220,0.5)",
          label: "Data Transport"
        },
        {
          value: accessTotal,
          color: "rgba(26,179,148,0.5)",
          label: "Access"
        }
      ];

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
