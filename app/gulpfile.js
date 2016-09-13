const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('styles', () => {
  gulp.src('_src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/assets/css/'))
})

gulp.task('build', ['styles'])

gulp.task('default', () => {
  gulp.watch('sass/**/*.scss', ['build', 'styles'])
})
