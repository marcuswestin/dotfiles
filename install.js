#!/usr/local/bin/node

var fs = require('fs'),
	path = require('path'),
	home = process.argv[2]

processDir('files-Home', home+'/.')
// processDir('files-Sublime-User', home+'/Library/Application Support/Sublime Text 3/Packages/User/')

function processDir(dirname, linkPrefix) {
	var files = fs.readdirSync(path.join(__dirname, dirname))
	for (var i=0, file; file = files[i]; i++) {
		if (file[0] == '.') { continue }
		var linkPath = linkPrefix + file,
			linkPathHuman = linkPath.replace(home, '~').replace(/ /g, '\\ '),
			filePath = path.join(dirname, file),
			fileStat = fs.statSync(filePath),
			linkStat
		
		console.log('\t', linkPathHuman)
		
		try {
			var linkStat = fs.statSync(linkPath) // throws if nothing there
		} catch(e) {}

		if (linkStat) {
			if (linkStat.uid == fileStat.uid) {
				try {
					fs.unlinkSync(linkPath)
				} catch(e) {}
			} else {
				console.log(linkPath, 'already exists! Please remove it.')
				process.exit(-1)
			}
		}
		
		fs.linkSync(filePath, linkPath)
	}
}
