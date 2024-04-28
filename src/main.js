import { optimizer } from '@electron-toolkit/utils';
import * as process from 'child_process';
import { BrowserWindow, app } from 'electron';
import path from 'path';
import express from './server/server.js';
import { PORT } from './utils/port.js';

app.whenReady().then(() => {
    // eslint-disable-next-line no-unused-vars
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    app.setAppUserModelId('com.electron.flashcards')

    // eslint-disable-next-line no-unused-vars
    const expressApp = express;
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        autoHideMenuBar: true,
        // useContentSize: true,
        // resizable: false,
        icon: path.join(path.resolve(), 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
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

    window.maximize()


})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
})

export default app