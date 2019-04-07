import gulp from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpIf from 'gulp-if';

const {INCLUDE_ROBOTS} = process.env;
const config = {
  //build: "/var/www/sweetcake/wp-content/themes/sweetcake/",
  templates: ["", "inc/"]
}

gulp.task('copy', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed('dist'))
		.pipe(gulpIf(!INCLUDE_ROBOTS, filter(file => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest('dist'))
));

gulp.task('copy:php', () => (
  config.templates.map(function(folder) {
    gulp.src('app/' + folder + "**/*.php")
    	.pipe(gulp.dest('dist/' + folder));
  })
));
