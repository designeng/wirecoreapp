define(["backbone", "marionette", "comboboxControl", "controls/combobox/input/comboboxInputView", "inputTextModel", "dropDownListModel"], function(Backbone, Marionette, ComboboxControl, ComboboxInputView, InputTextModel, DropDownListModel) {
  var AutocompleteInputModel, comboboxControl, comboboxControlModel, comboboxControlRenderedEl, input;
  comboboxControlRenderedEl = null;
  input = null;
  AutocompleteInputModel = Backbone.Model.extend({
    validation: {
      data: {
        required: true,
        msg: 'Please enter a valid VALUE'
      }
    }
  });
  comboboxControlModel = new InputTextModel({
    name: "flightFrom",
    className: "inputTextControl content__inputTextControl",
    placeHolder: "flightFrom",
    label: "Input email",
    width: 450,
    height: 30,
    fontSize: 20,
    errorPosition: "inline",
    dropDownListControlModel: new DropDownListModel({
      className: "dropDownList",
      width: 600,
      height: 400,
      listHeight: 400,
      display: true,
      defaultMaxItemsToShow: 10,
      firstVisible: 3,
      itemType: "flightPointControl",
      itemClassName: "flightPointItem",
      itemHeight: 25,
      itemOverClass: "flightPointItem--over"
    }),
    url: "/services/rest/v1/dictionaries/autoComplete/flightPoints",
    startInputLength: 2
  });
  comboboxControl = new ComboboxControl({
    model: comboboxControlModel,
    dataModel: new AutocompleteInputModel()
  });
  return describe("comboboxControl", function() {
    describe("comboboxControlModel def", function() {
      return Then(function() {
        return expect(comboboxControlModel).toBeDefined();
      });
    });
    describe("comboboxControl", function() {
      Then(function() {
        return expect(comboboxControl).toBeDefined();
      });
      return Then(function() {
        return expect(comboboxControl.template).toBeDefined();
      });
    });
    return describe("comboboxControl after render", function() {
      Then(function() {
        comboboxControlRenderedEl = comboboxControl.render().$el;
        return $(".comboboxControlWrapper").append(comboboxControlRenderedEl);
      });
      Then(function() {
        return expect(comboboxControlRenderedEl).toContainText("Input email");
      });
      Then(function() {
        return expect(comboboxControlRenderedEl).toHaveClass('comboboxControl');
      });
      Then(function() {
        return expect(comboboxControl.textinputRegion).toBeDefined();
      });
      Then(function() {
        return expect(comboboxControl.input).toBeDefined();
      });
      Then(function() {
        input = comboboxControl.input;
        return expect(input).toBeInstanceOf(ComboboxInputView);
      });
      Then(function() {
        return expect(comboboxControl.textinputRegion.show(input)).toBe("");
      });
      return Then(function() {
        return expect(input.$el.find("input")).toHaveValue("flightFrom");
      });
    });
  });
});
