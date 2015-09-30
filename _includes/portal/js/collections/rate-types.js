var Backbone = require('backbone');
var accounting = require('accounting');

module.exports = Backbone.Collection.extend({
  url: '/invoice/rate-types',
  comparator: 'rate_type'
});
