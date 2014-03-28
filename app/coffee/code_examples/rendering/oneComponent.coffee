define [
    "marionette"
], (Marionette) ->
    class OneComponent extends Marionette.Controller

        initialize: (opts) ->
            console.log "OneComponent OPTIONS", opts