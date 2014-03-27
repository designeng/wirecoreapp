define
    message: "Start application"

    root:
        module:
            "app"
        ready:
            start:
                arg:
                    regionSelector: "#application"
            # show:
            #     arg: {$ref: "oneComponent"}
            # show:
            #     arg:
            #         TEST: "TEST"


    arg1: "test1"
    arg2: "test2"

    oneComponent:
        create:
            module: "oneComponent"
            args:
                $ref: "arg1"

        ready:
            initialize:
                $ref: "arg2"

    $plugins: [
        {   
            module: 'wire/debug'
            trace: true
        }
        'wire/dom'
        'wire/on'
        'wire/dom/render'
    ]