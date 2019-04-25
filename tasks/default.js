import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'sprites',
		'icons',
		'styles'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'styles:dependencies',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	runSequence(
		'clean',
		'styles:dependencies',
		'scripts',
		'copy',
		'copy:js',
		'copy:php',
		'templates',
		'deploy'
	)
));

gulp.task('deploy', () => (
	runSequence(
		'clean:remote',
		'deploy-copy'
	)
));

