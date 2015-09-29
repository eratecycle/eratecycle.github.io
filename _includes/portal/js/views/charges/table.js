var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

var LocationCollection = require('../../collections/locations');
var DateCollection = require('../../collections/invoice-dates');
var ChargeCollection = require('../../collections/charges');
var TableRowView = require('./table-row');

module.exports = Backbone.View.extend({

  template: require('../../templates/charges/table.jst'),

  events: {
    'click .collapse-link': 'collapseIBox',
    'click .close-link': 'close',
    'change #location': 'loadCharges',
    'change #from_date': 'setFilter',
    'change #to_date': 'setFilter'
  },

  initialize: function() {
    this.locations = new LocationCollection();
    this.listenTo(this.locations, 'add', this.addLocationToSelect);

    this.dates = new DateCollection();
    this.listenTo(this.dates, 'add', this.addDateToSelect);

    this.charges = new ChargeCollection();
    this.listenTo(this.charges, 'add', this.addItem);
    this.listenTo(this.charges, 'remove', this.removeItem);

    this.collection = new Backbone.Collection();
    this.listenTo(this.collection, 'add', this.addViewItem);
    this.listenTo(this.collection, 'remove', this.removeSubViewForModel);

    this.filter = new Backbone.Model();
    this.listenTo(this.filter,'change', this.filterCharges);
  },

  onShow: function() {
    this.locations.fetch();
    this.dates.fetch();
  },

  loadCharges: function(event) {
    this.charges.fetch({data: {group: event.target.value}});
  },

  setFilter: function(event) {
    var val = event.target.value;
    if (val.length > 0) {
      val = moment(val, 'MM/DD/YY').format('YYYYMMDD');
    }
    this.filter.set(event.target.id, val);
  },

  isValid: function(charge) {
    var from_date = this.filter.get('from_date');
    var to_date = this.filter.get('to_date');
    var date = charge.get('invoice_date');
    if (from_date && to_date) {
      return ((date >= from_date)  && (date <= to_date))
    } else if (from_date) {
      return (date >= from_date)
    } else if (to_date) {
      return (date <= to_date)
    } else {
      return true;
    }
  },

  filterCharges: function() {
    var charges = this.charges.filter(this.isValid,this);
    this.collection.set(charges);
  },

  addItem: function(model) {
    if (this.isValid(model)) {
      this.collection.add(model);
    }
  },

  removeItem: function(model) {
    this.collection.remove(model);
  },

  addViewItem: function(model) {
    this.addSubView({
      view: new TableRowView({model:model}),
      selector: 'tbody'
    });
  },

  addLocationToSelect: function(model) {
    var tpl = _.template('<option value="<%=id%>"><%=label%></option>');
    this.$('#location').append(tpl(model.toJSON()));
  },

  addDateToSelect: function(model) {
    var tpl = _.template('<option><%=date%></option>');
    var data = {
      date: moment(model.get('date'),'YYYYMMDD').format('MM/DD/YY')
    }
    this.$('#from_date').append(tpl(data));
    this.$('#to_date').append(tpl(data));
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
