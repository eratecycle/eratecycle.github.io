var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.Collection.extend({
  url: '/invoice/service-rates',
  comparator: 'amount'
});
