module.exports = (grunt) ->

    port = 9123
  
    # Project configuration.
    grunt.initConfig
        watch:
            coffee_app:
                files: ['wire-app/coffee/**/**.coffee']
                tasks: ["coffee-compile-app"]
            js:
                files: ['wire-app/js/**/**.js']
                options:
                    livereload: true

        coffee:
            app:
                options: {
                    bare: true
                }
                files: [
                    expand: true,
                    cwd: 'wire-app/coffee',
                    src: ['**/*.coffee'],
                    dest: 'wire-app/js',
                    ext: '.js'
                ]

        connect:
            server:
                options:
                    port: port
                    base: '.'

        requirejs:
            compile:
                options:
                    appDir: "wire-app"
                    baseUrl: "js"
                    mainConfigFile: "wire-app/js/main.js"
                    dir: "public"

                    optimize: "none"

                    # how does it work?
                    done: (done, output) ->
                        duplicates = require('rjs-build-analysis').duplicates(output)

                        if duplicates.length > 0
                            grunt.log.subhead('Duplicates found in requirejs build:')
                            grunt.log.warn(duplicates)
                            done new Error('r.js built duplicate modules, please check the excludes option.')
                        else
                            console.log "No duplicates"

                        done()

        # insert:
        #     options: {}
        #     main:
        #         src: "wire-app//coffee/requireConfig.coffee",
        #         dest: "tests/coffee/SpecRunner.coffee",
        #         match: "# requirejs-config here"



    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks "grunt-contrib-requirejs"
    grunt.loadNpmTasks "grunt-newer"

    # grunt.loadNpmTasks "grunt-insert"

    grunt.registerTask "default", ["connect:server", "watch"]

    # compilation
    grunt.registerTask "coffee-compile-app", ["newer:coffee:app"]

    grunt.registerTask "server", ["connect"]
    grunt.registerTask "inc", ["insert", "coffee-compile-tests", "default"]
    
    grunt.registerTask 'build', ['requirejs']