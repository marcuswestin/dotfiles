HOME_DIR=~
VSCODE_SETTINGS_DIR="${HOME_DIR}/Library/Application Support/Code/User"

rm -f "${VSCODE_SETTINGS_DIR}/keybindings.json"
ln -snf "${HOME_DIR}/.vscode-keybindings.json" "${VSCODE_SETTINGS_DIR}/keybindings.json"

rm -f "${VSCODE_SETTINGS_DIR}/settings.json"
ln -snf "${HOME_DIR}/.vscode-settings.json" "${VSCODE_SETTINGS_DIR}/settings.json"
