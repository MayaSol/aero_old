import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import pugPHPFilter from 'pug-php-filter';
import pugLinter from 'gulp-pug-linter';
import prettify from 'gulp-jsbeautifier';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';
import getData from 'jade-get-data';
import staticHash from 'gulp-static-hash';
import debug from 'gulp-debug';

const data = {
	getData: getData('app/data'),
	jv0: 'javascript:void(0);',
	// dev-mode variable for using in jade
	__DEV__: process.env.NODE_ENV !== 'production'
};

console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);


gulp.task('templates', () => {
	const pugFilter = filter(['**/pages/**/*.pug','**/template-parts/**/*.pug'],{restore: true});
	const pagesFilter = filter('**/pages/**/*.*',{restore:true});

	return gulp.src('app/**/*.pug')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
		//.pipe(cached('pug'))
		.pipe(gulpIf(global.watch, inheritance({basedir: 'app'})))
//		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(pugFilter)
		//.pipe(jade({basedir: 'app', data}))
		.pipe(pug({ basedir: 'app', data, filters: { php: pugPHPFilter } }))
		.pipe(gulpIf(process.env.PRETTIFY !== 'false', prettify({
			braceStyle: 'expand',
			indentWithTabs: true,
			indentInnerHtml: true,
			preserveNewlines: true,
			endWithNewline: true,
			wrapLineLength: 120,
			maxPreserveNewlines: 50,
			wrapAttributesIndentSize: 1,
			unformatted: ['use']
		})))
		.pipe(gulpIf(process.env.NODE_ENV === 'production', staticHash({
			asset: 'dist',
			exts: ['js', 'css']
		})))
		.pipe(pagesFilter)
		.pipe(rename({dirname: '.', extname: '.php'}))
		.pipe(gulp.dest('dist'))
		.pipe(pagesFilter.restore)
		.pipe(filter('**/template-parts/**/*.*',{restore:true}))
		.pipe(rename({dirname: '.', extname: '.php'}))
		.pipe(gulp.dest('dist/template-parts/'))

});

gulp.task('templates:lint', () =>
	gulp
		.src('app/**/*.pug')
		.pipe(pugLinter())
		.pipe(pugLinter.reporter('fail'))
);
