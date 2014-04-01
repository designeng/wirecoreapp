define(["underscore", "backbone", "marionette", "buttonControl", "buttonModel", "meld"], function(_, Backbone, Marionette, ButtonControl, ButtonModel, meld) {
  var beforeEachFunc, context, view;
  view = void 0;
  context = _.extend({}, {
    isClicked: false,
    init: function() {
      _.bindAll(this, "onProcessData");
      return this.on("process:data", this.onProcessData);
    },
    onProcessData: function(data) {
      return this.isClicked = true;
    }
  }, Backbone.Events);
  beforeEachFunc = function() {
    return runs(function() {
      var buttonModel;
      buttonModel = new ButtonModel({
        caption: "Найти",
        triggerEvent: "process:data",
        context: context
      });
      view = new ButtonControl({
        model: buttonModel
      });
      view._context.init();
      return $(".wrapper").append(view.render().$el);
    });
  };
  return describe("buttonControl", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(view).toBeDefined();
    });
    Then(function() {
      return expect(view._context).toBeDefined();
    });
    Then(function() {
      expect(view._context.isClicked).not.toBeTruthy();
      view.$el.click();
      return expect(view._context.isClicked).toBeTruthy();
    });
    return Then(function() {
      view.$el.click();
      return expect(view.$el).toBeDisabled();
    });
  });
});
