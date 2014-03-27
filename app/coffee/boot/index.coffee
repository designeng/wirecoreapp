# boot/index
define ["wire!mediator"], (context) ->
    context.wire(
        formView:
            render:
                template:
                    module: 'text!controls/form/resource/formView.html'
            insert: 
                first: 'root'

        buttonControl:
            create: "controls/button/buttonControl"
            ready:
                initialize:
                    args: {
                        one: 1
                        two: 2
                    }
                testButton:
                    $ref: "message"
            # render:

        ).then (childContext) ->
            console.log "childContext", childContext