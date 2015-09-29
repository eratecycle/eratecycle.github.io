var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

var ServiceCollection = require('../../collections/services');
var RateCollection = require('../../collections/service-rates');
var DateCollection = require('../../collections/invoice-dates');
var AverageView = require('./flot-average');
var TotalView = require('./flot-total');
var TableRowView = require('./table-row');

var FilterModel = Backbone.Model.extend({
  validate: function(attrs, options) {
    if (attrs.to_date < attrs.from_date) {
      console.log('failed validation');
      return "can't end before it starts";
    }
  }
});

module.exports = Backbone.View.extend({

  template: require('../../templates/filing/table.jst'),

  events: {
    'click .collapse-link': 'collapseIBox',
    'click .close-link': 'close',
    'change #service_code': 'setFilter',
    'change #from_date': 'setFilter',
    'change #to_date': 'setFilter'
  },

  initialize: function() {
    this.services = new ServiceCollection();
    this.listenTo(this.services, 'add', this.addServiceToSelect);

    this.dates = new DateCollection();
    this.listenTo(this.dates, 'add', this.addDateToSelect);

    this.charges = new RateCollection();
    this.listenTo(this.charges, 'add', this.addItem);
    this.listenTo(this.charges, 'remove', this.removeItem);

    this.collection = new Backbone.Collection();
    this.listenTo(this.collection, 'add', this.addViewItem);
    this.listenTo(this.collection, 'remove', this.removeSubViewForModel);

    this.filter = new FilterModel();
    this.listenTo(this.filter,'change', this.loadCharges);

    this.addSubView({
      selector: '#average-chart',
      view: new AverageView({collection: this.charges})
    });

    this.addSubView({
      selector: '#total-chart',
      view: new TotalView({collection: this.charges})
    });
  },

  onShow: function() {
    this.services.fetch();
    this.dates.fetch();
  },

  loadCharges: function(model) {
    if (this.filter.isValid()) {
      this.charges.fetch({data: model.toJSON()});
    }
  },

  addServiceToSelect: function(model) {
    var tpl = _.template('<option value="<%=id%>"><%=label%></option>');
    this.$('#service_code').append(tpl(model.toJSON()));
  },

  setFilter: function(event) {
    var val = event.target.value;
    var id = event.target.id;
    if ((id.indexOf('date') > -1) && (val.length > 0)) {
      val = moment(val, 'MM/DD/YY').format('YYYYMMDD');
    }
    this.filter.set(id, val);
  },

  addItem: function(model) {
    var rate_type = model.get('rate_type');
    if (rate_type && (rate_type.indexOf('Discount') < 0)) {
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
