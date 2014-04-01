define(["underscore", "backbone", "marionette", "controls/dropdownlist/reserve/listCompositeView", "core/utils/develop/collectionGenerator", "core/utils/view/getViewMethods", "meld", "trace"], function(_, Backbone, Marionette, ListCompositeView, collectionGenerator, getViewMethods, meld, trace) {
  return describe("ListCompositeView", function() {
    Given(function() {
      this.viewModel = new Backbone.Model({
        className: "dropDownList",
        width: 600,
        listHeight: 400,
        display: true,
        defaultMaxItemsToShow: 10,
        firstVisible: 0,
        noItemsMessage: "loc_FlightPointNotFound",
        itemClassName: "flightPointItem",
        itemHeight: 25,
        itemOverClass: "flightPointItem--over"
      });
      this.eventBus = _.extend({}, Backbone.Events);
      return this.view = this.reservedView = new ListCompositeView({
        model: this.viewModel,
        eventBus: this.eventBus
      });
    });
    Given(function() {
      return this.prototype = ListCompositeView.prototype;
    });
    When(function() {
      return $(".wrapper").append(this.view.render().$el);
    });
    describe("listCompositeView after render", function() {
      Then(function() {
        return expect(this.viewModel).toBeDefined();
      });
      Then(function() {
        return expect(this.view).toBeDefined();
      });
      Then(function() {
        return expect(this.view.itemView).toBeDefined();
      });
      Then(function() {
        return expect(this.view.emptyView).toBeDefined();
      });
      Then(function() {
        return expect(this.view._width).toBe(600);
      });
      Then(function() {
        return expect(this.view._itemHeight).toBe(25);
      });
      return Then(function() {
        return expect(this.view._itemOverClass).toBe("flightPointItem--over");
      });
    });
    return describe("listCompositeView after render resieved collection and eventBus", function() {
      When(function() {
        this.view.collection = collectionGenerator(19, "Item", {
          prefix: "_"
        });
        return $(".wrapper").append(this.view.render().$el);
      });
      Then(function() {
        return expect(this.view.collection.length).toBe(20);
      });
      Then(function() {
        this.view.processCollection(this.view.collection);
        return expect(this.view.children.findByIndex(10).model.attributes["modelIndex"]).toBeDefined();
      });
      Then(function() {
        return expect($(".wrapper").height()).toBe(this.view._defaultMaxItemsToShow * this.view._itemHeight);
      });
      Then(function() {
        return expect(this.view.calculateItemsCount(101)).toBe(4);
      });
      Then(function() {
        return expect(this.view.calculateItemsCount(80)).toBe(3);
      });
      Then(function() {
        return expect(this.view.calculateItemsCount(155)).toBe(6);
      });
      Then(function() {
        return expect(this.view.calculateItemsCount(20)).toBe(1);
      });
      Then(function() {
        return expect(this.view.setHeight(153)).toBe(150);
      });
      Then(function() {
        return expect(this.view.setHeight(26)).toBe(25);
      });
      Then(function() {
        return expect(this.view.setHeight(10)).toBe(this.view._defaultMaxItemsToShow * this.view._itemHeight);
      });
      Then(function() {
        var item;
        item = this.view.hightLightSingleItem(10);
        return expect(item.$el).toHaveClass("flightPointItem--over");
      });
      return Then(function() {
        var e, reportAboutCurrentResult;
        spyOn(this.view, "reportAboutCurrent").andCallThrough();
        this.view.scrollToIndex(2);
        expect(this.view._currentItemIndex).toBe(2);
        e = jQuery.Event("keydown", {
          keyCode: 64
        });
        reportAboutCurrentResult = this.view.reportAboutCurrent("down");
        expect(this.view.reportAboutCurrent).toHaveBeenCalled();
        return expect(reportAboutCurrentResult).toBe(2);
      });
    });
  });
});
