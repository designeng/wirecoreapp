module.exports = (grunt) ->

    port = 9123
  
    # Project configuration.
    grunt.initConfig
        watch:
            coffee_app:
                files: ['app/coffee/**/**.coffee']
                tasks: ["coffee-compile-app"]
            js:
                files: ['app/js/**/**.js']
                options:
                    livereload: true

        coffee:
            app:
                options: {
                    bare: true
                }
                files: [
                    expand: true,
                    cwd: 'app/coffee',
                    src: ['**/*.coffee'],
                    dest: 'app/js',
                    ext: '.js'
                ]

        copy:
            app:
                files: [
                    expand: true
                    cwd: "app/"
                    src: ["**"]
                    dest: "prebuild/"
                    filter: "isFile"
                ]

        clean:
            prebuild: "prebuild"

        connect:
            server:
                options:
                    port: port
                    base: '.'

        requirejs:
            compile:
                options:
                    appDir: "app"
                    baseUrl: "js"
                    mainConfigFile: "app/js/main.js"
                    dir: "public"

                    optimize: "none"
                    removeCombined: true

                    paths:
                        "wire/builder/rjs": "lib/builder"

                    modules: [
                        name: "main"
                        include: ["main", "wire", 'wire/lib/context']
                    ]

                    # done: (done, output) ->
                    #     duplicates = require('rjs-build-analysis').duplicates(output)

                    #     if duplicates.length > 0
                    #         grunt.log.subhead('Duplicates found in requirejs build:')
                    #         grunt.log.warn(duplicates)
                    #         done new Error('r.js built duplicate modules, please check the excludes option.')
                    #     else
                    #         console.log "No duplicates"

                    #     done()

        # insert:
        #     options: {}
        #     main:
        #         src: "app//coffee/requireConfig.coffee",
        #         dest: "tests/coffee/SpecRunner.coffee",
        #         match: "# requirejs-config here"



    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks "grunt-contrib-requirejs"
    grunt.loadNpmTasks "grunt-newer"

    # grunt.loadNpmTasks "grunt-insert"

    grunt.registerTask "default", ["connect:server", "watch"]

    # compilation
    grunt.registerTask "coffee-compile-app", ["newer:coffee:app"]

    grunt.registerTask "server", ["connect"]
    grunt.registerTask "inc", ["insert", "coffee-compile-tests", "default"]
    
    grunt.registerTask 'build', ["prebuild", "requirejs", "afterbuild"]
    grunt.registerTask 'prebuild', ["copy:app"]
    grunt.registerTask 'afterbuild', ["clean:prebuild"]