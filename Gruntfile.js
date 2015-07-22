'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Grunt configuration
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
        ' * miniui v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n',
        dist:'dist',

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%=dist%>/{,*/}*'
                    ]
                }]
            }
            //server: '.tmp'
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "Wizard",
                    processName: function (filePath) {
                        var name = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."))
                        return name;
                    }
                },
                files: {
                    'js/templates/wizardTemplate.js': ['js/templates/*.handlebars']

                }
            }

        } ,
        concat: {
            options: {
                banner: '<%= banner %>\n',
                separator: '\r\n',
                stripBanners: false
            },
            wizard: {
                src: [
                    'js/wizard.js',
                    'js/models/*.js',
                    'js/templates/*.js',
                    'js/views/*.js'



                ],
                dest: '<%=dist%>/<%= pkg.name %>-source.js'
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            css: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'css',
                        dest: '<%=dist%>/css',
                        src: [
                            '**'
                        ]
                    }
                ]
            }
        },
        uglify: {
            options: {
                report: 'min'
            },
            wizard: {
                options: {
                    banner: '<%= banner %>',
                    beautify: {
                        ascii_only: true
                    }
                },
                src: '<%=dist%>/<%= pkg.name %>-source.js',
                dest: '<%=dist%>/<%= pkg.name %>-min.js'
            }
        }

    })


    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'handlebars',
        'concat',
        'copy',
        'uglify'
    ]);

};
