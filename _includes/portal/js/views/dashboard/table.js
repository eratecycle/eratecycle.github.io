var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/table.jst'),

  events: {
    'click .collapse-link': 'collapseIBox',
    'click .close-link': 'close'
  },

  collapseIBox: function(event) {
    // Collapse ibox function
    var collapseLink = this.$('.collapse-link');
    var ibox = collapseLink.closest('div.ibox');
    var button = collapseLink.find('i');
    var content = ibox.find('div.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
    }, 50);
  },

  onShow: function() {
    this.$('span.pie').peity('pie', {
        fill: ['#1ab394', '#d7d7d7', '#ffffff']
    });

    this.$('.line').peity('line',{
        fill: '#1ab394',
        stroke:'#169c81',
    });

    this.$('.bar').peity('bar', {
        fill: ['#1ab394', '#d7d7d7']
    });

    this.$('.bar_dashboard').peity('bar', {
        fill: ['#1ab394', '#d7d7d7'],
        width:100
    });

    var updatingChart = this.$('.updating-chart').peity('line', { fill: '#1ab394',stroke:'#169c81', width: 64 });

    var random = Math.round(Math.random() * 10);
    var values = updatingChart.text().split(',');
    values.shift();
    values.push(random);

    updatingChart.text(values.join(',')).change();

  }

});
