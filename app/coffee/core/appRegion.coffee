define [
    "marionette"
], (Marionette) ->
    class AppRegion extends Marionette.Region
        el: "#application"
        initialize: (opts) ->
            console.log "INIT region", opts

        start: ->
            console.log "STARTED", @test