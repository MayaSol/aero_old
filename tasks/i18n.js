var child = require('child_process');
var gulp   = require('gulp');
var fs = require('fs');

child.execSync('sh',['tasks/sh/make-php-list.sh']);
var phpFilesStr = fs.readFileSync('tmp/php-list').toString('utf-8');
var phpFiles = phpFilesStr.split('\n');

/*Список файлов для переводов */
const langs = ['ru_RU','en_GB','fr_FR'];

gulp.task('i18n',function(done) {
	child.spawn('mkdir',['app/resources/languages']);
	langs.map(function(fileName) {
		child.spawn('sh',[ 'tasks/sh/get-msgs.sh',  fileName, 'app/resources/languages/' ]);
	});
	phpFiles.map(function(fileName) {
		child.spawn('php', ['~aux/add-textdomain.php', '-i', 'aero', fileName]);
	});
	done();
 });

