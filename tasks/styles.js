import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import rupture from 'rupture';
import stylint from 'gulp-stylint';
import stylus from 'gulp-stylus';
import importIfExist from 'stylus-import-if-exist';
import autoprefixer from 'autoprefixer-stylus';
//import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
import insert from 'gulp-insert';
import gfi from 'gulp-file-insert';
//import debug from 'gulp-debug';

const isDebug = process.env.NODE_ENV !== 'production';
console.log('isDebug: ' + isDebug);

gulp.task('styles', () => (
	gulp.src('app/styles/app.styl')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(stylus({
			use: [
				importIfExist(),
				rupture(),
				autoprefixer()
			],
			'include css': true,
			define: {
				// dev-mode variable for using in stylus
				'__DEV__': isDebug
			}
		}))

		 .pipe(gulpIf(!isDebug, nano({zindex: false})))
		 .pipe(gulpIf(isDebug, sourcemaps.write()))
		 .pipe(insert.prepend('/*Comments*/'))

   		.pipe(gfi({
     			"/*Comments*/": "app/styles/helpers/style-header",
   		}))

		.pipe(rename('style.css'))
		.pipe(gulp.dest('dist'))
));

gulp.task('styles:lint', () => (
	gulp.src(['app/**/*.styl', '!app/styles/**'])
		.pipe(stylint({
			reporter: 'stylint-stylish',
			reporterOptions: {verbose: true}
		}))
		.pipe(stylint.reporter())
		.pipe(stylint.reporter('fail', {failOnWarning: true}))
));
