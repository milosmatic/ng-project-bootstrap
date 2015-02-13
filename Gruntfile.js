module.exports = function (grunt) {

    'use strict';

    // load dependencies
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cssshrink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        /* clean directories */
        clean: {
            build: ['build']
        },

        /* prepare files for processing */
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'build'
            }
        },

        /* html minification */
        htmlmin: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['*.html'],
                        dest: 'build'
                    },
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['partials/{,*/}{,*/}{,*/}*.html'],
                        dest: 'build'
                    }
                ]
            },
            deploy: {
                options: {
                    conservativeCollapse: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['*.html'],
                        dest: 'build'
                    }
                ]
            },
            deploy_partials: {
                options: {
                    conservativeCollapse: true,
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeCDATASectionsFromCDATA: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    keepClosingSlash: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['partials/{,*/}{,*/}{,*/}*.html'],
                        dest: 'build'
                    }
                ]
            }
        },

        /* image minification */
        imagemin: {
            deploy: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/img',
                        src: '{,*/}*.{ico,png,jpg,jpeg,gif,webp,svg}',
                        dest: 'build/img'
                    }
                ]
            }
        },

        /* copy static files */
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        dest: 'build',
                        src: ['*.txt', 'favicon.ico']
                        //src: ['*.txt', '.htaccess', 'lib/{,*/}*.js']
                    },
                    {
                        expand: true,
                        cwd: 'app/fonts/',
                        dest: 'build/fonts/',
                        src: ['**']
                    },
                    {
                        dest: 'build/js/app.min.js',
                        src: ['.tmp/concat/js/app.min.js']
                    },
                    {
                        dest: 'build/css/app.min.css',
                        src: ['.tmp/concat/css/app.min.css']
                    },
                    {
                        dest: 'build/css/print.min.css',
                        src: ['.tmp/concat/css/print.min.css']
                    }
                ]
            },
            deploy: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        dest: 'build',
                        src: ['*.txt', 'favicon.ico']
                        //src: ['*.txt', '.htaccess', 'lib/{,*/}*.js']
                    },
                    {
                        expand: true,
                        cwd: 'app/fonts/',
                        dest: 'build/fonts/',
                        src: ['**']
                    }
//					{
//						expand: true,
//						cwd: 'bower_components/fontawesome/fonts/',
//						dest: 'build/fonts/',
//						src: ['**']
//					}
                ]
            }
        },

        /* js file minification */
        uglify: {
            options: {
                mangle: {
                    sort: true,
                    toplevel: true,
                    screw_ie8: true
                },
                codegen: {quote_keys: true},
                compress: {
                    sequences: true,
                    properties: true,
                    dead_code: true,
                    drop_debugger: true,
                    conditionals: true,
                    comparisons: true,
                    evaluate: true,
                    hoist_funs: true,
                    hoist_vars: false,
                    booleans: true,
                    loops: true,
                    if_return: true,
                    unused: true,
                    join_vars: true,
                    cascade: true,
                    side_effects: true,
//					drop_console: true,
                    warnings: false,
                    negate_iife: true,
                    global_defs: {
                        DEBUG: false
                    }
                },
                preserveComments: false,
                wrap: true,
                report: 'min'
            }
        },

        /* cache busting */
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            files: {
                src: [
                    'build/js/{,*/}*.js',
                    //'build/lib/{,*/}*.js',
                    'build/css/{,*/}*.css'
                    //'build/img/{,*/}*.{ico,png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        /* replace links to minificated files */
        usemin: {
            html: ['build/index.html'],
            options: {
                dirs: ['build']
            }
        },

        /* minify css */
        cssmin: {
            options: {
                keepSpecialComments: 0
            }
        },

        /* shrink css as much as posible */
        cssshrink: {
            deploy: {
                options: {
                    log: true
                },
                files: {
                    'build': ['build/css/*.css']
                }
            }
        },

        /* watch files changes */
        watch: {
            scripts: {
                files: ['app/css/*.css', 'app/fonts/**', 'app/js/*.js', 'app/img/**', 'app/lib/*.js', 'app/partials/**'],
                tasks: 'build',
                options: {
                    event: 'all',
                    dot: true,
                    interrupt: true
                }
            }
        }

    });

    grunt.registerTask('build', [
        'clean:build',
        'useminPrepare',
        'htmlmin:build',
        'concat',
        'copy:build',
        'usemin'
    ]);

    grunt.registerTask('deploy', [
        'clean:build',
        'useminPrepare',
        'htmlmin:deploy',
        'htmlmin:deploy_partials',
        'imagemin:deploy',
        'concat',
        'copy:deploy',
        'cssmin',
        'cssshrink:deploy',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};