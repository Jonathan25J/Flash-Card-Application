const {contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    title: "Flash Cards Application"
})