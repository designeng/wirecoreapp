define(["underscore", "backbone", "marionette", "tableControl", "core/utils/collection/strategy/simpleComparison", "core/utils/develop/collectionGenerator", "core/utils/view/getViewMethods", "attributesToString", "core/ioc/utils/getActualTypes", "core/ioc/utils/afterTypesLoaded"], function(_, Backbone, Marionette, TableControl, simpleComparison, collectionGenerator, getViewMethods, attributesToString, getActualTypes, afterTypesLoaded) {
  var beforeEachFunc, eventBus, headerClassPrefix, header_1, start, types, view, viewModel;
  start = false;
  viewModel = null;
  view = void 0;
  headerClassPrefix = "";
  header_1 = null;
  types = null;
  eventBus = _.extend({}, Backbone.Events);
  beforeEachFunc = function() {
    waitsFor(function() {
      return start;
    }, "error with injected types loading", 1000);
    return runs(function() {
      view = new TableControl({
        model: new Backbone.Model(viewModel)
      });
      $(".wrapper").append(view.render().$el);
      view.initTemplateVariables();
      return headerClassPrefix = view._headerClassPrefix;
    });
  };
  return describe("TableControl spec", function() {
    var callback, errback,
      _this = this;
    viewModel = {
      context: eventBus,
      className: "tableControl",
      width: 400,
      headers: ["loc_MyOrders", "loc_MyOrders"],
      headerClassPrefix: "header_",
      itemType: "controls/table/row/tableRowControl",
      headerType: "controls/table/header/tableHeaderControl",
      bodyType: "controls/table/body/tableBodyControl",
      visibleModelFields: ["data", "nextfield"],
      sortableFields: ["nextfield"],
      collectionStrategy: simpleComparison,
      itemClassName: "tableItem",
      itemHeight: 20
    };
    types = getActualTypes(attributesToString(viewModel));
    callback = function(res) {
      return start = true;
    };
    errback = function(err) {
      return console.log("ERROR", err);
    };
    afterTypesLoaded(types, callback, errback);
    beforeEach(function() {
      return beforeEachFunc();
    });
    When(function() {
      var collection;
      collection = collectionGenerator(7, ["data", "nextfield"], {
        mode: "numbers"
      });
      return view.exposeCollection(collection);
    });
    return Then(function() {
      var collection;
      collection = collectionGenerator(7, ["data", "nextfield"], {
        mode: "numbers"
      });
      view.exposeCollection(collection);
      return expect(types).toBeArrayOfStrings();
    });
  });
});
