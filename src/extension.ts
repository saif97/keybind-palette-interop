// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  //Get the configuration for your extension
  const config = vscode.workspace.getConfiguration("keybing-command-palette-interop");
  console.log(config);

  // Get the commands from the configuration
  const commands = config.get("commands") as Array<{ id: string; message: string }>;
  console.log(commands);

  // Register each command
  for (const command of commands) {
    let disposable = vscode.commands.registerCommand(command.id, () => {
      vscode.window.showInformationMessage(command.message);
    });

    context.subscriptions.push(disposable);
  }

  // Register a static command that prompts the user to select a command
  let disposable = vscode.commands.registerCommand("keybing-command-palette-interop.a", async () => {
    const commandId = await vscode.window.showQuickPick(
      commands.map((c) => c.id),
      { placeHolder: "Select a command" }
    );
    if (commandId) {
      vscode.commands.executeCommand(commandId);
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
