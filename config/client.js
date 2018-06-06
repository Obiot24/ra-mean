//Change route dist angular
let fs = require('fs')
var file = require('../client/angular.json')
file.projects.client.architect.build.options.outputPath = "../dist"
fs.writeFile('./client/angular.json', JSON.stringify(file, null, '\t'), function (err) {
    if (err) return console.log(err);
});