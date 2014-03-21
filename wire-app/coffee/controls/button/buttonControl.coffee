define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    class ButtonControl extends Marionette.Layout

        tagName: "input"

        events: {
            "click"     : "onClick"
            "focus"     : "onFocus"
            "blur"      : "onBlur"
        }

        initialize: (options) ->
            console.log "options>>>>>>", options

            @context = Marionette.getOption @, "context"

            # @applyModelProperties([
            #             "states"
            #             "callback"
            #             "timeout"
            #             "caption"
            #             "triggerEvent"
            #         ], {prefix: @_attrPrefix})

            @$el.attr "type", "button"

        testButton: (str) ->
            console.log "STR::::", str

        onRender: -> 

        onFocus: ->
            @$el.addClass('focus')

        onBlur: ->
            @$el.removeClass('focus')



        onClick: (e) ->


        # public api provider
        publicApi: () ->
            return {
                "setActive": @setActive
            }




