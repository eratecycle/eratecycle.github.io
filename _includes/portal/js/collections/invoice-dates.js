var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: '/invoice/dates',
  comparator: 'date'
});
