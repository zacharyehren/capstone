"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
     del = require('del');

gulp.task("concatScripts", function(){
  return gulp.src(["app/scripts/app.js",
  "app/scripts/services/*.js",
  "app/scripts/controllers/*.js"
  ])
  .pipe(concat("projectJsFiles.js"))
  .pipe(gulp.dest("app/scripts"));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
  return gulp.src("app/scripts/projectJsFiles.js")
    .pipe(uglify())
    .pipe(rename("projectJsFiles.min.js"))
    .pipe(gulp.dest("app/scripts"));
});

gulp.task("watchScripts", function(){
  gulp.watch(["app/scripts/**/*.js", "app/scripts/app.js"], ["concatScripts"]);
})

gulp.task('clean', function(){
  del(['dist', 'app/scripts/projectJsFiles.min.js']);
});

gulp.task("build", ["minifyScripts"], function(){
  return gulp.src(["app/styles/main.css",
  "app/templates/*.html",
  "app/scripts/projectJsFiles.min.js",
  "app/index.html"], {base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);
