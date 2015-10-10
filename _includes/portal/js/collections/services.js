var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: '/invoice/services',
  comparator: 'label'
});
