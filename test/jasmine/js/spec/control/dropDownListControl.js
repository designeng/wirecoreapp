define(["jquery", "underscore", "backbone", "marionette", "when", "dropDownListControl", "dropDownListModel", "attributesToString", "core/ioc/utils/getActualTypes", "core/ioc/utils/afterTypesLoaded", "jquery.simulate"], function($, _, Backbone, Marionette, When, DropDownListControl, DropDownListModel, attributesToString, getActualTypes, afterTypesLoaded) {
  var afterEachFunc, beforeEachFunc, collectionPopulated, controlModel, dropDownView, highLightService, listController, mask, rangeService, reportingService, scrollingService, start, view;
  view = void 0;
  mask = null;
  dropDownView = null;
  listController = null;
  rangeService = null;
  highLightService = null;
  scrollingService = null;
  reportingService = null;
  start = false;
  collectionPopulated = false;
  controlModel = new DropDownListModel({
    width: 326,
    height: 400,
    listHeight: 400,
    display: true,
    defaultMaxItemsToShow: 10,
    firstVisible: 0,
    noItemsMessage: "loc_FlightPointNotFound",
    itemType: "flightPointControl",
    itemClassName: "flightPointItem",
    itemHeight: 20,
    itemOverClass: "flightPointItem--over"
  });
  beforeEachFunc = function() {
    waitsFor(function() {
      return start;
    }, "error with injected types loading", 1000);
    return runs(function() {
      view = new DropDownListControl({
        model: controlModel,
        context: _.extend({}, Backbone.Events)
      });
      When(view.dropDownService.promiseRendered()).then(function(targetView) {
        var i, item, _i;
        for (i = _i = 0; _i < 20; i = ++_i) {
          item = new Backbone.Model({
            name: "itemname_" + i
          });
          targetView.addItemToCollection(item);
        }
        collectionPopulated = true;
        targetView.render();
        return When(targetView.controller.rangeService.getCollectionLengthPromise()).then(function(val) {
          return console.log("getCollectionLengthPromise", val);
        });
      });
      $(".wrapper").append(view.render().$el);
      mask = view.maskService.getMaskView();
      dropDownView = view.dropDownService.getDropDownView();
      listController = dropDownView.controller;
      rangeService = dropDownView.controller.rangeService;
      return reportingService = view.reportingService;
    });
  };
  afterEachFunc = function() {
    return view.resetCollection();
  };
  describe("dropDownListControl", function() {
    var callback, errback, types,
      _this = this;
    types = getActualTypes(attributesToString(controlModel));
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
    afterEach(function() {
      return afterEachFunc();
    });
    When(function() {
      return view.dropDownService.promiseRendered();
    });
    Then(function() {
      return expect(view).toBeDefined();
    });
    Then(function() {
      return expect(view.$el).toHaveClass("dropDownListHolder");
    });
    Then(function() {
      expect(mask.$el).toHaveClass("maskServiceView");
      return expect(mask.$el).toHaveCss({
        display: "none"
      });
    });
    Then(function() {
      return expect(view.maskService.setMaskStatus).toBeDefined();
    });
    Then(function() {
      return expect(view.dropDownService).toBeDefined();
    });
    Then(function() {
      return expect(view.dropDownService.getDropDownView).toBeDefined();
    });
    Then(function() {
      return expect(view.dropDownService.itemType).toBeDefined();
    });
    Then(function() {
      return expect(view.dropDownService.itemViewClass).toBeFunction();
    });
    Then(function() {
      return expect(view.dropDownService.promiseRendered).toBeFunction();
    });
    Then(function() {
      return expect(view.dropDownService.promiseRendered()).toBeObject();
    });
    Then(function() {
      return expect(dropDownView.keyboardService).toBeDefined();
    });
    Then(function() {
      return expect(dropDownView.keyboardService.extendWithKeyMethods).toBeDefined();
    });
    return Then(function() {
      return expect(dropDownView.controller).toBeDefined();
    });
  });
  return describe("dropDownListControl wait for collectionPopulated", function() {
    beforeEach(function() {
      waitsFor(function() {
        return collectionPopulated;
      }, "error with collectionPopulated", 1000);
      return runs(function() {
        highLightService = dropDownView.controller.highLightService;
        return scrollingService = dropDownView.controller.scrollingService;
      });
    });
    Then(function() {
      return expect(view.resetCollection).toBeFunction();
    });
    Then(function() {
      return expect(view.cropCollection).toBeFunction();
    });
    Then(function() {
      return expect(dropDownView.cropCollection).toBeFunction();
    });
    Then(function() {
      return expect(dropDownView.resetCollection).toBeFunction();
    });
    Then(function() {
      return expect(dropDownView.getCollectionLength).toBeFunction();
    });
    Then(function() {
      return expect(dropDownView.addItemToCollection).toBeFunction();
    });
    Then(function() {
      return expect(dropDownView.getCollectionLength()).toBe(20);
    });
    Then(function() {
      view.setHeight(62);
      expect(rangeService.getFirst()).toBe(0);
      return expect(rangeService.getLast()).toBe(2);
    });
    Then(function() {
      view.setHeight(85);
      expect(rangeService.getFirst()).toBe(0);
      return expect(rangeService.getLast()).toBe(3);
    });
    Then(function() {
      return expect(rangeService.getRange()).toBe(3);
    });
    Then(function() {
      view.setHeight(104);
      return expect(rangeService.getRange()).toBe(4);
    });
    Then(function() {
      rangeService.setActive(6);
      listController.pageUp();
      return expect(rangeService.getActive()).toBe(2);
    });
    Then(function() {
      listController.decrease();
      listController.decrease();
      return expect(rangeService.getActive()).toBe(0);
    });
    Then(function() {
      rangeService.setActive(10);
      listController.home();
      expect(highLightService.getItemByIndex(0).$el).toHaveClass("flightPointItem--over");
      return expect(rangeService.getActive()).toBe(0);
    });
    Then(function() {
      listController.end();
      expect(highLightService.getItemByIndex(19).$el).toHaveClass("flightPointItem--over");
      return expect(rangeService.getActive()).toBe(19);
    });
    Then(function() {
      listController.pageUp();
      listController.pageUp();
      listController.pageUp();
      return expect(rangeService.getActive()).toBe(7);
    });
    Then(function() {
      return expect(highLightService).toBeDefined();
    });
    Then(function() {
      return expect(highLightService.getItemByIndex(7).$el).toHaveClass("flightPointItem--over");
    });
    Then(function() {
      listController.pageDown();
      listController.pageDown();
      return expect(highLightService.getItemByIndex(15).$el).toHaveClass("flightPointItem--over");
    });
    Then(function() {
      view.setHeight(245);
      return expect(rangeService.getRange()).toBe(11);
    });
    Then(function() {
      listController.pageUp();
      listController.pageUp();
      return expect(rangeService.getActive()).toBe(0);
    });
    Then(function() {
      return expect(rangeService.getFirst()).toBe(0);
    });
    Then(function() {
      return expect(scrollingService).toBeDefined();
    });
    Then(function() {
      expect(view.maskService).toBeDefined();
      return expect(view.maskService.getMaskStatus()).toBe("shown");
    });
    Then(function() {
      view.setHeight(242);
      return expect(view.maskService.getMaskHeight()).toBe("200px");
    });
    return Then(function() {
      rangeService.setActive(2);
      listController.enter();
      return expect(reportingService.getCurrentModel().get("name")).toBe("itemname_2");
    });
  });
});
