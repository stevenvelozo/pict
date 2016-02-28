'use strict';

var libBrowserify = require('browserify');
var libGulp = require('gulp');

var libVinylSourceStream = require('vinyl-source-stream');
var libVinylBuffer = require('vinyl-buffer');

var libUglify = require('gulp-uglify');
var libSourcemaps = require('gulp-sourcemaps');
var libGulpUtil = require('gulp-util');

// Build the module for the browser
//   This gulp task is taken from the gulp recipe repository:
//   https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
libGulp.task('minified',
	function ()
	{
		// set up the custom browserify instance for this task
		var tmpBrowserify = libBrowserify(
		{
			entries: './source/Pict-Browser-Shim.js',
			debug: true
		});
		//tmpBrowserify.ignore('underscore');

		return tmpBrowserify.bundle()
			.pipe(libVinylSourceStream('pict.min.js'))
			.pipe(libVinylBuffer())
			.pipe(libSourcemaps.init({loadMaps: true}))
					// Add transformation tasks to the pipeline here.
					.pipe(libUglify())
					.on('error', libGulpUtil.log)
			.pipe(libSourcemaps.write('./'))
			.pipe(libGulp.dest('./dist/'));
	});


// Build the module for the browser
//   This gulp task is taken from the gulp recipe repository:
//   https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
libGulp.task('debug',
	function ()
	{
		// set up the custom browserify instance for this task
		var tmpBrowserify = libBrowserify(
		{
			entries: './source/Pict-Browser-Shim.js',
			debug: true
		});
		// Until we bundle modules with the right globals, don't worry about this.
		//tmpBrowserify.ignore('underscore');

		return tmpBrowserify.bundle()
			.pipe(libVinylSourceStream('pict.js'))
			.pipe(libVinylBuffer())
					.on('error', libGulpUtil.log)
			.pipe(libGulp.dest('./dist/'));
	});

libGulp.task
(
	'build',
	['debug', 'minified']
);
