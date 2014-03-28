define [
    "backbone"
    "marionette"
    "controls/table/controller/tableController"
], (Backbone
    Marionette
    TableController
    ) -> 

    class TableOptions
        itemHeight: 10
        itemType: "tableRowControl"
        headerType: "tableHeaderControl"
        bodyType: "tableBodyControl"
        visibleModelFields: ""
        sortableFields: ""

        # .......

    
    # define two special region types
    class TableHeaderRegionType extends Marionette.Region
        el: ".tableHeader"

        open: (view) ->
            @$el.replaceWith view.el

    class TableBodyRegionType extends Marionette.Region
        el: ".tableBody"

        open: (view) ->
            @$el.replaceWith view.el

    # define table control main view
    class TableControl extends Marionette.Layout

        # current template elements will be replaced with regions elements
        template: "<thead class='tableHeader'></thead><tbody class='tableBody'></tbody>"

        tagName: "table"

        regions:
            tableHeaderRegion: TableHeaderRegionType
            tableBodyRegion: TableBodyRegionType

        eventBus: _.extend {}, Backbone.Events

        initialize: (options) ->
            console.log "options:::::::::::::::::::", options

            @applyModelProperties([
                "itemHeight"
                "itemType"
                "headerType"
                "bodyType"
                "visibleModelFields"
                "sortableFields"
                "collection" # if exists it will be passed to tableController in initTableController
                "collectionStrategy"
                "headers"
                "headerClassPrefix"
                "headerHeight"
                ], {prefix: "_"})            

            @applyDefaults()

            @resolveClasses()

            # bind public api function to @context event
            _.bindAll @, "addItemToCollection", "exposeCollection"
            @context.on "sortedtable:additem", @addItemToCollection

            @initTableController(@_collection)


        initTableController: (collection) ->
            @tableController = new TableController(
                    collection: collection
                    collectionStrategy: @_collectionStrategy
                )

        applyDefaults: ->
            if !@_headerClassPrefix
                @_headerClassPrefix = "header_"

        initTemplateVariables: ->
            @_thead = @$el.find('thead:first')

        getCollection: ->
            return @tableController.getCollection()

        resolveClasses: ->            
            @itemViewClass = require @_itemType if @_itemType
            
            @headerViewClass = require @_headerType if @_headerType
            
            @bodyViewClass = require @_bodyType if @_bodyType

        onBeforeRender: ->
            @createSubViews()

        createSubViews: ->
            if @_headerType
                @headerView = new @headerViewClass
                    eventBus: @
                    columns: @_visibleModelFields
                    tableController: @tableController
                    headerHeight: @_headerHeight
                    sortableFields: @_sortableFields
                    headers: @_headers
                    headerClassPrefix: @_headerClassPrefix

        onExposeCollection: -> 
            if @_bodyType
                @bodyView = new @bodyViewClass
                    eventBus: @
                    itemView: @itemViewClass
                    collection: @tableController.getCollection()
                    columns: @_visibleModelFields
                    itemHeight: @_itemHeight

            if @_headerType
                @tableHeaderRegion.show @headerView
            if @_bodyType
                @tableBodyRegion.show @bodyView

            @initTemplateVariables()    

        _setProperties: (obj, attrs, mapping) ->
            for attr in attrs
                if mapping && mapping[attr]
                    attr = mapping[attr]
                obj.set attr, @[@_attrPrefix + attr]
            return obj

        # public api

        # @param {Backbone.Model} item Some model with corresponding fields
        addItemToCollection: (item) ->
            @tableController.addItemToCollection item

        # @param {Backbone.Collection} collection External collection to expose in table control
        exposeCollection: (collection) ->
            @tableController.setCollection collection
            # this control method "onExposeCollection" will be triggered
            @triggerMethod "expose:collection"
            
        # /public api

        # public api provider
        publicApi: () ->
            return {
                "addItemToCollection": @addItemToCollection
                "exposeCollection": @exposeCollection
                "getCollection": @getCollection
            }
