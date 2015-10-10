var Backbone = require('backbone');
var ServiceRate = require('../models/service-rate');

module.exports = Backbone.Collection.extend({
  url: '/invoice/service-rates',
  comparator: 'rate_type',
  model: ServiceRate
});
