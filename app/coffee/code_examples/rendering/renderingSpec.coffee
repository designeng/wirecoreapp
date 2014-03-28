define
    plugins:[
        {module: "wire/debug", trace: true}
        "wire/dom"
        "wire/aop"
    ]

    oneComponent:
        create: "code_examples/rendering/oneComponent"

    typesResolverComponent:
        create: 
            module: "code_examples/rendering/TypesResolverComponent"
            args:
                one: 1
                two: 2  
        properties:
            injectedProp: {$ref: 'oneComponent'}
        ready:
            start: {}
            getTypes: {$ref: 'tableModel'}

        afterReturning:
            getTypes: 'confirmResult'

    tableModel:
        create: "code_examples/rendering/resourses/models/tableModel"

    tableControl:
        create:
            module: "tableControl"
        properties:
            model: {$ref: 'tableModel'}



