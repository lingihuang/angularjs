#!/usr/bin/env node

/*******************
Minifying Your App’s Source Code
http://blog.ionic.io/minifying-your-source-code/
*******************/

var fs = require('fs');
var path = require('path');
var jshint = require('jshint').JSHINT;
var async = require('async');

var foldersToProcess = [
    'js'
];

foldersToProcess.forEach(function(folder) {
    processFiles('www/' + folder);
});

function processFiles(dir, callback) {
    var errorCount = 0;
    fs.readdir(dir, function(err, list) {
        if (err) {
            console.log('Linting Error: ' + err);
            return;
        }
        async.each(list, function(file, innercallback) {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (!stat.isDirectory()) {
                    if (path.extname(file) === '.js') {
                        lintFile(file, function(hasError) {
                            if (hasError) {
                                errorCount++;
                            }
                            innercallback();
                        });
                    } else {
                        innercallback();
                    }
                } else {
                    processFiles(file, callback);
                }
            });
        }, function(error) {
            if(errorCount > 0) {
                process.exit(1);
            }
        });
    });
}

function lintFile(file, callback) {
    fs.readFile(file, function(err, data) {
        if (err) {
            console.log('Error reading file: ' + err);
            return;
        }
        if (jshint(data.toString())) {
            callback(false);
        } else {
            console.log('JSHint errors in file ' + file);
            var out = jshint.data(),
            errors = out.errors;
            for (var j = 0; j < errors.length; j++) {
                console.log(errors[j].line + ':' + errors[j].character + ' -> ' + errors[j].reason + ' -> ' + errors[j].evidence);
            }
            console.log('-----------------------------------------');
            callback(true);
        }
    });
}
