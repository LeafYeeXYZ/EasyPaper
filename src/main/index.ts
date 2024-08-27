import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'node:fs/promises'
import path from 'node:path'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    minWidth: 768,
    minHeight: 512,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC
  ipcMain.handle('openBrowser', async (_, url: string) => {
    await shell.openExternal(url)
  })
  ipcMain.handle('newPaper', async (): Promise<{ filepath: string; filename: string }> => {
    // 弹出文件选择框
    const { filePath, canceled } = await dialog.showSaveDialog({
      title: '新建文档',
      filters: [{ name: 'Markdown 文件', extensions: ['md'] }],
      showsTagField: false,
      properties: ['createDirectory']
    })
    if (canceled) {
      return { filepath: '', filename: '' }
    } else {
      const filepath = path.dirname(filePath)
      const filename = path.basename(filePath)
      await fs.writeFile(filePath, '', 'utf-8')
      return { filepath, filename }
    }
  })
  ipcMain.handle(
    'openPaper',
    async (): Promise<{ filepath: string; filename: string; content: string }> => {
      // 弹出文件选择框
      const { filePaths, canceled } = await dialog.showOpenDialog({
        title: '打开文档',
        filters: [{ name: 'Markdown 文件', extensions: ['md'] }]
      })
      if (canceled) {
        return { filepath: '', filename: '', content: '' }
      } else {
        const filepath = path.dirname(filePaths[0])
        const filename = path.basename(filePaths[0])
        const content = await fs.readFile(filePaths[0], 'utf-8')
        return { filepath, filename, content }
      }
    }
  )
  ipcMain.handle(
    'savePaper',
    async (_, filepath: string, filename: string, content: string): Promise<void> => {
      await fs.writeFile(path.resolve(filepath, filename), content, 'utf-8')
    }
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
