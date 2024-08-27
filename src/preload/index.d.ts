import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openBrowser: (url: string) => Promise<void>
      newPaper: () => Promise<{ filepath: string; filename: string }>
      openPaper: () => Promise<{ filepath: string; filename: string; content: string }>
      savePaper: (filepath: string, filename: string, content: string) => Promise<void>
      createTextFile: (content: string, ext: string, defaultName: string) => Promise<boolean>
      embedImageIntoHtml: (html: string, filepath: string) => Promise<string>
      createPdf: (
        markdown: string,
        themeName: string,
        filepath: string,
        filename: string
      ) => Promise<boolean>
    }
  }
}
