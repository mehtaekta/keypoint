module.exports = function(grunt){
	// Load tasks from plugin
	grunt.loadNpmTasks('grunt-coffee');
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
	});

    // Default task.
  	grunt.registerTask('default', 'coffee');

}