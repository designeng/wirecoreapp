define(["marionette", "handlebars", "handlebarsHelpers", "extended"], function(Marionette, Handlebars) {
  return beforeEach(function() {
    loadFixtures("comboboxControlFixture.html");
    loadFixtures("wrapperFixture.html");
    Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
      var template;
      template = templateId;
      if (!template || template.length === 0) {
        template = " ";
      }
      return template;
    };
    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
      if (!_.isFunction(rawTemplate)) {
        return Handlebars.compile(rawTemplate);
      } else {
        return rawTemplate;
      }
    };
    return this.addMatchers({
      toBeInstanceOf: function(type) {
        return this.actual instanceof type;
      }
    });
  });
});
