var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.Collection.extend({
  url: '/invoice/service-monthly-totals',
  comparator: 'invoice_date'
});
