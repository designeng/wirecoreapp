define
    appInstance:
        create: "core/appinstance"

    appRegion:
        create: "core/appRegion"

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

