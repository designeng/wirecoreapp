define(["backbone", "marionette", "modules/flightStats/flightStatsController", "modules/flightStats/declaration", "switchControl", "core/utils/view/getViewMethods", "meld", "trace"], function(Backbone, Marionette, FlightStatsController, declaration, SwitchControl, getViewMethods, meld, trace) {
  var beforeEachFunc, start, view;
  start = true;
  view = void 0;
  beforeEachFunc = function() {
    waitsFor(function() {
      return [start, "error with injected types loading", 1000];
    });
    return runs(function() {
      view = new SwitchControl({
        dataModel: new Backbone.Model(),
        model: new Backbone.Model({
          name: "switch",
          className: "switchControl",
          width: 200,
          height: 30,
          fontSize: 20,
          inputOptions: ["loc_Route", "loc_FlightNumber"],
          itemClass: "switchItem",
          itemFocusedClass: "switchItem__focused",
          itemSelectedClass: "switchItem__selected",
          context: new FlightStatsController({
            declaration: declaration
          })
        })
      });
      return $(".wrapper").append(view.render().$el);
    });
  };
  return describe("switchControl", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(view).toBeDefined();
    });
    Then(function() {
      return expect(view._itemFocusedClass).toEqual("switchItem__focused");
    });
    Then(function() {
      return expect(view._itemSelectedClass).toEqual("switchItem__selected");
    });
    Then(function() {
      return expect($(".wrapper").find(".item0")).toHaveText("Маршрут");
    });
    Then(function() {
      return expect($(".wrapper").find(".item1")).toHaveText("Номер рейса");
    });
    return Then(function() {
      $('.item0').find("input").focus();
      return expect($('.item0').find("input")).toBeFocused();
    });
  });
});
