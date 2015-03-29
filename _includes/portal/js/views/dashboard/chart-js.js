var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/chart-js.jst'),

  onShow: function() {
    var lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Example dataset',
              fillColor: 'rgba(220,220,220,0.5)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: [65, 59, 40, 51, 36, 25, 40]
          },
          {
              label: 'Example dataset',
              fillColor: 'rgba(26,179,148,0.5)',
              strokeColor: 'rgba(26,179,148,0.7)',
              pointColor: 'rgba(26,179,148,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(26,179,148,1)',
              data: [48, 48, 60, 39, 56, 37, 30]
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

    if (this.$('#lineChart').length > 0) {
      var ctx = this.$('#lineChart')[0].getContext('2d');
      var myNewChart = new Chart(ctx).Line(lineData, lineOptions);
    }
  }

});
