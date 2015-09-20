var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: '/invoice/charges',
  comparator: 'SERVICE ID'
});
