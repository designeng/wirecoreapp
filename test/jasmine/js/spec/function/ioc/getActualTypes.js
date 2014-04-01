define(["attributesToString", "core/ioc/utils/getActualTypes"], function(attributesToString, getActualTypes) {
  var model, _str;
  _str = null;
  model = {
    className: "linkClassName",
    innerComponent: {
      innerComponentType: "someInnerControl",
      model: new Backbone.Model({
        itemType: "linkControl"
      })
    },
    buffer: []
  };
  return describe("ioc getActualTypes function", function() {
    When(function() {
      return _str = attributesToString(model);
    });
    Then(function() {
      return expect(getActualTypes(_str)).toBeArrayOfSize(2);
    });
    Then(function() {
      return expect(getActualTypes(_str)).toBeArrayOfStrings();
    });
    return Then(function() {
      return expect(getActualTypes(_str)[0]).toBe("someInnerControl");
    });
  });
});
