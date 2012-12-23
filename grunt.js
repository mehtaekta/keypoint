module.exports = function(grunt){

	// Load tasks from plugin
	grunt.loadNpmTasks('grunt-coffee');
	 grunt.loadTasks('tasks');
	 grunt.loadNpmTasks('grunt-reload');

	// Project configuration.
	grunt.initConfig({
		// server: {
		//     port: 5000,
		//     base: './server'
		// },
		// reload: {
		//     port: 5000,
		//     host: 'localhost'
		//     // proxy: {
	 //     //        host: 'localhost',
	 //     //        port:5000,
	 //     //    }
		// },
		coffee: {
	      	app: {
	        	src: '**/*.coffee',
	        	dest: 'lib/',
		        options: {
		        	output: false,
		            bare: false,
		            preserve_dirs: true
		        }
	      	}
	    },
	    less: {
	    	app: {
		        src: 'less/style.less',
		        dest: 'public/css/',
		        options: {
		        	compress: true,
		        	silent: true,
		        	optimization: 1,
		            bare: true,
		            preserve_dirs: false
		        }
	      	}
	    },
	    concat: {
			vendor: {
				src: ['public/js/vendor/jquery*.js', 
						'public/js/vendor/underscore-*.js',
						'public/js/vendor/underscore-string.js',
						'public/js/vendor/modernizr*.js', 
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
	    watch: {
		    coffee: {
		        files: '<config:coffee.app.src>',
		        tasks: ['coffee']
		        // tasks: 'coffee:app growl'
		    }			
	    	,less: {
				files: 'less/**/*.less',
				tasks: ['less']
			// tasks: 'coffee:app growl'
			},
			concat: {
				files: ['<config:concat.vendor.src>', '<config:concat.app.src>'],
				tasks: ['concat']
			}
		},
	});

	if(process.env.NODE_ENV == 'development') {
		grunt.registerTask('default', ['coffee', 'less', 'concat', 'watch']);
	} else {
		grunt.registerTask('default', ['coffee', 'less', 'concat', 'min', 'watch']);
	}
}