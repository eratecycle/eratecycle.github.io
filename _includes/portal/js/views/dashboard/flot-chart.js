var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/flot-chart.jst'),

  onShow: function() {
    // flot chart
    var access = this.model.transactions.where({description: 'Access'});
    var d1 = access.map(function(model){
        return [moment(model.get('date')).valueOf(), model.get('amount')];
    });

    var transport = this.model.transactions.where({description: 'Data Transport'});
    var d2 = transport.map(function(model){
      return [moment(model.get('date')).valueOf(), model.get('amount')]
    });
    // console.dir(d1);
    // console.dir(d2);
    // var d1 = [[1262304000000, 6], [1264982400000, 3057], [1267401600000, 20434], [1270080000000, 31982], [1272672000000, 26602], [1275350400000, 27826], [1277942400000, 24302], [1280620800000, 24237], [1283299200000, 21004], [1285891200000, 12144], [1288569600000, 10577], [1291161600000, 10295]];
    // var d2 = [[1262304000000, 5], [1264982400000, 200], [1267401600000, 1605], [1270080000000, 6129], [1272672000000, 11643], [1275350400000, 19055], [1277942400000, 30062], [1280620800000, 39197], [1283299200000, 37000], [1285891200000, 27000], [1288569600000, 21000], [1291161600000, 17000]];

    var data1 = [
        { label: 'Data 1', data: d1, color: '#17a084'},
        { label: 'Data 2', data: d2, color: '#127e68' }
    ];
    if ($('#flot-chart1').length > 0) {
      $.plot($('#flot-chart1'), data1, {
          xaxis: {
              tickDecimals: 0
          },
          series: {
              lines: {
                  show: true,
                  fill: false,
                  fillColor: {
                      colors: [{
                          opacity: 1
                      }, {
                          opacity: 1
                      }]
                  },
              },
              points: {
                  width: 0.1,
                  show: false
              },
          },
          grid: {
              show: false,
              borderWidth: 0
          },
          legend: {
              show: false,
          }
      });
    }
  }

});
