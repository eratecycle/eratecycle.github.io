var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  url: '/files',
  comparator: 'file_name'
});
