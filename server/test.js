const fs = require('fs');
const Mocha = require('mocha');
let grepPattern = '.';
let end2end = false;

const args = process.argv.slice(2);
for(let idx in args) {
    let arg = args[idx];
    switch(arg) {
        case "--grep":
        case "-g":
            grepPattern = args[idx+1];
            break;
        case "--e2e":
        case "-e":
            end2end = true;  
        default:
            break;
    }
}

function runTests() {
    // mocha.run uses node require cache. clear this to prevent stale tests
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] });

    // populate env data for database connection used by models that are tested
    require('dotenv').config();
    const db = require('./db');

    // Instantiate a Mocha instance.
    var mocha = new Mocha();

    // Recursively retrieve test files
    const testFiles = recursiveGetTestFilesSync('/tests');

    // Add each .js file to the mocha instance
    testFiles.forEach(function(file){
        if(file.indexOf('routes') === -1) {
            mocha.addFile(file);
        }
    });
    // Run the tests.
    mocha.grep(grepPattern).run(function(failures){
        process.exitCode = failures ? -1 : 0;  // exit with non-zero status if there were failures
        // drains connection pool for database and closes connection
        db.destroy();
    });
}

function runE2ETests() {
    // mocha.run uses node require cache. clear this to prevent stale tests
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] });

    // populate env data for database connection used by models that are tested
    require('dotenv').config();
    const db = require('./db');

    // Instantiate a Mocha instance.
    var mocha = new Mocha();

    // Recursively retrieve test files
    const testFiles = recursiveGetTestFilesSync('/tests/routes');

    // Add each .js file to the mocha instance
    testFiles.forEach(function(file){
        mocha.addFile(file);
    });
    // Run the tests.
    mocha.grep(grepPattern).run(function(failures){
        process.exitCode = failures ? -1 : 0;  // exit with non-zero status if there were failures
        // drains connection pool for database and closes connection
        db.destroy();
    });
}

function recursiveGetTestFilesSync(dir) {
    var testDir = process.cwd() + dir;
    var testFiles = []

    var getFiles = function(path, files){
        fs.readdirSync(path).forEach(function(file){
            var subpath = path + '/' + file;
            if(fs.lstatSync(subpath).isDirectory()){
                getFiles(subpath, files);
            } else if(file.substr(-7) === 'spec.js') {
                files.push(path + '/' + file);
            }
        });
    }

    getFiles(testDir, testFiles);
    return testFiles;
}

if(!end2end) {
    runTests();
} else {
    runE2ETests();
}
