"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat');

gulp.task("concatScripts", function(){
  gulp.src(["/scripts/app.js",
  "app/scripts/services/GoogleOauth.js",
  "app/scripts/services/ZenFactory.js",
  "app/scripts/services/SortData.js",
  "app/scripts/controllers/HomeCtrl.js",
  "app/scripts/controllers/TicketCtrl.js",
  "app/scripts/controllers/NewTicketCtrl.js",
  "app/scripts/controllers/IndexCtrl.js",
  "app/scripts/controllers/ClosedTicketCtrl.js",
  "app/scripts/controllers/MyTicketCtrl.js",
  "app/scripts/controllers/IncidentsModalCtrl.js",
  "app/scripts/controllers/IncidentsModalInstanceCtrl.js"
  ])
  .pipe(concat("projectJsFiles.js"))
  .pipe(gulp.dest("app/scripts"));
});
