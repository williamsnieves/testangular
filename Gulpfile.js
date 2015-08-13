var gulp = require('gulp');
var browserSync = require('browser-sync');

var reload = browserSync.reload;


gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

   gulp.watch("./*.html").on("change", browserSync.reload);
   //gulp.watch("./js/*.js").on("change", browserSync.reload);
})
