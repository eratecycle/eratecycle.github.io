var Backbone = require('backbone');
var _ = require('underscore');
var LocationCollection = require('../../collections/locations');
var ChargeCollection = require('../../collections/charges');
var TableRowView = require('./table-row');

module.exports = Backbone.View.extend({

  template: require('../../templates/charges/table.jst'),

  events: {
    'click .collapse-link': 'collapseIBox',
    'click .close-link': 'close',
    'change #location': 'loadCharges'
  },

  initialize: function() {
    this.locations = new LocationCollection();
    this.listenTo(this.locations, 'add', this.addLocationToSelect);

    this.charges = new ChargeCollection();
    this.listenTo(this.charges, 'add', this.addItem);
    this.listenTo(this.charges, 'remove', this.removeSubViewForModel);
  },

  onRender: function() {
    this.locations.fetch();
  },

  loadCharges: function(event) {
    this.charges.fetch({data: {group: event.target.value}});
  },

  addItem: function(model) {
    this.addSubView({
      view: new TableRowView({model:model}),
      selector: 'tbody'
    });
  },

  addLocationToSelect: function(model) {
    var tpl = _.template('<option value="<%=id%>"><%=label%></option>');
    this.$('#location').append(tpl(model.toJSON()));
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
