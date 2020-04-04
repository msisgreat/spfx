## auto-deploy

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```
This sample contains the custom build function inside gulpfile.js 
Run the below command to install the spsync creds: Then add the build commands

npm install gulp-spsync-creds --save-dev --save-exact

Below is the content from gulpfile.js
----------------------------------------
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const spsync = require('gulp-spsync-creds').sync;
const fs = require('fs');
const gutil = require('gulp-util');

var getJson = function (file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
};

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.task('upload-to-sharepoint', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const deployFolder = require('./config/copy-assets.json');
            const folderLocation = `./${deployFolder.deployCdnPath}/**/*.js`;
            return gulp.src(folderLocation)
                .pipe(spsync({
                    "username": "<username>",
                    "password": "<password>",
                    "site": "<site url>", // example :https://mydomain.sharepoint.com/sites/home
                    "libraryPath": "Shared Documents/spfxdeploy/", // documentlibrary/folder
                    "publish": true
                }))
                .on('finish', resolve);
        });
    }
});

build.task('upload-app-pkg', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const pkgFile = require('./config/package-solution.json');
            const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;

            return gulp.src(folderLocation)
                .pipe(spsync({
                    "username": "<username>",
                    "password": "<password>",
                    "site": "<site url>", // example :https://mydomain.sharepoint.com/sites/home
                    "libraryPath": "AppCatalog",
                    "publish": true
                }))
                .on('finish', resolve);
        });
    }
});

let bumpRevisionSubTask = build.subTask('bump-revision-subtask', function (gulp, buildOptions, done) {
    var pkgSolution = getJson('./config/package-solution.json');
    var oldVersionNumber = String(pkgSolution.solution.version);
    gutil.log('Old Version: ' + oldVersionNumber);
    var oldBuildNumber = parseInt(oldVersionNumber.split('.')[2]);
    gutil.log('Old Build Number: ' + oldBuildNumber);
    var newBuildNumber = oldBuildNumber + 1;
    gutil.log('New Build Number: ' + newBuildNumber);
    var newVersionNumber = oldVersionNumber.substring(0, String(oldVersionNumber).length - String(oldBuildNumber).length) + String(newBuildNumber);
    gutil.log('New Version: ' + newVersionNumber);
    pkgSolution.solution.version = newVersionNumber;
    fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4), function (err, result) {
        if (err) {
            console.err(err);
            gutil.log(err);
        }
        else {
            gutil.log(result);
        }
    });
    gutil.log('version incement completed');
    return gulp.src('./config/package-solution.json')
        .pipe(gulp.dest('./config'))
});
let bumpRevisionTask = build.task('bump-revision', bumpRevisionSubTask);
build.rig.addPreBuildTask(bumpRevisionTask);
build.initialize(gulp);
------------------------------------------------------------------------------

Package-solution.json
------------------
"version": "1.0.0"

Package.json
----------
"scripts": {
    "build": "gulp bundle",
    "clean": "gulp clean",
    "test": "gulp test",
    "deploy": "gulp clean && gulp bundle --ship && gulp package-solution --ship",
    "publish": "gulp upload-to-sharepoint --ship && gulp upload-app-pkg --ship"
  }

