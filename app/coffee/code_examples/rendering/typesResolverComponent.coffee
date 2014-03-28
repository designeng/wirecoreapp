define [
    "marionette"
    "core/utils/ioc/getActualTypes"
], (Marionette, getActualTypes) ->

    class TypesResolverComponent extends Marionette.Controller

        initialize: (opts) ->
            console.log "SecondComponent OPTIONS", opts

        start: ->
            console.log "SecondComponent test property injection", @injectedProp

        getTypes: (declaration) ->
            types = getActualTypes(JSON.stringify declaration)

        confirmResult: (result) ->
            console.log "RESULT:::::", result
