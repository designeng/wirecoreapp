define(["backbone", "marionette", "baseLayoutObject"], function(Backbone, Marionette, BaseLayoutObject) {
  return _.extend(Marionette.Layout.prototype, BaseLayoutObject);
});
