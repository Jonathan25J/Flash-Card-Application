import * as process from 'child_process';
import { BrowserWindow, app } from 'electron';
import isSquirrelStartup from 'electron-squirrel-startup';
import path from 'path';
import express from './server/server.js';
import { PORT } from './utils/port.js';

if (isSquirrelStartup) {
  app.quit();
}

if (handleSquirrelEvent()) {
    app.quit();
}

function handleSquirrelEvent() {
    if (process.platform !== 'win32') {
        return false;
    }

    const ChildProcess = process

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':

            spawnUpdate(['--createShortcut', exeName]);
            return true;
        case '--squirrel-updated':

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            
            app.quit();
            return true;
    }
};

app.whenReady().then(() => {
    const app = express;
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        autoHideMenuBar: true,
        // useContentSize: true,
        // resizable: false,
        icon: path.join(path.resolve(), 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(path.resolve(), 'src/preload.js')
        },
        "build": {
            "extraResources": [
                {
                    "from": "public",
                    "to": ""
                }
            ]
        }
    })

    window.loadURL(`http://localhost:${PORT}`)


})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
})