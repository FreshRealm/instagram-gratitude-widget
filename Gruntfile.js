module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            all: {
                files: [
                    'Gruntfile.js',
                    'bower.json',
                    'src/**/*.js',
                    'modules/freshrealm/alacart/base/web/app/js/src/**/*.js',
                    'modules/freshrealm/subscription/base/web/app/js/src/**/*.js',
                    'less/**/*.less'
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
        clean: {
            app: ['dist/js/app'],
            module: ['dist/js/module'],
            css: ['dist/css'],
            generated: ['generated'],
            bower: ['bower_components'],
        },
        less: {
            all: {
                files: [
                    {
                        "dist/css/fr-gratitude-widget.css": "less/fr-gratitude-widget.less"
                    }
                ]
            }
        },
        ngAnnotate: {
            all: {
                expand: true,
                src: ['src/**/*.js'],
                dest: 'generated'
            }
        },
        bower: {
            install: {
                options: {
                    cleanTargetDir: true,
                    targetDir: 'lib',
                    layout: 'byComponent',
                    bowerOptions: {}
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery', '$']
                },
                compress: {
                    drop_console: true
                },
                sourceMap: true
            },
            app: {
                options: {
                    report: 'min',
                },
                files: {
                    'dist/js/app/<%= pkg.name %>-app.min.js':
                        ['generated/src/app.js', 'generated/src/frGratitudeWidget.js']
                }
            },
            module: {
                options: {
                    report: 'min',
                },
                files: {
                    'dist/js/module/<%= pkg.name %>-module.min.js':
                        ['generated/src/frGratitudeWidget.js']
                }
            }
        },
        connect: {
            server: {}
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'ngAnnotate',
        'bower',
        'less',
        'uglify'
    ]);

    grunt.registerTask('serve', [
        'default',
        'connect',
        'watch'
    ]);
};