define [
    "marionette"
], (Marionette) ->
    class SecondComponent extends Marionette.Controller

        initialize: (opts) ->
            console.log "SecondComponent OPTIONS", opts

        start: ->
            console.log "SecondComponent test property injection", @injectedProp