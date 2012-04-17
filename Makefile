all:

install: *
	node install.js ~
	git config --global core.excludesfile ~/.gitignore
