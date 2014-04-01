define(["backbone", "marionette", "inputTextControl", "inputTextModel", "core/utils/view/getViewMethods", "meld", "trace"], function(Backbone, Marionette, InputTextControl, InputTextModel, getViewMethods, meld, trace) {
  var FlightNumberModel, input, inputTextModel, view;
  view = void 0;
  input = null;
  FlightNumberModel = Backbone.Model.extend({
    validation: {
      data: {
        required: true,
        pattern: 'flightNumber',
        msg: 'Please enter a valid flight number'
      }
    }
  });
  inputTextModel = new InputTextModel({
    name: "flightNumber",
    className: "inputTextControl content__inputTextControl",
    placeHolder: "flightNumber",
    value: "startValue123",
    width: 450,
    height: 30,
    fontSize: 20,
    errorPosition: "inline"
  });
  return describe("inputTextControl", function() {
    beforeEach(function() {
      view = new InputTextControl({
        model: inputTextModel,
        dataModel: new FlightNumberModel(),
        context: _.extend({}, Backbone.Events)
      });
      $(".wrapper").append(view.render().$el);
      return input = view.$el.find("input");
    });
    return describe("inputTextControl def", function() {
      Then(function() {
        return expect(view).toBeDefined();
      });
      Then(function() {
        return expect(view.getDataModel()).toBeDefined();
      });
      Then(function() {
        return expect(view.ensureDataModel()).toBeDefined();
      });
      Then(function() {
        return expect(view._context).toBeDefined();
      });
      Then(function() {
        return expect(view.ensureName()).toBe("flightNumber");
      });
      Then(function() {
        view.setWidth(345);
        return expect(input.css("width")).toBe("345px");
      });
      Then(function() {
        view.setHeight(50);
        return expect(input.css("height")).toBe("50px");
      });
      Then(function() {
        view.setValue("testValue");
        return expect(view.getValue()).toBe("testValue");
      });
      Then(function() {
        view.setValue("");
        return expect(view.isEmpty()).toBeTruthy();
      });
      Then(function() {
        return expect(input).not.toBeFocused();
      });
      Then(function() {
        view.setFocus();
        return expect(input).toBeFocused();
      });
      Then(function() {
        view.setDataModelValue("123");
        return expect(view.dataModel.get("data")).toBe("123");
      });
      Then(function() {
        view.setState("active");
        return expect(input).not.toHaveClass("inputPlaceHolder");
      });
      Then(function() {
        view.setState("active");
        view.setState("passive");
        return expect(input).toHaveClass("inputPlaceHolder");
      });
      Then(function() {
        view.setState("valid");
        return expect(input).not.toHaveClass(view.getStates()["invalid"]["className"]);
      });
      return Then(function() {
        var errors;
        errors = [];
        view.setState("invalid", errors);
        return expect(input).toHaveClass(view._states["invalid"]["className"]);
      });
    });
  });
});
