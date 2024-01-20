// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  registerExtensionCommands(context);
}

function registerExtensionCommands(context: vscode.ExtensionContext) {
  // Register a static command that prompts the user to select a command
  let disposable = vscode.commands.registerCommand("keybind-palette-interop.runKeybindCommand", async () => {
    let commands = getCommands();

    const commandId = await vscode.window.showQuickPick(
      commands.map((c) => ({ label: c.title, id: c.id })),
      { placeHolder: "Select a command" }
    );
    if (commandId) {
      let selectedCommand = commands.find((c) => c.id === commandId.id);
      console.log(`Command id ${commandId.id}`);

      vscode.commands.executeCommand(selectedCommand!.keybind_id);
    }
  });

  context.subscriptions.push(disposable);
}

function getCommands(): Array<Command> {
  const config = vscode.workspace.getConfiguration("keybind-palette-interop");
  return config.get("commands") as Array<Command>;
}

interface Command {
  id: string;
  title: string;
  keybind_id: string;
}
// This method is called when your extension is deactivated
export function deactivate() {}
