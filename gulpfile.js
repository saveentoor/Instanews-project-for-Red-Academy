const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const terser = require("gulp-terser");
const prettyError = require("gulp-prettyerror");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

//--------------------CS--------------------//

// Compiling and minifying Sass
gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});

// Task to watch for changes to CSS & JS files
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("scripts"));
  done();
});

// Load browsersync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    browser: "google chrome"
  });

  gulp.watch("build/css/*.css").on("change", browserSync.reload);
  done();
});

// Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));

// --------------------JS--------------------//
gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

// -----------Lint---------- //

gulp.task("lint", function() {
  return gulp
    .src(["js/*.js"])
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

const babel = require("gulp-babel");
const input = "src/index.js";
const output = "dist";
gulp.task("babel", () => {
  return gulp
    .src(input)
    .pipe(babel())
    .pipe(gulp.dest(output));
});
