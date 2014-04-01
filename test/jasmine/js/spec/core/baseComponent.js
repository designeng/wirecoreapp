define(["backbone", "marionette", "baseComponent"], function(Backbone, Marionette, BaseComponent) {
  var beforeEachFunc, component, composition, declaration;
  component = void 0;
  composition = void 0;
  declaration = {
    componentModel: new Backbone.Model({
      componentType: "form",
      action: "stub.json",
      method: "POST",
      ajax: true,
      inputErrorHandlerCid: "flightStatsFormErrorHandler",
      rootClass: "flightStats",
      itemClasses: ["switch", "inputText"],
      dataModel: new Backbone.Model()
    }),
    componentItems: []
  };
  beforeEachFunc = function() {
    return runs(function() {
      var $wrapper, layout, region;
      layout = new Marionette.Layout({
        template: "<div class='controllerRegion'></div>",
        model: new Backbone.Model()
      });
      $wrapper = $(".wrapper");
      $wrapper.append(layout.render().$el);
      layout.addRegion("flightStatsResultRegion", ".controllerRegion");
      region = layout.regionManager.get("flightStatsResultRegion");
      component = new BaseComponent({
        declaration: declaration,
        region: region,
        context: _.extend({}, Backbone.Events)
      });
      return composition = component.getComposition();
    });
  };
  return describe("Core::baseComponent", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(component).toBeDefined();
    });
    Then(function() {
      return expect(composition).toBeDefined();
    });
    Then(function() {
      return expect(composition.model).toBeDefined();
    });
    Then(function() {
      return expect(composition.model instanceof Backbone.Model).toBeTruthy();
    });
    Then(function() {
      return expect(composition.model.get("action")).toBe("stub.json");
    });
    Then(function() {
      return expect(composition.model.get("method")).toBe("POST");
    });
    return Then(function() {
      return expect(composition.isForm).toBeTruthy();
    });
  });
});
