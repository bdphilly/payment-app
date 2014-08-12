Plastiq.Collections.Payees = Backbone.Collection.extend ({
  model: Plastiq.Models.Payee,

  url: '/payees',

  comparator: 'rank',

  getOrFetch: function (id) {
    var payees = this;
    var payee;
    if (payee = this.get(id)) {
      payee.fetch();
    } else {
      payee = new Plastiq.Models.Payee({ id: id });
      payee.fetch({
        success: function () {
          payees.add(payee);
        }
      })
    }

    return payee;
  },

})