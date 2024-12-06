const { src, dest, watch, parallel, series, task } = require('gulp');

const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gulpPug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const del = require('del');

function pug() {
  return src('src/index.pug')
    .pipe(gulpPug({ pretty: true }))
    .pipe(concat('index.html'))
    .pipe(dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function scss() {
  return src(['src/index.scss'])
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
  return src('src/**/*.js')
    .pipe(plumber())
    .pipe(dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', {
    encoding: false,
  })
    .pipe(dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return src('src/fonts/**/*.*', { encoding: false })
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
      index: 'index.html',
    },
  });
  watch(['src/**/*.pug'], pug);
  watch(['src/**/*.scss'], scss);
  watch(['src/fonts/**/*.*'], fonts);
  watch(['src/images/**/*.*'], images);
  watch(['src/**/*.js'], scripts);
}

const build = series(clean, parallel(pug, scss, fonts, images, scripts));

exports.pug = pug;
exports.scss = scss;
exports.fonts = fonts;
exports.scripts = scripts;
exports.images = images;
exports.watchFiles = watchFiles;
exports.clean = clean;
exports.build = build;
exports.default = series(build, watchFiles);
