var Backbone = require('backbone');
var moment = require('moment');
var _ = require('underscore');
var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/chart-js.jst'),

  initialize: function() {
    this.listenTo(this.collection,'sync',this.showChart);
  },

  showChart: function() {
    this.render();
    this.onShow();
  },

  serializeData: function() {
    var charges = _.chain(this.collection.toJSON()).pluck('charge_type').unique().value();

    this.charges = _.map(charges, function(charge){
      var result = {
        label: charge,
        transactions: _.where(this.collection.toJSON(),{charge_type: charge}),
      };
      result.total = _.reduce(result.transactions, function(memo, trans){
        return memo + trans.sum;
      }, 0);
      return result;
    }, this);

    var overallTotal = _.reduce(this.charges, function(memo, charge){
      return memo + charge.total;
    },0);

    return {
      charges: _.map(this.charges, function(charge){
        charge.avg = (100 * charge.total / overallTotal);
        return charge;
      })
    }
  },

  onShow: function() {
    if (!this.charges || this.charges.length === 0) {
      return
    }

    var labels = _.map(this.charges[0].transactions, function(trans){
      var date = trans.date.substr(4,2) + '/' + trans.date.substr(6, 2) + '/' + trans.date.substr(0,4);
      return moment(date).format('MMMM');
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
          data: _.pluck(this.charges[0].transactions, 'sum')
        },
        {
          label: 'Example dataset',
          fillColor: 'rgba(26,179,148,0.5)',
          strokeColor: 'rgba(26,179,148,0.7)',
          pointColor: 'rgba(26,179,148,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(26,179,148,1)',
          data: _.pluck(this.charges[1].transactions, 'sum')
        },
        {
          label: 'Example dataset',
          fillColor: 'rgba(126,79,148,0.5)',
          strokeColor: 'rgba(126,79,148,0.7)',
          pointColor: 'rgba(126,79,148,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(126,79,148,1)',
          data: _.pluck(this.charges[2].transactions, 'sum')
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
