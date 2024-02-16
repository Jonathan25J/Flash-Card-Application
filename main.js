const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.whenReady().then(() => {

    const window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    
    window.loadFile('src/pages/index.html')


})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
})