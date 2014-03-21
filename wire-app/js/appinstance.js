define(["marionette"], function(Marionette) {
  var app;
  console.log("Marionette", Marionette);
  if (typeof app === "undefined" || app === null) {
    return app = new Marionette.Application();
  }
});
