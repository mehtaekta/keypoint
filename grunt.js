module.exports = function(grunt){

	// Load tasks from plugin
	grunt.loadNpmTasks('grunt-coffee');
	grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-growl');

	// Project configuration.
	grunt.initConfig({
		coffee: {
	      app: {
	        src: '**/*.coffee',
	        dest: 'lib/',
	        options: {
	            bare: true,
	            preserve_dirs: true
	        }
	      }
	    },
	    less: {
	    	development: {
			    options: {
			      paths: ["less"],
			      yuicompress: true
			    },
			    files: {
			      'public/css/style.css': 'less/app.less'
			    }
			},
			production: {
			    options: {
			      paths: ["less/*.less"],
			      yuicompress: true
			    },
			    files: {
			      'public/css/style.css': 'less/app.less'
			    }
			}
	    },
	    watch: {
		    coffee: {
		        files: '<config:coffee.app.src>',
		        tasks: 'coffee'
		        // tasks: 'coffee:app growl'
		    }			
	  //   	,less: {
			// 	files: '<config:less.development.options.paths>',
			// 	tasks: 'less'
			// // tasks: 'coffee:app growl'
			// }
		}
	});

    // Default task.
    grunt.registerTask('default', ['coffee', 'less', 'watch']);
    // grunt.registerTask('coffeeCompile', 'coffee');
    // grunt.registerTask('lessCompile', 'less');

}