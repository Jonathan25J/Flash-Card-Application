const { app, BrowserWindow, ipcMain } = require('electron')
const express = require('./src/back-end/server')
const path = require('path')
const { PORT } = require('./src/utils')

app.whenReady().then(() => {
    const window = new BrowserWindow({
        height: 600,
        width: 800, 
        // autoHideMenuBar: true,
        // useContentSize: true,
        // resizable: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
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