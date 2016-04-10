const gulp = require('gulp')
const stylus = require('gulp-stylus')
const minifyCss = require('gulp-minify-css')
const shell = require('gulp-shell')
const image = require('gulp-image')

var paths = {
  stylus: {
    src: ['./public/assets/stylus/**/*.styl'],
    dist: './public/dist/css'
  },
  images: {
    src: ['./public/assets/img/**/*'],
    dist: './public/dist/img'
  }
}

gulp.task('watch', (callback) => {
  gulp.watch(paths.stylus.src, ['stylus'])
  gulp.watch(paths.images.src, ['image'])
})

gulp.task('image', function () {
  gulp.src(paths.images.src)
    .pipe(image())
    .pipe(gulp.dest(paths.images.dist));
});

gulp.task('stylus', () => {
  gulp.src(paths.stylus.src)
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest(paths.stylus.dist))
})

gulp.task('dev', ['stylus', 'image', 'watch'])
