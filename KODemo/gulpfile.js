'use strict';

const gulp = require('gulp');
//Allows writing to log
const gutil = require('gulp-util');
const build = require('@microsoft/sp-build-web');

//path utilities like: get file extention
const path = require('path');
//load the package solution json object, where we can get the version from
const packageJson = require('./config/package-solution.json');

//Add changes to configureWebpack task:
build.configureWebpack.mergeConfig({
    additionalConfiguration: (config) => {

        //Find html-loader task, and tell it to stop removing html comments
        //this will break knockout containerless bindings
        //loaders was recently renamed "rules"
        (config.module.loaders || config.module.rules).forEach((rule) => {
            if (rule.loader === "html-loader") {
                gutil.log("Got html loader " + JSON.stringify(rule));
                rule.loader += "?removeComments=false";
            }
        });

        // // //Change output file name, this does NOT apply to the production files built with gulp --ship in temp/deploy folder!
        // // const existingOutputName = config.output.filename;
        // // const outputNameExt = path.extname(existingOutputName);
        // // const baseOutputName = path.basename(existingOutputName, outputNameExt);
        // // config.output.filename = `${baseOutputName}.${packageJson.solution.version}${outputNameExt}`;
        // // config.output.chunkFilename = '[id].' + config.output.filename;

        //Must return config back
        return config;
    }
});


// // //Add post build task. This still runs before bundle task
// // let renameFilesProductionTask = build.subTask('rename-files-production', function(gulp, buildOptions, done) {
// //     var production = (process.argv.indexOf('--ship') !== -1);
// //     if(production)
// //         this.log('Built in production!');
// //     done();
// // });
// // build.rig.addPostBuildTask(renameFilesProductionTask);

//Hack-fix to get rid of hash in file names for production build temp/deploy folder:
var original_renameWithHash = build.copyAssets._renameWithHash.bind(build.copyAssets);
build.copyAssets._renameWithHash = function (gulpStream, getFilename, filenameCallback) {
    var original_GetFileName = getFilename;
    getFilename = function (hash) { return original_GetFileName(hash).replace('_' + hash, '.' + packageJson.solution.version); };
    return original_renameWithHash(gulpStream, getFilename, filenameCallback);
};

build.initialize(gulp);
