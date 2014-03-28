define(["core/utils/view/applyModelProperties"], function(applyModelProperties) {
  var BaseViewObject;
  return BaseViewObject = {
    defaultClassName: function(name) {
      if (this.model.has("className")) {
        return this.model.get("className");
      } else {
        return name;
      }
    },
    applyModelProperties: function(properties, options) {
      return applyModelProperties.call(this, properties, options);
    },
    applyOptions: function(options, opt) {
      return applyOptions.call(this, options, opt);
    }
  };
});
