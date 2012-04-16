#!/usr/local/bin/node

var fs = require('fs'),
	path = require('path'),
	home = process.argv[2],


var filesPath = path.join(__dirname, 'files')
var files = fs.readdirSync(filesPath)
for (var i=0, file; file = files[i]; i++) {
	if (file[0] == '.' || file == 'install.js' || file == 'Makefile') { continue }
	var linkPath = path.join(home, '.' + file),
		filePath = path.join(filesPath, file)
	if (path.existsSync(linkPath)) {
		var linkStat = fs.lstatSync(linkPath)
		if (linkStat.isSymbolicLink()) {
			fs.unlinkSync(linkPath)
		} else {
			console.log(linkPath, 'already exists! Please remove it first. Skipping', file)
			continue
		}
	}
	console.log('.'+file+'!')
	fs.symlinkSync(filePath, linkPath)
}

var files = fs.readdirSync(filesPath)
for (var i=0, file; file = files[i]; i++) {
	if (file[0] == '.' || file == 'install.js' || file == 'Makefile') { continue }
	var linkPath = path.join(home, '.' + file),
		filePath = path.join(filesPath, file)
	if (path.existsSync(linkPath)) {
		var linkStat = fs.lstatSync(linkPath)
		if (linkStat.isSymbolicLink()) {
			fs.unlinkSync(linkPath)
		} else {
			console.log(linkPath, 'already exists! Please remove it first. Skipping', file)
			continue
		}
	}
	console.log('.'+file+'!')
	fs.symlinkSync(filePath, linkPath)
}
