var gulp        = require('gulp');
var gulp_front_matter = require('gulp-front-matter');
var assign = require('lodash.assign');
var gutil = require("gulp-util");








var onError = function (err) {
    'use strict';
    var gutil = require('gulp-util');
    gutil.log( gutil.colors.magenta(err.message), err);
    gutil.beep();
    this.emit('end');
};
var build = function (callback) {
	delete require.cache[require.resolve('./_site/build.js')];
	require('./_site/build.js')(callback);

};

gulp.task('build', function (cb) {
	build(function () {
		gulp.src('./_site/build/**/*.*')
			.pipe(gulp.dest('./'));
	});
});


gulp.task('default', function (cb) {
	var watch = require('gulp-watch');
	var plumber = require('gulp-plumber');
	var browserSync = require('browser-sync').create();


	build(function () {
		browserSync.init({
	        server: {
	            baseDir: './_site/build'
	        },
			open: false
	    });
		watch(['./_site/**/*'], function () {
			build(function () {});
		});
		watch(['./_site/build/**/*'], function () {
			browserSync.reload();
		});
	});



});
