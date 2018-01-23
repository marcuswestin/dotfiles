#!/usr/local/bin/node

var fs = require('fs'),
	path = require('path'),
	home = process.argv[2]

processDir('files-Home', home+'/.')
processDir('files-Sublime-User', home+'/Library/Application Support/Sublime Text 3/Packages/User/')

function processDir(dirname, linkPrefix) {
	var files = fs.readdirSync(path.join(__dirname, dirname))
	for (var i=0, file; file = files[i]; i++) {
		if (file[0] == '.') { continue }
		var linkPath = linkPrefix + file,
			linkPathHuman = linkPath.replace(home, '~').replace(/ /g, '\\ '),
			filePath = path.join(process.cwd(), dirname, file),
			fileStat = fs.statSync(filePath),
			linkStat
		
		console.log('\tLink: ', linkPathHuman, '<-', filePath)
		
		try {
			linkStat = fs.statSync(linkPath) // throws if nothing there
		} catch(e) {}

		if (fileStat.isDirectory()) { // Process and link directory
			if (linkStat && !linkStat.isSymbolicLink()) {
				try { fs.unlinkSync(linkPath) } catch(e) {}
			}
			fs.symlinkSync(filePath, linkPath)
			continue
		
		} else {
			// Process and link file
			if (linkStat) {
				if (linkStat.isDirectory()) {
					continue
				}
				
				if (linkStat.uid == fileStat.uid) {
					try {
						fs.unlinkSync(linkPath)
					} catch(e) {}
				} else {
					console.log(linkPathHuman, 'already exists! Please remove it.')
					process.exit(-1)
				}
			}
			
			try { fs.unlinkSync(linkPath) } catch(e) {}
			fs.linkSync(filePath, linkPath)
		}		
	}
}
