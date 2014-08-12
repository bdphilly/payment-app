Plastiq.Routers.Router = Backbone.Router.extend ({
  routes: {
    "": "payeeIndex",
  },

  payeeIndex: function () {
    Plastiq.Collections.payees.fetch();
    indexView = new Plastiq.Views.Index({
      collection: Plastiq.Collections.payees
    });

    $('#content').html(indexView.render().$el);
  },

});