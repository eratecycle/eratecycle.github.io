var Backbone = require('backbone');
var        _ = require('underscore');

var accounting = require('accounting');

module.exports = Backbone.View.extend({

  template: require('../../templates/dashboard/flot-total.jst'),

  initialize: function() {
    this.listenTo(this.collection,'sync',this.render);
  },

  serializeData: function() {
    var amounts = this.collection.pluck('sum');
    var totals = _.reduce(amounts, function(memo, num){ return memo + num; }, 0).toFixed(2);
    return {
      total: accounting.formatMoney(totals)
    }
  },

});
