var Backbone = require('backbone');
var _ = require('underscore');

var accountTpl = require('../../templates/form470/account.jst');
var profileTpl = require('../../templates/form470/profile.jst');
var warningTpl = require('../../templates/form470/warning.jst');
var finishTpl = require('../../templates/form470/finish.jst');

var EntitySearch = require('../../collections/entities');
var EntityTitleView = require('./entity-title');
var AccountRowView = require('./account-row');

module.exports = Backbone.View.extend({

  template: require('../../templates/form470/index.jst'),
  events: {
    'click #entity-search': 'entitySearch'
  },

  initialize: function() {
    this.entityCollection = new EntitySearch();
    this.listenTo(this.entityCollection, 'add', this.addRow);
    this.listenTo(this.entityCollection, 'remove', this.removeSubViewForModel);

    this.addSubView({
      view: new EntityTitleView({model: this.model}),
      selector: '.ibox-content',
      location: 'prepend'
    });
  },

  addRow: function(model) {
    this.addSubView({
      view: new AccountRowView({model:model, user: this.model}),
      selector: 'tbody'
    });
  },

  entitySearch: function(e) {
    e.preventDefault();
    this.model.set('zipCode', this.$('#zipCode').val());
    this.entityCollection
    .fetch({
      data: {
        zipCode: this.model.get('zipCode')
      }
    })
    .done(_.bind(this.resizeSteps,this));
  },

  onRender: function() {
    this.$('form').append(accountTpl);
    this.$('form').append(profileTpl);
    this.$('form').append(warningTpl);
    this.$('form').append(finishTpl);
  },

  resizeSteps: function() {
    this.$('.wizard .content').animate({ height: $('.body.current').outerHeight() }, "slow");
  },

  onShow: function() {
    this.$('form').steps({
      bodyTag: 'fieldset',
      onStepChanging: function (event, currentIndex, newIndex)
      {
        // Always allow going backward even if the current step contains invalid fields!
        if (currentIndex > newIndex)
        {
          return true;
        }

        // Forbid suppressing 'Warning' step if the user is to young
        if (newIndex === 3 && Number($('#age').val()) < 18)
        {
          return false;
        }

        var form = $(this);

        // Clean up if user went backward before
        if (currentIndex < newIndex)
        {
          // To remove error styles
          $('.body:eq(' + newIndex + ') label.error', form).remove();
          $('.body:eq(' + newIndex + ') .error', form).removeClass('error');
        }

        // Disable validation on fields that are disabled or hidden.
        form.validate().settings.ignore = ':disabled,:hidden';

        // Start validation; Prevent going forward if false
        return form.valid();
      },
      onStepChanged: function (event, currentIndex, priorIndex)
      {
        // Suppress (skip) 'Warning' step if the user is old enough.
        if (currentIndex === 2 && Number(this.$('#age').val()) >= 18)
        {
          this.$el.steps('next');
        }

        // Suppress (skip) 'Warning' step if the user is old enough and wants to the previous step.
        if (currentIndex === 2 && priorIndex === 3)
        {
          this.$el.steps('previous');
        }
        this.model.save();
        this.resizeSteps();
      }.bind(this),
      onFinishing: function (event, currentIndex)
      {
        var form = $(this);

        // Disable validation on fields that are disabled.
        // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
        form.validate().settings.ignore = ':disabled';

        // Start validation; Prevent form submission if false
        return form.valid();
      },
      onFinished: function (event, currentIndex)
      {
        var form = $(this);

        // Submit form input
        form.submit();
      }
    }).validate({
      errorPlacement: function (error, element)
      {
        element.before(error);
      },
      rules: {
        confirm: {
          equalTo: '#password'
        }
      }
    });
  }

});
