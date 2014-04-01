define ["underscore"
        "backbone"
        "marionette"
        "controls/link/linkControl"
        "renderingService"
        "globalEvents"
        "meld"
        "attributesToString"
        "core/ioc/utils/getActualTypes"
        "core/ioc/utils/afterTypesLoaded"
], (_, Backbone, Marionette, LinkControl, renderingService, globalEvents, meld, attributesToString, getActualTypes, afterTypesLoaded) ->

    start = false

    view = null
    region = null
    buffer = null

    viewModel = 
        className: "linkClassName"
        innerComponent:
            innerComponentType: "textControl"
            connectTo: "confirm"
            model: new Backbone.Model
                text: "textControlText"
            behaviour:
                toggle: true
            buffer: []

    beforeEachFunc = () ->
        waitsFor(()->
                return start
            , "error with injected types loading", 1000)
        runs ->
            view = new LinkControl(
                    model: new Backbone.Model(viewModel)
                )                

            @$el = view.render().$el
            $(".wrapper").append @$el
            region = view.regionManager.get("rsRegion")

            # view click confirmation - see core interaction with renderingService
            view.confirm()

    describe "renderingService spec", ->

        types = getActualTypes(attributesToString(viewModel))   

        callback = (res) =>
            start = true                

        errback = (err) ->
            console.log "ERROR", err

        afterTypesLoaded(types, callback, errback)

        beforeEach ->
            beforeEachFunc()
                
        Then ->
            expect(view.regions).toBeDefined()
            expect(view.regions.rsRegion).toBeDefined()
        Then ->
            expect(region).toBeDefined()
        Then ->
            expect(view.regions.rsRegion.el).toBe("." + view.cid + "_rsRegion")
        Then ->
            expect(view.model.get("innerComponent")).toBeDefined()
        Then ->
            expect(view.model.get("innerComponent").buffer).toBeArray()
        Then ->            
            expect(renderingService.currentActiveCid).toBe view.cid
        Then ->
            # inner control rendered with own text
            expect(view.$el).toHaveText "textControlText"
        Then ->
            # should return undefined value of currentActiveCid
            expect(renderingService.onHtmlClick()).not.toBeDefined()
            expect(renderingService.currentActiveCid).not.toBeDefined()
        Then ->
            spyOn renderingService, "closeCurrentActive"
            curCid = renderingService.currentActiveCid
            renderingService.onHtmlClick()
            expect(renderingService.closeCurrentActive).toHaveBeenCalled()
            expect(renderingService.currentActiveCid).not.toBeDefined()


            # view.trigger "show:inner", view
            # expect(renderingService.currentActiveCid).not.toBeDefined()



