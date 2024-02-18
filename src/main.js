import { fork } from 'child_process';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { PORT } from './utils/port.js';

app.whenReady().then(() => {
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        // autoHideMenuBar: true,
        // useContentSize: true,
        // resizable: false,
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

    const serverProcess = fork(path.join(path.resolve(), 'src/server/server.js'), [])

    serverProcess.on('data', (data) => {
        console.log(`Child stdout: ${data}`);
      });

    serverProcess.on('error', (err) => {
        console.error('Failed to start server process:', err);
    })

    serverProcess.on('close', (code) => {
        console.log('Server process exited with code', code);
    })

    window.loadURL(`http://localhost:${PORT}`)


})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
})