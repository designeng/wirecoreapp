# autoconcatenation with require.config - see app/coffee/requireConfig.coffee, Gruntfile

require [
    "jquery"
    "underscore"
    "js/SpecIndex.js"
    "/test/jasmine/js/common/beforeEach.js"
], ($, _, index) ->

    jasmineEnv = jasmine.getEnv()
    htmlReporter = new jasmine.HtmlReporter()
    jasmineEnv.addReporter htmlReporter
    jasmineEnv.specFilter = (spec) ->
        htmlReporter.specFilter spec

    pathToSpec = "/test/jasmine/js/spec/"
    extention = ".js"
    specs = _.map(index.specs, (spec) ->
                    return spec = pathToSpec + spec + extention
                )

    $ ->
        jasmine.getFixtures().fixturesPath = "/test/jasmine/fixtures"
        require specs, ->
            jasmineEnv.execute()

