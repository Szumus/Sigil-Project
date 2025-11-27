import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Aby używać require w ESM
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Ścieżki do folderów projektu
process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

// Wskaźnik public folderu dla ikony i innych zasobów
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Zmienna globalna dla okna
let win: BrowserWindow | null = null

// Funkcja tworząca główne okno aplikacji
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      // preload script z contextBridge
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true, // wymagana do bezpiecznego expose API
      nodeIntegration: false, // musi być false, żeby nie dawać pełnego Node w rendererze
    },
  })

  // Przykład wysyłania wiadomości do renderer po załadowaniu
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Ładowanie strony: dev server w trybie deweloperskim, plik build w produkcji
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Obsługa MessageBox z React
ipcMain.handle('show-message-box', async (_event, options: Electron.MessageBoxOptions) => {
  if (!win) return null
  const result = await dialog.showMessageBox(win, options)
  return result
})

// Zamknięcie okien i zakończenie aplikacji
app.on('window-all-closed', () => {
  // Na macOS zwyczajowo nie zamyka się aplikacji przy zamknięciu wszystkich okien
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

// Aktywacja aplikacji na macOS (kliknięcie ikony w docku)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Tworzenie okna po gotowości Electron
app.whenReady().then(createWindow)
