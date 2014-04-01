define(["underscore", "backbone", "marionette", "infoControl"], function(_, Backbone, Marionette, InfoControl) {
  var beforeEachFunc, view;
  view = void 0;
  beforeEachFunc = function() {
    return runs(function() {
      var infoControlModel;
      infoControlModel = new Backbone.Model({
        cases: [
          {
            firstField: "loc_FlightPointNotFound"
          }, {
            secondField: "second_field_value"
          }, {
            thirdField: "third_field_value"
          }
        ]
      });
      view = new InfoControl({
        model: infoControlModel
      });
      return $(".wrapper").append(view.render().$el);
    });
  };
  return describe("infoControl", function() {
    beforeEach(function() {
      return beforeEachFunc();
    });
    Then(function() {
      return expect(view).toBeDefined();
    });
    Then(function() {
      return expect(view.collection.length).toBe(3);
    });
    Then(function() {
      return expect(view.collection.getCollectionStream).toBeDefined();
    });
    Then(function() {
      return expect(view.collection.at(0).get("value")).toBe("Ничего не найдено");
    });
    Then(function() {
      return expect(view.collection.at(1).get("value")).toBe("second_field_value");
    });
    Then(function() {
      var modelSet;
      modelSet = view.chooseModelByKey(view.collection, "firstField");
      return expect(modelSet[0] instanceof Backbone.Model).toBeTruthy();
    });
    Then(function() {
      view.setInfoCases([]);
      expect(view.collection.length).toBe(0);
      return expect(view.$el.html()).toBe("");
    });
    return Then(function() {
      view.setInfoCases(["firstField"]);
      expect(view.collection.length).toBe(1);
      return console.log(view.$el.html());
    });
  });
});
