define ["underscore"
        "backbone"
        "marionette"
        "tableControl"
        "core/utils/collection/strategy/simpleComparison"
        "core/utils/develop/collectionGenerator"
        "core/utils/view/getViewMethods"
        "attributesToString"
        "core/ioc/utils/getActualTypes"
        "core/ioc/utils/afterTypesLoaded"
], (_, Backbone, Marionette, TableControl, simpleComparison, collectionGenerator, getViewMethods, attributesToString, getActualTypes, afterTypesLoaded) ->
    
    start = false
    viewModel = null
    view = undefined
    headerClassPrefix = ""
    header_1 = null

    types = null
    eventBus = _.extend {}, Backbone.Events

    beforeEachFunc = () ->
        waitsFor(()->
                return start
            , "error with injected types loading", 1000)
        runs ->
            view = new TableControl(
                    model: new Backbone.Model(viewModel)
                )
            $(".wrapper").append view.render().$el
            view.initTemplateVariables()
            headerClassPrefix = view._headerClassPrefix


    describe "TableControl spec", ->
        viewModel = 
            context: eventBus

            className: "tableControl"
            width: 400

            headers: ["loc_MyOrders", "loc_MyOrders"]
            headerClassPrefix: "header_"

            itemType: "controls/table/row/tableRowControl"
            headerType: "controls/table/header/tableHeaderControl"
            bodyType: "controls/table/body/tableBodyControl"

            visibleModelFields: ["data", "nextfield"]
            sortableFields: ["nextfield"]

            collectionStrategy: simpleComparison

            itemClassName: "tableItem"
            itemHeight: 20

        types = getActualTypes(attributesToString(viewModel))

        callback = (res) =>
            start = true                

        errback = (err) ->
            console.log "ERROR", err

        afterTypesLoaded(types, callback, errback)

        beforeEach ->
            beforeEachFunc()

        When ->
            collection = collectionGenerator(7, ["data", "nextfield"], {mode: "numbers"})
            view.exposeCollection(collection)

        Then ->
            collection = collectionGenerator(7, ["data", "nextfield"], {mode: "numbers"})
            view.exposeCollection(collection)
            expect(types).toBeArrayOfStrings()
    #     Then ->
    #         expect(types).toBeArrayOfSize 3
    #     Then ->
    #         expect(view).toBeDefined()
    #     Then ->
    #         expect(view.getCollection().length).toBe 8
    #     Then ->
    #         expect(view.headerView).toBeDefined()
    #     Then ->
    #         expect(view.bodyView).toBeDefined()
    #     Then ->
    #         expect(view._itemType).toBe("controls/table/row/tableRowControl")
    #         expect(view._headerType).toBe("controls/table/header/tableHeaderControl")
    #         expect(view._bodyType).toBe("controls/table/body/tableBodyControl")
    #     Then ->
    #         expect(view.itemViewClass instanceof Function).toBeTruthy()
    #         expect(view.headerViewClass instanceof Function).toBeTruthy()
    #         expect(view.bodyViewClass instanceof Function).toBeTruthy()
    #     Then ->
    #         expect(view.applyModelProperties).toBeDefined()
    #     Then ->
    #         expect(view.headerView.translateHeaders(["loc_MyOrders"])[0]).toBe "Мои заказы"
    #     Then ->
    #         expect(view.bodyView.collection instanceof Backbone.Collection).toBeTruthy()
    #         expect(view.bodyView.collection.length).toBe 8

    # describe "TableControl header click and collection sorting test", ->
    #     beforeEach ->
    #         beforeEachFunc()

    #     When ->
    #         headerClassSelector = '.' + headerClassPrefix + '1'
    #         spyEvent = spyOnEvent(headerClassSelector, 'click')
    #         header_1 = view.headerView.$el.find(headerClassSelector)

    #     Then ->
    #         header_1.click()
    #         expect(header_1).toHaveClass("upSorting")

    #     Then ->
    #         header_1.click()
    #         header_1.click()
    #         expect(header_1).toHaveClass("downSorting")

    #     # TableControl added item with public api (by event)
    #     Then ->
    #         header_1.click()

    #         item = new Backbone.Model(
    #             nextfield: "00000_new"
    #         )
    #         eventBus.trigger "sortedtable:additem", item

    #         expect(view.getCollection().length).toBe 9
    #         expect(view.getCollection().at(0).get "nextfield").toBe "00000_new"

    #     # TODO: split into smaller volume specs
        
    #     # Then ->
    #     #     collectionLength = view.getCollection().length
    #     #     field = viewModel.get("sortableFields")[0]

    #     #     # just to mark
    #     #     firstItemValue = null
    #     #     lastItemValue = null
    #     #     firstItemValueAfterSecondClick = null
    #     #     lastItemValueAfterSecondClick = null                    
     
    #     #     # click on header field first time - collectiion must be sorted first time
    #     #     header_1.click()

    #     #     expect(view.collection.sortDirection).toBe 1

    #     #     view.getCollection().each((item, index)->
    #     #             if index == 0
    #     #                 firstItemValue = item.get field
    #     #             if index == collectionLength - 1
    #     #                 lastItemValue = item.get field
    #     #         )

    #     #     # click on header field second time
    #     #     header_1.click()

    #     #     expect(view.collection.sortDirection).toBe -1

    #     #     view.getCollection().each((item, index)->
    #     #             if index == 0
    #     #                 firstItemValueAfterSecondClick = item.get field
    #     #             if index == collectionLength - 1
    #     #                 lastItemValueAfterSecondClick =  item.get field
    #     #         )
                        
    #     #     expect(firstItemValueAfterSecondClick).toBe lastItemValue
    #     #     expect(lastItemValueAfterSecondClick).toBe firstItemValue










   