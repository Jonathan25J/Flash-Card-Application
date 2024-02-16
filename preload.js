const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    title: "Sheets Application"
})