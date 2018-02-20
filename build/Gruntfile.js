module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var path = require('path');
  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pkgMeta: grunt.file.readJSON('config/meta.json'),
        dest: grunt.option('target') || 'dist',
        basePath: path.join('<%= dest %>', 'App_Plugins', '<%= pkgMeta.name %>'),
  
        watch: {
            options: {
                spawn: false,
                atBegin: true
            },
            dll: {
                files: ['umbraco/Ernest/Ernest/**/*.cs'] ,
                tasks: ['msbuild:dist', 'copy:dll']
            },
        },
  
        copy: {
            dll: {
                cwd: 'umbraco/Ernest/Ernest/bin/debug/',
                src: 'Ernest.dll',
                dest: '<%= dest %>/bin/',
                expand: true
            },
            umbraco: {
                cwd: '<%= dest %>',
                src: '**/*',
                dest: 'tmp/umbraco',
                expand: true
            }
        },
  
        umbracoPackage: {
            dist: {
                src: 'tmp/umbraco',
                dest: 'pkg',
                options: {
                    name: "<%= pkgMeta.name %>",
                    version: '<%= pkgMeta.version %>',
                    url: '<%= pkgMeta.url %>',
                    license: '<%= pkgMeta.license %>',
                    licenseUrl: '<%= pkgMeta.licenseUrl %>',
                    author: '<%= pkgMeta.author %>',
                    authorUrl: '<%= pkgMeta.authorUrl %>',
                    manifest: 'config/package.xml',
                    readmeContents: '<%= grunt.file.read("config/readme.txt") %>'
                }
    
            }
        },
  
        clean: {
            build: '<%= grunt.config("basePath").substring(0, 4) == "dist" ? "dist/**/*" : "null" %>',
            tmp: ['tmp']
        },

        msbuild: {
            options: {
                stdout: true,
                verbosity: 'quiet',
                maxCpuCount: 4,
                version: 4.0,
                buildParameters: {
                    WarningLevel: 2,
                    NoWarn: 1607
                }
            },
            dist: {
                src: ['umbraco/Ernest/Ernest/Ernest.csproj'],
                options: {
                    projectConfiguration: 'Debug',
                    targets: ['Clean', 'Rebuild'],
                }
            }
        }
    });
  
    grunt.registerTask('default', ['msbuild:dist', 'copy:dll']);
    grunt.registerTask('umbraco', ['clean:tmp', 'default', 'copy:umbraco', 'umbracoPackage', 'clean:tmp']);
};