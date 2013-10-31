#!/usr/local/bin/node

var fs = require('fs'),
	path = require('path'),
	home = process.argv[2]


var filesPath = path.join(__dirname, 'files')
var files = fs.readdirSync(filesPath)
for (var i=0, file; file = files[i]; i++) {
	if (file[0] == '.' || file == 'install.js' || file == 'Makefile') { continue }
	var linkPath = path.join(home, '.' + file),
		filePath = path.join(filesPath, file),
		exists = false
	try {
		fs.readlinkSync(linkPath) // throws if nothing there
		if (fs.lstatSync(linkPath).isSymbolicLink()) {
			fs.unlinkSync(linkPath)
		} else {
			console.log(linkPath, 'already exists! Please remove it. ('+file+')')
			process.exit(-1)
		}
	} catch(e) {
		if (e.code != 'ENOENT' || e.errno != 34) {
			throw e
		}
	}
	console.log('.'+file+'!')
}