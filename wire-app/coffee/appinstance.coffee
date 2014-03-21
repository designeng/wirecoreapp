define [
    "marionette"
], (Marionette) ->
    console.log "Marionette", Marionette
    return app = new Marionette.Application() unless app?