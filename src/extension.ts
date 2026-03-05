import * as vscode from 'vscode';
import * as path from 'path';
import * as sound from 'sound-play';

export function activate(context: vscode.ExtensionContext) {
    console.log('Faahhh Extension is now active!');

    // This event triggers whenever a command in the terminal finishes
    const terminalListener = vscode.window.onDidEndTerminalShellExecution(async (event) => {
        // Exit code 0 means "Success"
        // Exit code undefined means it was cancelled
        // Any other number (usually 1) means "Error/Crash"
        const exitCode = event.exitCode;

        if (exitCode !== undefined && exitCode !== 0) {
            console.log(`Command failed with exit code: ${exitCode}`);
            
            const soundPath = path.join(context.extensionPath, "media", "faahh.mp3");
            
            // Play the sound because the code execution failed
            sound.play(soundPath).catch((err: any) => {
                console.error("Playback error:", err);
            });

            vscode.window.showErrorMessage("Faahhh! Your code crashed!");
        }
    }); 

    context.subscriptions.push(terminalListener);
}

export function deactivate() {}