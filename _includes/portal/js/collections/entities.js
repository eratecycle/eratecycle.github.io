var Backbone = require('backbone');

var Entity = require('../models/entity');

module.exports = Backbone.Collection.extend({
  url: '/entity/search',
  model: Entity
});
