var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "marionette"], function(Backbone, Marionette) {
  var ButtonControl, _ref;
  return ButtonControl = (function(_super) {
    __extends(ButtonControl, _super);

    function ButtonControl() {
      _ref = ButtonControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ButtonControl.prototype.tagName = "input";

    ButtonControl.prototype.events = {
      "click": "onClick",
      "focus": "onFocus",
      "blur": "onBlur"
    };

    ButtonControl.prototype.initialize = function(options) {
      console.log("options>>>>>>", options);
      this.context = Marionette.getOption(this, "context");
      return this.$el.attr("type", "button");
    };

    ButtonControl.prototype.testButton = function(str) {
      return console.log("testButton called ---- ", str);
    };

    ButtonControl.prototype.onRender = function() {};

    ButtonControl.prototype.onFocus = function() {
      return this.$el.addClass('focus');
    };

    ButtonControl.prototype.onBlur = function() {
      return this.$el.removeClass('focus');
    };

    ButtonControl.prototype.onClick = function(e) {};

    ButtonControl.prototype.publicApi = function() {
      return {
        "setActive": this.setActive
      };
    };

    return ButtonControl;

  })(Marionette.Layout);
});
