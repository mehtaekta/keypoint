module.exports = function(grunt){

	// Load tasks from plugin
	grunt.loadNpmTasks('grunt-coffee');
	 grunt.loadNpmTasks('grunt-contrib-less');
	 grunt.loadNpmTasks('grunt-reload');

	// Project configuration.
	grunt.initConfig({
		reload: {
	        port: 5000,
	        proxy: {
	            host: 'localhost'
	        }
	    },
		less: {
	      dev: {
	        files: {
	          "public/css/style.css": "less/style.less"
	        }
	      },
	      prod: {
	        options: {
	          yuicompress: true
	        },
	        files: {
	          "public/css/style.css": "less/style.less"
	        }
	      }
	    },
	    concat: {
			vendor: {
				src: ['public/js/vendor/jquery*.js', 
						'public/js/vendor/underscore-*.js',
						'public/js/vendor/underscore-string.js',
						'public/js/vendor/modernizr*.js', 
						"public/js/vendor/bootstrap/bootstrap-transition.js",
						"public/js/vendor/bootstrap/bootstrap-collapse.js",
						"public/js/vendor/bootstrap/bootstrap-button.js",
						"public/js/vendor/bootstrap/bootstrap-modal.js",
						"public/js/vendor/bootstrap/bootstrap-tab.js",
						"public/js/vendor/bootstrap/bootstrap-tooltip.js",
						"public/js/vendor/bootstrap/bootstrap-popover.js",
						"public/js/vendor/bootstrap/bootstrap-dropdown.js",
						"public/js/vendor/bootstrap/bootstrap-alert.js",
				      	'public/js/vendor/sammy*.js', 				      
				      	'public/js/vendor/moment*.js', 		
						'public/js/vendor/plugins.js'
						],
				dest: 'public/js/vendor-script.js'
			},
			app: {
				src: ['public/js/app/sammy.json.helper.js',
						'public/js/app/bootstrap.js'
						],
				dest: 'public/js/app-script.js'
			},
		},
		min: {
			vendor: {
				src: [ '<config:concat.vendor.dest>' ],
				dest: 'public/js/vendor-script.js'
			},
			app: {
				src: [ '<config:concat.app.dest>' ],
				dest: 'public/js/app-script.js'
			}
		},
		lint: {
			files: [ // some example files
                'grunt.js',
                '<config:concat.vendor.src>',
                '<config:concat.app.src>'
            ],
            options: {
            	errorsOnly: true
            	// log: '/log/error.log'
            }
		},
		shell: {
			killNode:{
				command: "kill cmd.exe",
        		stdout: true,
        		failOnError: true
			}
		},
	    watch: {
		    less: {
				files: 'less/**/*.less',
				tasks: ['less:dev']
			},
			concat: {
				files: ['<config:concat.vendor.src>', '<config:concat.app.src>'],
				tasks: ['concat']
			}
		},
	});

	grunt.registerTask('default', ['less', 'concat', 'less:dev', 'watch']);
	
}