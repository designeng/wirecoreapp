define [
        "jquery"
        "underscore"
        "backbone"
        "marionette"
        "when"
        "dropDownListControl"
        "dropDownListModel"
        "attributesToString"
        "core/ioc/utils/getActualTypes"
        "core/ioc/utils/afterTypesLoaded"
        "jquery.simulate"
], ($, _, Backbone, Marionette, When, DropDownListControl, DropDownListModel, attributesToString, getActualTypes, afterTypesLoaded) ->

    view = undefined
    mask = null
    dropDownView = null
    listController = null
    rangeService = null
    highLightService = null
    scrollingService = null
    reportingService = null

    # spec start variables
    start = false
    collectionPopulated = false

    controlModel = new DropDownListModel
        width: 326
        height: 400
        listHeight: 400
        display: true
        defaultMaxItemsToShow: 10
        firstVisible: 0
        noItemsMessage: "loc_FlightPointNotFound" 
        # item specifications
        itemType: "flightPointControl"
        itemClassName: "flightPointItem"
        itemHeight: 20
        itemOverClass: "flightPointItem--over"

    beforeEachFunc = () ->
        waitsFor(()->
                return start
            , "error with injected types loading", 1000)
        runs ->
            view = new DropDownListControl
                model: controlModel
                context: _.extend {}, Backbone.Events

            When(view.dropDownService.promiseRendered()).then((targetView) ->
                    for i in [0...20]
                        item = new Backbone.Model
                            name: "itemname_" + i
                        targetView.addItemToCollection item
                    # for start next test batch (see wait for collectionPopulated)
                    collectionPopulated = true
                    targetView.render()

                    When(targetView.controller.rangeService.getCollectionLengthPromise()).then((val) ->
                            console.log "getCollectionLengthPromise", val
                        )
                )

            $(".wrapper").append view.render().$el
            mask = view.maskService.getMaskView()
            dropDownView = view.dropDownService.getDropDownView()
            listController = dropDownView.controller
            rangeService = dropDownView.controller.rangeService
            reportingService = view.reportingService

    afterEachFunc = () ->
        view.resetCollection()

    describe "dropDownListControl", ->
        types = getActualTypes(attributesToString(controlModel))

        callback = (res) =>
            start = true                

        errback = (err) ->
            console.log "ERROR", err

        afterTypesLoaded(types, callback, errback)

        beforeEach ->
            beforeEachFunc()

        afterEach ->
            afterEachFunc()

        When ->
            view.dropDownService.promiseRendered()

        Then ->
            expect(view).toBeDefined()
        Then ->
            # test default class name
            expect(view.$el).toHaveClass "dropDownListHolder"

        Then ->
            expect(mask.$el).toHaveClass "maskServiceView"
            expect(mask.$el).toHaveCss display: "none"

        Then ->
            expect(view.maskService.setMaskStatus).toBeDefined()

        # dropDownService
        Then ->
            expect(view.dropDownService).toBeDefined()
        Then ->
            expect(view.dropDownService.getDropDownView).toBeDefined()
        Then ->
            expect(view.dropDownService.itemType).toBeDefined()
        Then ->
            expect(view.dropDownService.itemViewClass).toBeFunction()

        # promise in dropDownService for dropDownView rendering
        Then ->
            expect(view.dropDownService.promiseRendered).toBeFunction()
        Then ->
            expect(view.dropDownService.promiseRendered()).toBeObject()

        # keyboardService
        Then ->
            expect(dropDownView.keyboardService).toBeDefined()
        Then ->
            expect(dropDownView.keyboardService.extendWithKeyMethods).toBeDefined()

        # controller
        Then ->
            expect(dropDownView.controller).toBeDefined()


    # all tests depends each other! collection length is changed from test to test!!!
    # here we explore once created instance of view (and dropDownView, of course) 
    describe "dropDownListControl wait for collectionPopulated", ->
        beforeEach ->
            waitsFor(()->
                    return collectionPopulated
                , "error with collectionPopulated", 1000)
            runs ->
                highLightService = dropDownView.controller.highLightService
                scrollingService = dropDownView.controller.scrollingService

        Then ->
            expect(view.resetCollection).toBeFunction()
        Then ->
            expect(view.cropCollection).toBeFunction()
        Then ->
            expect(dropDownView.cropCollection).toBeFunction()
        Then ->    
            expect(dropDownView.resetCollection).toBeFunction()
        Then ->    
            expect(dropDownView.getCollectionLength).toBeFunction()
        Then ->    
            expect(dropDownView.addItemToCollection).toBeFunction()
        Then ->
            expect(dropDownView.getCollectionLength()).toBe 20

        # interaction with controller
        Then ->
            view.setHeight 62
            expect(rangeService.getFirst()).toBe 0
            expect(rangeService.getLast()).toBe 2

        Then ->
            view.setHeight 85
            expect(rangeService.getFirst()).toBe 0
            expect(rangeService.getLast()).toBe 3
        Then ->
            expect(rangeService.getRange()).toBe 3
        Then ->
            view.setHeight 104
            expect(rangeService.getRange()).toBe 4
        Then ->
            rangeService.setActive(6)
            listController.pageUp()
            expect(rangeService.getActive()).toBe 2
        Then ->
            listController.decrease()
            listController.decrease()
            expect(rangeService.getActive()).toBe 0
        Then ->
            rangeService.setActive(10)
            listController.home()
            expect(highLightService.getItemByIndex(0).$el).toHaveClass "flightPointItem--over"
            expect(rangeService.getActive()).toBe 0
        Then ->
            listController.end()
            expect(highLightService.getItemByIndex(19).$el).toHaveClass "flightPointItem--over"
            expect(rangeService.getActive()).toBe 19
            # console.log rangeService.getActive(), rangeService.getFirst(), rangeService.getLast(), rangeService.getRange()
        Then ->
            listController.pageUp()
            listController.pageUp()
            listController.pageUp()
            expect(rangeService.getActive()).toBe 7

        Then ->
            expect(highLightService).toBeDefined()
        Then ->  
            # is highlighted
            expect(highLightService.getItemByIndex(7).$el).toHaveClass "flightPointItem--over"
        Then ->
            listController.pageDown()
            listController.pageDown()
            expect(highLightService.getItemByIndex(15).$el).toHaveClass "flightPointItem--over"

        Then ->
            view.setHeight 245
            expect(rangeService.getRange()).toBe 11
        Then ->
            listController.pageUp()
            listController.pageUp()
            expect(rangeService.getActive()).toBe 0
        Then ->
            expect(rangeService.getFirst()).toBe 0

        Then ->
            expect(scrollingService).toBeDefined()
        Then ->
            expect(view.maskService).toBeDefined()            
            expect(view.maskService.getMaskStatus()).toBe "shown"
        Then -> 
            view.setHeight 242
            expect(view.maskService.getMaskHeight()).toBe "200px"

        Then -> 
            rangeService.setActive(2)
            listController.enter()
            expect(reportingService.getCurrentModel().get "name").toBe "itemname_2"


    # describe "dropDownListControl wait for collectionPopulated", ->
    #     beforeEach ->
    #         waitsFor(()->
    #                 return collectionPopulated
    #             , "error with collectionPopulated", 1000)
    #         runs ->

    #     Then ->            
    #         target = dropDownView.$el.find("li:eq(5)")
    #         target.simulate('click')
    #         expect(reportingService.getCurrentModel().get "name").toBe "itemname_3"

        
            




            


