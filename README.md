# keybind-palette-interop

VSCode offers two ways user can interact with the editor & extensions: keybindings and command palette. This extension allows to
interop between the two by:
- Call command palette from keybinding
- Call keybinding based command from command palette

## Use case:

### [Settings Cycler](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-settings-cycler)
A great way to toggle between two set of settings via keyboard shortcut.

```json
"settings.cycle": [
    {
        "id": "toggleGitIgnoreSearch",
        "overrideWorkspaceSettings": true,
        "values": [
            {
                "search.useIgnoreFiles": true,
                "search.useParentIgnoreFiles": true,
            },
            {
                "search.useIgnoreFiles": false,
                "search.useParentIgnoreFiles": false,
            }
        ]
    },
],
```

However, like many other extensions it only offers keyboard shortcuts to call those commands. This extension allows to call those by

```json
"keybind-palette-interop.commands": [
    {
        "keybind_id": "settings.cycle.toggleGitIgnoreSearch",
        "title": "Toggle GitIgnore Search"
    },
],
```

Now you can call the keybind by `Ctrl+Shift+P` and type `Run Keybind via Command palette`.