install: *
	node install.js ~
	git config --global core.excludesfile ~/.gitignore
	git config --global color.ui true
	bash install-2.sh
