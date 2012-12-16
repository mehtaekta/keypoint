module.exports = function(grunt) {
  var path = require('path');

   // ==========================================================================
  // LESS Compile TASKS - Ekta Mehta
  // ==========================================================================

  grunt.registerMultiTask('less', 'Compile Less files', function() {
    var dest = this.file.dest,
        options = this.data.options,
        extension = this.data.extension;

    grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
      grunt.helper('less', filepath, dest, grunt.utils._.clone(options), extension);
    });

    if (grunt.task.current.errorCount) {
      return false;
    } else {
      return true;
    }
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('less', function(src, destPath, options, extension) {
     var less = require('less');
        css = '';

    options = options || {};
    extension = typeof extension === "undefined" ? '.css' : extension;

    if( destPath && options.preserve_dirs ){
      var dirname = path.dirname(src);
      if ( options.base_path ) {
        dirname = dirname.replace(new RegExp('^'+options.base_path), '');
      }
      destPath = path.join(destPath, dirname);
    } else if( !destPath ){
      destPath = path.dirname(src);
    }

    var dest = path.join(destPath, path.basename(src, '.less') + extension);

    // De-dup dest if we have .js.js - see issue #16
    if (dest.match(/\.css\.css/)) {
      dest = dest.replace(/\.css\.css/, ".css");
    }

    if (path.extname(src) === '.css') {
      grunt.file.copy(src, dest);
      return true;
    }

    if( options.bare !== false ) {
      options.bare = true;
    }

    try {
      less.render(grunt.file.read(src),options, function (e, css) {
        // console.log(css);
        grunt.file.write(dest, css);
      return true;
    });
      
    } catch (e) {
      grunt.log.error("Error in " + src + ":\n" + e);
      return false;
    }
  });

};
