window.Plastiq = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Plastiq.Routers.router = new Plastiq.Routers.Router;
    Plastiq.Collections.payees = new Plastiq.Collections.Payees;
    Backbone.history.start();
  }
};