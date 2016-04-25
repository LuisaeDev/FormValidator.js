/**
 * Plugins Gulp
 */
	var gulp 			= require('gulp');
	var	gulpUglify 		= require('gulp-uglify');
	var gulpRename 		= require('gulp-rename');

/**
 * Exporta en modo distribución
 */
gulp.task('dist', function() {
	gulp.src('./src/FormValidator.js')
		.pipe(gulp.dest('./dist'));
	gulp.src('./src/FormValidator.js')
		.pipe(gulpUglify({
			preserveComments: 'license'
		}))
		.pipe(gulpRename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'));
});