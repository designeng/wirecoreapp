define(["backbone", "marionette", "when", "modules/flightStats/flightStatsController", "modules/flightStats/declaration", "controlContainerService", "core/utils/view/getViewMethods", "meld", "trace"], function(Backbone, Marionette, When, FlightStatsController, declaration, controlContainerService, getViewMethods, meld, trace) {
  var beforeEachFunc, buttonControlResolved, component, controller, start;
  start = true;
  buttonControlResolved = false;
  controller = void 0;
  component = void 0;
  beforeEachFunc = function() {
    waitsFor(function() {
      return start;
    }, "error with injected types loading", 1000);
    return runs(function() {
      var $wrapper, layout, region,
        _this = this;
      layout = new Marionette.Layout({
        template: "<div class='controllerRegion'></div>",
        model: new Backbone.Model()
      });
      $wrapper = $(".wrapper");
      $wrapper.append(layout.render().$el);
      layout.addRegion("flightStatsResultRegion", ".controllerRegion");
      region = layout.regionManager.get("flightStatsResultRegion");
      controller = new FlightStatsController({
        declaration: declaration,
        region: region,
        context: _.extend({}, Backbone.Events)
      });
      component = controller.component;
      controller.show();
      return When(component.getControlByTypeName("buttonControl").isResolved()).then(function(target) {
        return buttonControlResolved = true;
      });
    });
  };
  describe("FlightStatsController", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(controller).toBeDefined();
    });
    Then(function() {
      return expect(component).toBeDefined();
    });
    Then(function() {
      expect(controller.flightStatesSearchRequest).toBeDefined();
      return expect(controller.flightStatesSearchRequest.segments).not.toBeEmptyArray();
    });
    Then(function() {
      return expect(controller.flightStatesSearchRequest.segments[0]).toBeObject();
    });
    Then(function() {
      var model;
      model = new Backbone.Model({
        data: "SU123",
        inputName: "flightNumber"
      });
      controller.collectData(model);
      expect(controller.flightStatesSearchRequest.segments[0]["flightNumber"]).toBe("SU123");
      model = new Backbone.Model({
        id: "6247",
        inputName: "flightFrom"
      });
      controller.collectData(model);
      expect(controller.flightStatesSearchRequest.segments[0]["startPoint"].id).toBeNumber();
      model = new Backbone.Model({
        id: "1234",
        inputName: "flightTo"
      });
      controller.collectData(model);
      return expect(controller.flightStatesSearchRequest.segments[0]["endPoint"].id).toBeNumber();
    });
    return Then(function() {});
  });
  return describe("FlightStatsController component button control isResolved", function() {
    beforeEach(function() {
      waitsFor(function() {
        return buttonControlResolved;
      }, "error with button control resolving", 1000);
      return runs(function() {});
    });
    Then(function() {
      return expect(component.getControlByTypeName("buttonControl").$el).toHaveText("Найти рейсы");
    });
    return Then(function() {
      var button;
      button = component.getControlByTypeName("buttonControl").$el.find("button");
      button.click();
      return expect(component.getControlByTypeName("inputError").$el).toHaveText("Поле обязательно для заполнения");
    });
  });
});
