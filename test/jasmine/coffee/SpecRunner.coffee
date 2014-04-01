# autoconcatenation with require.config - see app/coffee/requireConfig.coffee, Gruntfile

# and add to paths jquery.simulate
requirejs.s.contexts._.config["paths"]["jquery.simulate"] = "/tests/jasmine/js/lib/jquery.simulate"
requirejs.s.contexts._.config["paths"]["flat"] = "/tests/jasmine/js/lib/flat"
requirejs.s.contexts._.config["paths"]["attributesToString"] = "/tests/jasmine/js/common/develop/attributesToString"
#index.js - list with runing specs
require [
    "jquery"
    "underscore"
    "js/SpecIndex.js"
    "/tests/jasmine/js/common/beforeEach.js"
    "/tests/jasmine/js/common/afterEach.js"
], ($, _, index) ->

    jasmineEnv = jasmine.getEnv()
    htmlReporter = new jasmine.HtmlReporter()
    jasmineEnv.addReporter htmlReporter
    jasmineEnv.specFilter = (spec) ->
        htmlReporter.specFilter spec

    pathToSpec = "/tests/jasmine/js/spec/"
    extention = ".js"
    specs = _.map(index.specs, (spec) ->
                    return spec = pathToSpec + spec + extention
                )

    $ ->
        jasmine.getFixtures().fixturesPath = "/tests/jasmine/fixtures"
        require specs, ->
            jasmineEnv.execute()

