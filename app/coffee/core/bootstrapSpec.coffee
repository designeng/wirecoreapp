define
    appInstance:
        create: "core/appinstance"

    appRegion:
        create: 
            module: "core/appRegion"
            args:
                one: 1
                two: 2   
        properties:
            test: {$ref: "appInstance"}
        ready:
            start: {}

    routeMap:
        module: "core/modules/root/routeMap"

    routeProcessor:
        create: 
            module: "core/modules/root/routeProcessor"
            properties:
                routeMap: {$ref: 'routeMap'}

    bootApp:
        module: "core/bootApp"
        # properties:


        ready:
            start: 
                regionSelector: {$ref: 'appRegion'}

