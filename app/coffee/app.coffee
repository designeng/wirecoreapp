define [
    "appinstance"
    "core/modules/root/rootModule"
], (App, rootModule) ->

    App.addInitializer (options) ->
        if !options.regionSelector
            throw new Error "Application region not specified!"

        App.addRegions application: options.regionSelector  


        rootModule.start(options)




    App.show = (view) ->
        console.log ":::::::SHOW:::::::", view
        @regionSelector.show view

    return App