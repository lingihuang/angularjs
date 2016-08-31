#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var fs = require('fs');
var path = require('path');

var deleteFolderRecursive = function(removePath) {
    if( fs.existsSync(removePath) ) {
        fs.readdirSync(removePath).forEach(function(file,index) {
            // Leo: Keep every fonts in lib
            if (removePath.indexOf('/fonts') >= 0) {
                return;
            }

            var curPath = path.join(removePath, file);
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

        // Leo: Cannot remove not empty folder.
        if (removePath.lastIndexOf('/www/lib') >= 0){
            return;
        }

        fs.rmdirSync(removePath);
    }
};

var platformPaths = ['ios', 'android/assets'];
var rmPaths = ['dist', 'lib'];
for(var i = 0; i < platformPaths.length; i++){
    for(var j = 0; j < rmPaths.length; j++){
        var distPath = path.resolve(__dirname, '../../platforms/' + platformPaths[i] + '/www/' + rmPaths[j]);
        console.log("Cleaning dist folder " + distPath);
        deleteFolderRecursive(distPath);
    }
}
