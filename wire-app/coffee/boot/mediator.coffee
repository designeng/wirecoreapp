define
    root:
        $ref: 'dom!application'

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