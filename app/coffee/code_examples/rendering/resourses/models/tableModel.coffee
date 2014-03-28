define [
    "backbone"
    "./../strategy/simpleComparison"
], (Backbone, simpleComparison) -> 

    class TableModel extends Backbone.Model
        defaults:
            className: "tableControl"
            width: 400

            # test detect injection
            inject: ["typeOne", "typeTwo"]

            headers: ["loc_MyOrders", undefined, "loc_MyOrders",  undefined,  "loc_MyOrders"]
            headerHeight: 25

            # use it as defaut
            itemType: "controls/table/row/tableRowControl"
            headerType: "tableHeaderControl"
            bodyType: "tableBodyControl"

            visibleModelFields: ["data", undefined, "nextfield", undefined, "somefield"]

            sortableFields: ["data", "nextfield", "somefield"]

            collectionStrategy: simpleComparison

            itemClassName: "tableItem"
            itemHeight: 25