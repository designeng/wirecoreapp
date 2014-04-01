define(["backbone", "marionette", "controls/link/linkControl"], function(Backbone, Marionette, LinkControl) {
  var view;
  view = null;
  Given(function() {
    var linkControlModel;
    linkControlModel = new Backbone.Model({
      text: "loc_AviaTickets",
      url: "!/testUrl",
      title: "someTitle",
      className: "linkClassName",
      highlightClass: "someHighLightClass"
    });
    return view = new LinkControl({
      model: linkControlModel
    });
  });
  return describe("LinkControl", function() {
    When(function() {
      this.$el = view.render().$el;
      return $(".wrapper").append(this.el);
    });
    Then(function() {
      return expect(view).toBeDefined();
    });
    Then(function() {
      return expect(view.translateText()).toBe("Авиабилеты");
    });
    Then(function() {
      expect(view._text).toBe("loc_AviaTickets");
      expect(view._url).toBe("!/testUrl");
      return expect(view._title).toBe("someTitle");
    });
    Then(function() {
      expect(this.$el).toHaveAttr("href", "!/testUrl");
      return expect(this.$el).toHaveAttr("title", "someTitle");
    });
    Then(function() {
      view.translateText();
      return expect(this.$el).toHaveText("Авиабилеты");
    });
    Then(function() {
      return expect(this.$el).toHaveClass("linkClassName");
    });
    Then(function() {
      return expect(view.isActive("#!/testUrl")).toBeTruthy();
    });
    Then(function() {
      view.activate();
      return expect(this.$el).toHaveClass("active");
    });
    Then(function() {
      view.hightLight(view._highlightClass);
      return expect(this.$el).toHaveClass("someHighLightClass");
    });
    return Then(function() {
      view.hightLight(view._highlightClass);
      view.unHightLight();
      return expect(this.$el).not.toHaveClass("someHighLightClass");
    });
  });
});
