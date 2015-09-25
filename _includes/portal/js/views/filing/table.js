var Backbone = require('backbone');
var _ = require('underscore');
var ServiceCollection = require('../../collections/services');
var RateCollection = require('../../collections/service-rates');
var AverageView = require('./flot-average');
var TotalView = require('./flot-total');
var TableRowView = require('./table-row');

module.exports = Backbone.View.extend({

  template: require('../../templates/filing/table.jst'),

  events: {
    'click .collapse-link': 'collapseIBox',
    'click .close-link': 'close',
    'change #service': 'loadCharges'
  },

  initialize: function() {
    this.services = new ServiceCollection();
    this.listenTo(this.services, 'add', this.addServiceToSelect);

    this.charges = new RateCollection();
    this.listenTo(this.charges, 'add', this.addItem);
    this.listenTo(this.charges, 'remove', this.removeSubViewForModel);

    this.addSubView({
      selector: '#average-chart',
      view: new AverageView({collection: this.charges})
    });

    this.addSubView({
      selector: '#total-chart',
      view: new TotalView({collection: this.charges})
    });
  },

  onRender: function() {
    this.services.fetch();
  },

  loadCharges: function(event) {
    this.charges.fetch({data: {code: parseInt(event.target.value)}});
  },

  addItem: function(model) {
    this.addSubView({
      view: new TableRowView({model:model}),
      selector: 'tbody'
    });
  },

  addServiceToSelect: function(model) {
    var tpl = _.template('<option value="<%=id%>"><%=label%></option>');
    this.$('#service').append(tpl(model.toJSON()));
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
        ibox.find('[id^=map').resize();
    }, 50);
  }
});
