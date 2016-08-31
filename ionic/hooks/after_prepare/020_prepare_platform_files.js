#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var fs = require('fs');
var path = require('path');
var mv = require('mv');

var deleteFolderRecursive = function(removePath) {
  if( fs.existsSync(removePath) ) {
    fs.readdirSync(removePath).forEach(function(file,index){
      var curPath = path.join(removePath, file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(removePath);
  }
};

var platformPaths = ['ios', 'android/assets'];

//var rmPaths = ['lib/ionic/scss', 'css', 'js', 'dist/dist_js/app']
var rmPaths = ['lib/ionic/scss', 'css', 'js', 'templates', 'dist/dist_js/app'];
var platformDir;
for(var i = 0; i < rmPaths.length; i++){
    for(var j = 0; j < platformPaths.length; j++){
        platformDir = path.resolve(__dirname, '../../platforms/' + platformPaths[j] + '/www/' + rmPaths[i]);
        console.log("Removing dev files at " + platformDir);
        deleteFolderRecursive(platformDir);
    }
}

var mvPaths = ['dist_css', 'dist_js', 'index.html']
var fromPath, toPath;
for(var i = 0; i < mvPaths.length; i++){
    for(var j = 0; j < platformPaths.length; j++){
        fromPath = path.resolve(__dirname, '../../platforms/' + platformPaths[j] + '/www/dist/' + mvPaths[i]);
        toPath = path.resolve(__dirname, '../../platforms/' + platformPaths[j] + '/www/' + mvPaths[i]);

        console.log("Moving dist files from " + fromPath + ' to ' + toPath);
        mv(fromPath, toPath, {mkdirp: true}, function(err) {});
    }
}
