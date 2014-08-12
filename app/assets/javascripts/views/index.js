Plastiq.Views.Index = Backbone.CompositeView.extend ({
  template: JST['index'],

  events: {
    'sortupdate': 'updateRanks',
    'click #reset-db': 'resetDatabase',
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.renderPayees);
  },

  render: function () {
    var content = this.template({
      payees: this.collection
    });

    this.$el.html(content);
    this.renderPayees();
    this.renderForm();
    globalView = this;
    return this;
  },

  renderPayees: function () {
    subviews = this.subviews('.the-payees');
    while (subviews.length > 0) {
      this.removeSubview('.the-payees', subviews[0])
    }
    this.collection.each(this.addPayee.bind(this));
    var that = this;
    
    this.$('.the-payees').sortable({
      connectWith: '.the-payees',
    });

    this.enableTooltip();

  },

  addPayee: function (payee) {
    var view = new Plastiq.Views.Payee({
      model: payee
    });
    this.addSubview('.the-payees', view);
  },

  renderForm: function () {
    subviews = this.subviews('.payee-form');
    while (subviews.length > 0) {
      this.removeSubview('.payee-form', subviews[0])
    }
    var view = new Plastiq.Views.PayeeForm({
      collection: this.collection
    });
    this.addSubview('.payee-form', view);
  },

  updateRanks: function (event) {
    var that = this;
    counter = 0;
    var payeeOrderArray = $(event.target).sortable('toArray', {
      attribute: 'id'
    });

    _.each(payeeOrderArray, function (payeeId) {
      var id = payeeId.split('-')[1];
      var payee = that.collection.get(id);
      payee.save({ 'rank': counter })
      counter += 1;
    });
    this.collection.sort();
  },

  resetDatabase: function (event) {
    event.preventDefault();
    var model;
    while (model = this.collection.first()) {
      model.destroy();
    }
  },

  enableTooltip: function () {
    $('.tooltip-container').mouseover(function (event) {
      $(event.target).empty();
      $(event.target).append('<img class="dollar-sign dollar-white" src="http://s17.postimg.org/qt3rz230b/dollar_sign.png">');      
    }).mouseout(function (event) {
      $(event.target).empty();
      $(event.target).append('<img class="dollar-sign dollar-gray" src="http://s28.postimg.org/cq4sjmho9/dollar_sign_gray.png">');
    });

    $('.tooltip-container').tooltip({
      tooltipClass: "tooltip",
      position: { 
        my: "center top-44", 
        at: "center-2 top" 
      },
    });
  },

})