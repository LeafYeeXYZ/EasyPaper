import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openBrowser: async (url: string): Promise<void> => {
    await electronAPI.ipcRenderer.invoke('openBrowser', url)
  },
  newPaper: async (): Promise<{ filepath: string; filename: string }> => {
    return await electronAPI.ipcRenderer.invoke('newPaper')
  },
  openPaper: async (): Promise<{ filepath: string; filename: string; content: string }> => {
    return await electronAPI.ipcRenderer.invoke('openPaper')
  },
  savePaper: async (filepath: string, filename: string, content: string): Promise<void> => {
    await electronAPI.ipcRenderer.invoke('savePaper', filepath, filename, content)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
