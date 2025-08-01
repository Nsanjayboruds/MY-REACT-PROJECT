const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  searchFiles: (query) => ipcRenderer.invoke('search-files', query),
  openFile: (path) => ipcRenderer.send('open-file', path)
})