define ["underscore"
        "backbone"
        "marionette"
        # testing from reserve - reserved version of control
        "controls/dropdownlist/reserve/listCompositeView"
        "core/utils/develop/collectionGenerator"
        "core/utils/view/getViewMethods"
        "meld"
        "trace"
], (_, Backbone, Marionette, ListCompositeView, collectionGenerator, getViewMethods, meld, trace) ->
    describe "ListCompositeView", ->
        Given ->     
            @viewModel = new Backbone.Model(
                    className: "dropDownList"
                    width: 600
                    listHeight: 400
                    display: true
                    defaultMaxItemsToShow: 10
                    firstVisible: 0
                    noItemsMessage: "loc_FlightPointNotFound"

                    # item specifications
                    itemClassName: "flightPointItem"
                    itemHeight: 25
                    itemOverClass: "flightPointItem--over"
                )

            @eventBus = _.extend {}, Backbone.Events

            @view = @reservedView = new ListCompositeView(
                        model: @viewModel
                        eventBus: @eventBus
                    )

        Given -> @prototype = ListCompositeView::

        # common when
        When ->
            $(".wrapper").append @view.render().$el

        describe "listCompositeView after render", ->
            Then ->
                expect(@viewModel).toBeDefined()
            Then ->
                expect(@view).toBeDefined()
            Then ->
                expect(@view.itemView).toBeDefined()
            Then ->
                expect(@view.emptyView).toBeDefined()
            Then ->
                expect(@view._width).toBe(600)
            Then ->
                expect(@view._itemHeight).toBe(25)
            Then ->
                expect(@view._itemOverClass).toBe("flightPointItem--over")


        describe "listCompositeView after render resieved collection and eventBus", ->
            When ->
                # in array listed non-tracing methods
                # methods = getViewMethods.call @view, ["itemView", "keyOn", "_setProperties", "onBeforeItemAdded"]
                
                # for m in methods
                #     meld(@view, m, trace())

                @view.collection = collectionGenerator(19, "Item", {prefix: "_"})
                $(".wrapper").append @view.render().$el

            Then ->
                expect(@view.collection.length).toBe 20
            Then ->
                @view.processCollection @view.collection
                expect(@view.children.findByIndex(10).model.attributes["modelIndex"]).toBeDefined()
            Then ->
                expect($(".wrapper").height()).toBe (@view._defaultMaxItemsToShow * @view._itemHeight)
            Then ->
                expect(@view.calculateItemsCount(101)).toBe 4
            Then ->
                expect(@view.calculateItemsCount(80)).toBe 3
            Then ->
                expect(@view.calculateItemsCount(155)).toBe 6
            Then ->
                expect(@view.calculateItemsCount(20)).toBe 1
            Then ->
                expect(@view.setHeight(153)).toBe 150
            Then ->
                expect(@view.setHeight(26)).toBe 25
            Then ->
                expect(@view.setHeight(10)).toBe(@view._defaultMaxItemsToShow * @view._itemHeight)

            Then ->
                item = @view.hightLightSingleItem(10)
                expect(item.$el).toHaveClass "flightPointItem--over"
            
            # will be falled - "reportAboutCurrent" removed
            Then ->
                spyOn(@view, "reportAboutCurrent").andCallThrough()
                @view.scrollToIndex(2)
                expect(@view._currentItemIndex).toBe 2
                e = jQuery.Event( "keydown", { keyCode: 64 } )

                reportAboutCurrentResult = @view.reportAboutCurrent("down")
                expect(@view.reportAboutCurrent).toHaveBeenCalled()
                expect(reportAboutCurrentResult).toBe 2











