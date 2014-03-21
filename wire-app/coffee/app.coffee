define [
    "appinstance"
], (App) ->

    App.addInitializer (options) ->
        console.log "App.addInitializer", options
        if !options.regionSelector
            throw new Error "Application region not specified!"

        App.addRegions application: options.regionSelector

    App.start = (options) ->
        console.log "START", options

    App.show = (view) ->
        console.log ":::::::SHOW:::::::", view
        @regionSelector.show view

    return App