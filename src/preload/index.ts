import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openBrowser: (url: string): Promise<void> => {
    return electronAPI.ipcRenderer.invoke('openBrowser', url)
  },
  newPaper: (): Promise<{ filepath: string; filename: string }> => {
    return electronAPI.ipcRenderer.invoke('newPaper')
  },
  openPaper: (): Promise<{ filepath: string; filename: string; content: string }> => {
    return electronAPI.ipcRenderer.invoke('openPaper')
  },
  savePaper: (filepath: string, filename: string, content: string): Promise<void> => {
    return electronAPI.ipcRenderer.invoke('savePaper', filepath, filename, content)
  },
  createTextFile: (content: string, ext: string, defaultName: string): Promise<boolean> => {
    return electronAPI.ipcRenderer.invoke('createTextFile', content, ext, defaultName)
  },
  embedImageIntoHtml: (html: string, filepath: string): Promise<string> => {
    return electronAPI.ipcRenderer.invoke('embedImageIntoHtml', html, filepath)
  },
  createPdf: (
    markdown: string,
    themeName: string,
    filepath: string,
    filename: string
  ): Promise<boolean> => {
    return electronAPI.ipcRenderer.invoke('createPdf', markdown, themeName, filepath, filename)
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
