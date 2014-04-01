define [
        "backbone"
        "marionette"
        "controls/link/linkControl"
        ], (Backbone, Marionette, LinkControl) ->

    view = null
    Given ->    
        # LinkControl model
        linkControlModel = new Backbone.Model(
                text: "loc_AviaTickets"
                url: "!/testUrl"
                title: "someTitle"
                className: "linkClassName"
                highlightClass: "someHighLightClass"

            )

        view = new LinkControl(
                model: linkControlModel
            )

    describe "LinkControl", -> 
        When ->
            @$el = view.render().$el
            $(".wrapper").append @el

        Then ->
            expect(view).toBeDefined()
        Then ->
            expect(view.translateText()).toBe "Авиабилеты"
        Then ->
            expect(view._text).toBe "loc_AviaTickets"
            expect(view._url).toBe "!/testUrl"
            expect(view._title).toBe "someTitle"
        Then ->
            expect(@$el).toHaveAttr "href", "!/testUrl"
            expect(@$el).toHaveAttr "title", "someTitle"
        Then ->
            view.translateText()
            expect(@$el).toHaveText "Авиабилеты"
        Then ->
            expect(@$el).toHaveClass "linkClassName"
        Then ->
            expect(view.isActive("#!/testUrl")).toBeTruthy()
        Then ->
            view.activate()
            expect(@$el).toHaveClass "active"
        Then ->
            view.hightLight(view._highlightClass)
            expect(@$el).toHaveClass "someHighLightClass"
        Then ->
            view.hightLight(view._highlightClass)
            view.unHightLight()
            expect(@$el).not.toHaveClass "someHighLightClass"

            






