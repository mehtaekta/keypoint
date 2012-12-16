module.exports = function(grunt){

	// Load tasks from plugin
	grunt.loadNpmTasks('grunt-coffee');
	 // grunt.loadNpmTasks('grunt-growl');
	 grunt.loadTasks('tasks')

	// Project configuration.
	grunt.initConfig({
		server: {
		    port: 500,
		    base: './keypoint'
		},
		coffee: {
	      	app: {
	        	src: '**/*.coffee',
	        	// dest: 'lib/',
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
						'public/js/bootstrap.js'
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
	    watch: {
		    coffee: {
		        files: '<config:coffee.app.src>',
		        tasks: 'coffee'
		        // tasks: 'coffee:app growl'
		    }			
	    	,less: {
				files: '<config:less.app.src>',
				tasks: 'less'
			// tasks: 'coffee:app growl'
			}
		},
		uglify: {}
	});

    // Register task.
    grunt.registerTask('server', 'Start coffee-express web server.', function() {
		// grunt.log.writeln('Starting web server on port 5000.');
		require('./server.js');
	});

    grunt.registerTask('default', ['coffee', 'less', 'concat', 'min', 'server', 'watch']);
    // grunt.registerTask('coffeeCompile', 'coffee');
    // grunt.registerTask('lessCompile', 'less');

}