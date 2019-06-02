import gulp from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import gfi from 'gulp-file-insert';
import concat from 'gulp-concat';
import merge from 'merge-stream';
import runSequence from 'run-sequence';
import del from 'del';
import debug from 'gulp-debug';


const {INCLUDE_ROBOTS} = process.env;
const config = {
  //build: "/var/www/sweetcake/wp-content/themes/sweetcake/",
  templates: ["", "inc/", "template-parts/"],
  js: ['blocks/']
}

gulp.task('copy:resources', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed('dist'))
		.pipe(gulpIf(!INCLUDE_ROBOTS, filter(file => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest('dist'))
));

gulp.task('copy:php', () => (
	config.templates.map(function(folder) {
		gulp.src(['app/' + folder + '**/*.php','!app/blocks/**/*','!app/~aux/**/*'])
		.pipe(gulp.dest('dist/' + folder))
	})
));

gulp.task('copy:img', () => (
	gulp.src('app/blocks/**/img/*')
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest('dist/images/'))
));

gulp.task('copy:js', () => (
	runSequence(
		'copy:js-copy-files',
		'copy:js-enque-concat',
		'copy:js-enque-insert',
		'copy:js-del-temp'
	)
));


/*Copy js files from js and blocks folder*/
gulp.task('copy:js-copy-files', function() {
	config.js.map(function(folder) {
		gulp.src('app/' + folder + '**/*.js')
			.pipe(rename({dirname: ''}))
			.pipe(gulp.dest('dist/assets/js'));
	})
});

/*concat wp_enqueue_script expressions for every block*/
gulp.task('copy:js-enque-concat', function() {
	return gulp.src('app/blocks/**/*.php')
		.pipe(concat('all.php'))
		.pipe(gulp.dest('app'));
});

/*insert wp_enqueue_script expression for all blocks to functions.php*/
gulp.task('copy:js-enque-insert', function() {
	return gulp.src('app/functions.php')
		.pipe(gfi({
				'/*SCRIPTS*/': 'app/all.php'
		}))
		.pipe(gulp.dest('dist'));
});

/*delete temporary files*/
gulp.task('copy:js-del-temp', function() {
	del('app/all.php');
});

