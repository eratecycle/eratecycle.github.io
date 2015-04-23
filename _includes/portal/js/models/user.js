var Backbone = require('backbone');

var FileCollection = require('../collections/files');
var TransactionCollection = require('../collections/transactions');

var User = Backbone.Model.extend({

  urlRoot: '/user',

  defaults: {
    firstName: '',
    lastName: ''
  },

  initialize: function() {
    this.files = new FileCollection();
    this.transactions = new TransactionCollection();
  },

  parse: function(data, options) {
    if (data.files) {
      this.files.add(data.files,{merge: true});
      delete data.files;
    }
    if (data.transactions) {
      this.transactions.add(data.transactions,{merge: true});
      this.transactions.sort();
      delete data.transactions;
    }
    return data;
  }

});

module.exports = new User();
