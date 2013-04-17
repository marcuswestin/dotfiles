install: *
	node install.js ~
	git config --global core.excludesfile ~/.gitignore
	git config --global color.ui true
	mkdir -p ~/bin
	if [ ! -f ~/bin/subl ]; then ln -s /Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl ~/bin/subl; fi;
	rm -rf ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/User
	ln -snf `pwd`/Sublime-User ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/User
