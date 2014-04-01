require(["jquery", "underscore", "js/SpecIndex.js", "/test/jasmine/js/common/beforeEach.js"], function($, _, index) {
  var extention, htmlReporter, jasmineEnv, pathToSpec, specs;
  jasmineEnv = jasmine.getEnv();
  htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
  pathToSpec = "/test/jasmine/js/spec/";
  extention = ".js";
  specs = _.map(index.specs, function(spec) {
    return spec = pathToSpec + spec + extention;
  });
  return $(function() {
    jasmine.getFixtures().fixturesPath = "/test/jasmine/fixtures";
    return require(specs, function() {
      return jasmineEnv.execute();
    });
  });
});
