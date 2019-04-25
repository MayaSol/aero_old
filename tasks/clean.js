import gulp from 'gulp';
import del from 'del';

gulp.task('clean', function() {
  return del('dist/*',{force:true});
});

gulp.task('clean:remote', function() {
  return del(['/var/www/aero/wp-content/themes/aero/**','!/var/www/aero/wp-content/themes/aero'],{force:true});
});
