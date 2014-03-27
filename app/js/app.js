define(["appinstance", "core/modules/root/rootModule"], function(App, rootModule) {
  App.addInitializer(function(options) {
    if (!options.regionSelector) {
      throw new Error("Application region not specified!");
    }
    App.addRegions({
      application: options.regionSelector
    });
    return rootModule.start(options);
  });
  App.show = function(view) {
    console.log(":::::::SHOW:::::::", view);
    return this.regionSelector.show(view);
  };
  return App;
});
