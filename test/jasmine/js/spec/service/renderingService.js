define(["underscore", "backbone", "marionette", "controls/link/linkControl", "renderingService", "globalEvents", "meld", "attributesToString", "core/ioc/utils/getActualTypes", "core/ioc/utils/afterTypesLoaded"], function(_, Backbone, Marionette, LinkControl, renderingService, globalEvents, meld, attributesToString, getActualTypes, afterTypesLoaded) {
  var beforeEachFunc, buffer, region, start, view, viewModel;
  start = false;
  view = null;
  region = null;
  buffer = null;
  viewModel = {
    className: "linkClassName",
    innerComponent: {
      innerComponentType: "textControl",
      connectTo: "confirm",
      model: new Backbone.Model({
        text: "textControlText"
      }),
      behaviour: {
        toggle: true
      },
      buffer: []
    }
  };
  beforeEachFunc = function() {
    waitsFor(function() {
      return start;
    }, "error with injected types loading", 1000);
    return runs(function() {
      view = new LinkControl({
        model: new Backbone.Model(viewModel)
      });
      this.$el = view.render().$el;
      $(".wrapper").append(this.$el);
      region = view.regionManager.get("rsRegion");
      return view.confirm();
    });
  };
  return describe("renderingService spec", function() {
    var callback, errback, types,
      _this = this;
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
    Then(function() {
      expect(view.regions).toBeDefined();
      return expect(view.regions.rsRegion).toBeDefined();
    });
    Then(function() {
      return expect(region).toBeDefined();
    });
    Then(function() {
      return expect(view.regions.rsRegion.el).toBe("." + view.cid + "_rsRegion");
    });
    Then(function() {
      return expect(view.model.get("innerComponent")).toBeDefined();
    });
    Then(function() {
      return expect(view.model.get("innerComponent").buffer).toBeArray();
    });
    Then(function() {
      return expect(renderingService.currentActiveCid).toBe(view.cid);
    });
    Then(function() {
      return expect(view.$el).toHaveText("textControlText");
    });
    Then(function() {
      expect(renderingService.onHtmlClick()).not.toBeDefined();
      return expect(renderingService.currentActiveCid).not.toBeDefined();
    });
    return Then(function() {
      var curCid;
      spyOn(renderingService, "closeCurrentActive");
      curCid = renderingService.currentActiveCid;
      renderingService.onHtmlClick();
      expect(renderingService.closeCurrentActive).toHaveBeenCalled();
      return expect(renderingService.currentActiveCid).not.toBeDefined();
    });
  });
});
