# "extended" loaded on the reason of the need for extensions to the basic objects

define ["marionette", "handlebars", "handlebarsHelpers", "extended"], (Marionette, Handlebars) ->

    # TODO: for usage with trace meld aspect
    # class Reporter
    #     constructor: ->
    #         console.log "Reporter"

    #     onCall: (info) ->
    #         console.log "onCall", info

    #     onReturn: (info) ->
    #         console.log "onReturn", info

    #     onThrow: (info) ->
    #         console.log "onThrow", info

    # reporter = new Reporter() unless reporter?


    beforeEach -> 
        loadFixtures("comboboxControlFixture.html")
        loadFixtures("wrapperFixture.html")

        # --------------------- all Marionette necessary functions ---------------------
        # code from core/overridden
        Marionette.TemplateCache::loadTemplate = (templateId) ->
            template = templateId
            if not template or template.length is 0
                template = " "                 
            template

        Marionette.TemplateCache::compileTemplate = (rawTemplate) ->
            if !_.isFunction rawTemplate
                Handlebars.compile rawTemplate
            else 
                return rawTemplate
        # ------------------------------------------------------------------------------

        @addMatchers toBeInstanceOf: (type) ->
            @actual instanceof type

