var Backbone = require('backbone');
var moment = require('moment');
var _ = require('underscore');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/chart-js.jst'),

  initialize: function(){
    this.access = _.where(this.model.transactions.toJSON(), {description: 'Access'});
    this.transport = _.where(this.model.transactions.toJSON(), {description: 'Data Transport'});
  },

  serializeData: function() {
    var accessTotal = _.reduce(this.access, function(memo, trans){
      return memo + trans.amount;
    }, 0).toFixed(2);

    var transportTotal = _.reduce(this.transport, function(memo, trans){
      return memo + trans.amount;
    }, 0).toFixed(2);

    return {
      totalAccess: accounting.formatMoney(accessTotal),
      totalTransport: accounting.formatMoney(transportTotal)
    }
  },

  onShow: function() {
    var labels = this.access.map(function(trans){
      return moment(trans.date).format('MMMM');
    });

    var lineData = {
      labels: labels,
      datasets: [
        {
          label: 'Example dataset',
          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: _.pluck(this.transport, 'amount')
        },
        {
          label: 'Example dataset',
          fillColor: 'rgba(26,179,148,0.5)',
          strokeColor: 'rgba(26,179,148,0.7)',
          pointColor: 'rgba(26,179,148,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(26,179,148,1)',
          data: _.pluck(this.access, 'amount')
        }
      ]
    };

    var lineOptions = {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      responsive: true,
    };

    var doughnutData = [
      {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
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
      percentageInnerCutout : 50, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : "easeOutBounce",

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,
    };

    if (this.$('#lineChart').length > 0) {
      var ctx = this.$('#lineChart')[0].getContext('2d');
      var myNewChart = new Chart(ctx).Line(lineData, lineOptions);
    }
  }

});
