const gulp = require('gulp');
const stylus = require('gulp-stylus');
const minifyCss = require('gulp-minify-css');
const shell = require('gulp-shell');

var paths = {
  stylus: {
    src: ['./public/assets/stylus/**/*.styl'],
    dist: './public/dist/css'
  }
};

gulp.task('stylus', () => {
  gulp.src(paths.stylus.src)
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest(paths.stylus.dist));
});

gulp.task('webpack:build', shell.task([
  'npm run webpack:build'
]));

gulp.task('webpack:watch', shell.task([
  'npm run webpack:watch'
]));

gulp.task('build', ['stylus']);
