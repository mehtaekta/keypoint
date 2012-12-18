module.exports = function(grunt){

	// Load tasks from plugin
	grunt.loadNpmTasks('grunt-coffee');
	 // grunt.loadNpmTasks('grunt-growl');
	 grunt.loadTasks('tasks');
	 // grunt.loadNpmTasks('grunt-jslint');
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
			dist: {
				src: ['public/js/vendor/jquery*.js', 
						'public/js/vendor/modernizr*.js', 
				      	'public/js/vendor/sammy*.js', 				      
						'public/js/plugins.js',              
						'public/js/main.js',
						'public/js/app/sammy.json.helper.js',
						'public/js/app/bootstrap.js'
						],
				dest: 'public/js/js-script.js'
			}
		},
		min: {
			dist: {
				src: [ '<config:concat.dist.dest>' ],
				dest: 'public/js/js-script.min.js'
			}
		},
		lint: {
			files: [ // some example files
                'grunt.js',
                '/**/*.js'
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
				files: '<config:less.app.src>',
				tasks: ['less']
			// tasks: 'coffee:app growl'
			},
			min: {
				files: '<config:concat.dist.src>',
				tasks: ['concat', 'min']
			}
		},
	});

    grunt.registerTask('default', ['coffee', 'less', 'concat', 'min', 'watch']);

}