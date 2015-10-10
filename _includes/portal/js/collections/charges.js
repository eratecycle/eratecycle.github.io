var Backbone = require('backbone');
var Charge = require('../models/charge');

module.exports = Backbone.Collection.extend({
  url: '/invoice/charges',
  comparator: 'service_id',
  model: Charge
});
