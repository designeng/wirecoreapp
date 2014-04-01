define(["underscore", "backbone", "marionette", "modules/flightStatsResult/flightStatsResultController", "modules/flightStatsResult/declaration", "meld", "attributesToString", "core/ioc/utils/getActualTypes", "core/ioc/utils/afterTypesLoaded"], function(_, Backbone, Marionette, FlightStatsResultController, declaration, meld, attributesToString, getActualTypes, afterTypesLoaded) {
  var $wrapper, ajaxData, beforeEachFunc, component, controller, dataProvider, layout, region, start;
  start = false;
  ajaxData = void 0;
  dataProvider = void 0;
  component = null;
  controller = null;
  layout = null;
  region = null;
  $wrapper = null;
  beforeEachFunc = function() {
    waitsFor(function() {
      return start;
    }, "error with injected types loading", 1000);
    return runs(function() {
      layout = new Marionette.Layout({
        template: "<div class='controllerRegion'></div>",
        model: new Backbone.Model()
      });
      $wrapper = $(".wrapper");
      $wrapper.append(layout.render().$el);
      layout.addRegion("flightStatsResultRegion", ".controllerRegion");
      region = layout.regionManager.get("flightStatsResultRegion");
      return controller = new FlightStatsResultController({
        declaration: declaration,
        region: region,
        context: _.extend({}, Backbone.Events)
      });
    });
  };
  return describe("FlightStats Result Controller", function() {
    var callback, errback, types,
      _this = this;
    types = getActualTypes(attributesToString(declaration.componentItems[0]));
    callback = function(res) {
      console.error('AAAAAAAAAAAAAAA');
      return $.ajax({
        cache: false,
        type: "POST",
        url: "/mock/services/flightStatesSearches",
        data: {}
      }).done(function(res) {
        ajaxData = res;
        dataProvider = ajaxData.data.flightStates.airTrips.segments[0].legs;
        return start = true;
      });
    };
    errback = function(err) {
      return console.log("ERROR", err);
    };
    afterTypesLoaded(types, callback, errback);
    beforeEach(function() {
      return beforeEachFunc();
    });
    When(function() {
      controller.exposeComponent(ajaxData);
      return component = controller.getComponent();
    });
    Then(function() {
      return expect(controller).toBeDefined();
    });
    Then(function() {
      return expect(controller.declaration).toBeDefined();
    });
    Then(function() {
      return expect(component).toBeDefined();
    });
    Then(function() {
      var mergedFlightsLength;
      mergedFlightsLength = dataProvider.mergedFlights.length;
      expect(mergedFlightsLength).toBeDefined();
      return expect(controller.tableCollection.length).toBe(mergedFlightsLength);
    });
    return Then(function() {});
  });
});
