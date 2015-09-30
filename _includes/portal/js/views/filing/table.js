var Backbone = require('backbone');
var _ = require('underscore');
var moment = require('moment');

var ServiceCollection = require('../../collections/services');
var RateCollection = require('../../collections/service-rates');
var RateTypeCollection = require('../../collections/rate-types');
var DateCollection = require('../../collections/invoice-dates');
var TotalView = require('./flot-total');
var TableRowView = require('./table-row');

var isValidRateType = function(model) {
  var rate_type = model.get('rate_type');
  return rate_type && rate_type.length > 0 && rate_type.indexOf('Discount') === -1 && rate_type.indexOf('commitment') === -1;
}

var FilterModel = Backbone.Model.extend({
  isValidDateRange: function(attrs) {
    return attrs.from_date < attrs.to_date;
  },

  hasRequiredAttr: function(attrs) {
    return attrs.rate_type !== undefined;
  },

  validate: function(attrs, options) {
    console.dir(attrs);
    var result = this.hasRequiredAttr(attrs) && this.isValidDateRange(attrs);
    console.log(result);
    if (!result) {
      return 'failed validation';
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
    'change #rate_type': 'setFilter',
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

    this.rateTypes = new RateTypeCollection();
    this.listenTo(this.rateTypes, 'sync', this.updateRateTypeSelect);

    this.collection = new Backbone.Collection();
    this.listenTo(this.collection, 'add', this.addViewItem);
    this.listenTo(this.collection, 'remove', this.removeSubViewForModel);

    this.filter = new FilterModel();
    this.listenTo(this.filter,'change', this.loadCharges);
    this.listenTo(this.filter,'change:service_code', this.loadRateTypes);

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

  loadRateTypes: function(model) {
    this.rateTypes.fetch({data: {service_code: model.get('service_code')}});
  },

  addServiceToSelect: function(model) {
    var tpl = _.template('<option value="<%=id%>"><%=label%></option>');
    this.$('#service_code').append(tpl(model.toJSON()));
  },

  updateRateTypeSelect: function() {
    var tpl = _.template('<option><%=rate_type%></option>');
    var $rate_type = this.$('#rate_type');
    $rate_type.empty();
    this.rateTypes
      .filter(isValidRateType)
      .forEach(function(model){
        $rate_type.append(tpl(model.toJSON()));
      });
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
    if (isValidRateType(model)) {
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
    var data = {date: moment(model.get('date'),'YYYYMMDD').format('MM/DD/YY')};
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
