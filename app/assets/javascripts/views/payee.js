Plastiq.Views.Payee = Backbone.CompositeView.extend ({
  template: JST['payee'],

  className: 'payee',

  events: {
    'submit': 'createNewPayee'
  },

  id: function () {
    return 'payee-' + this.model.id;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      payee: this.model
    });
    this.$el.html(content);
    // this.enableTooltip();
    return this;
  },

});