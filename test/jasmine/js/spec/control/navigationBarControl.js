define(["backbone", "marionette", "tableControl"], function(Backbone, Marionette, NavigationBarControl) {
  var controlModel, view;
  view = void 0;
  controlModel = new Backbone.Model({
    context: _.extend({}, Backbone.Events),
    items: new Backbone.Collection([
      {
        text: "loc_AviaTickets",
        url: "!/"
      }, {
        text: "loc_TrainTickets",
        url: "!/header"
      }, {
        text: "loc_Hotels",
        url: "!/hotels"
      }, {
        text: "loc_CarRental",
        url: "!/cars"
      }
    ])
  });
  return describe("navigationBarControl", function() {
    beforeEach(function() {
      view = new NavigationBarControl({
        model: controlModel
      });
      return $(".wrapper").append(view.render().$el);
    });
    return Then(function() {
      return expect(view).toBeDefined();
    });
  });
});
