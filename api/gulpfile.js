var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");

var tsProject = ts.createProject("tsconfig.json");
const jsonDocs = ["package.json"];

const runDevelopmentServer = function() {
  return nodemon({
    script: "dist/app.js",
    ext: "js"
  });
};

gulp.task("typescript", function() {
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function() {
  gulp.watch("src/**/*.ts", gulp.series("typescript"));
});

gulp.task("assets", function() {
  return gulp.src(jsonDocs).pipe(gulp.dest("dist"));
});

gulp.task(
  "start",
  gulp.series("tsc", gulp.parallel("watch", runDevelopmentServer))
);

gulp.task("default", gulp.series("typescript"), "assets");
