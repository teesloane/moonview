const electron = require('electron')
const { ipcMain } = require('electron')
const nativeImage = require('electron').nativeImage
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let moonview = { content: '' }

let mainWindow
let prefWindow
let previewWindow

/* ========== Main MoonView Logic ========== */

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    minWidth: 600,
    icon: nativeImage.createFromPath(__dirname + '/_src/build-assets/linux-icon.png')
  })

  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.on('closed', function () { mainWindow = null })
  mainWindow.webContents.openDevTools() // enable dev tools
}

/* ========== Markdown Window Logic ========== */
function createPreviewWindow () {
  const mainBounds = mainWindow.getBounds()
  previewWindow = new BrowserWindow({
    autoHideMenuBar: true,
    title: 'Markdown Preview',
    x: mainBounds.x + 200,
    y: mainBounds.y + 200
  })
  previewWindow.loadURL(`file://${__dirname}/public/preview.html`)
  previewWindow.on('closed', (e) => { previewWindow = null})
}

function updatePreview () {
  previewWindow.webContents.send('update-preview', moonview.content)
}

/* == IPC / Event Listeners for MarkDown Window Logic == */

// set content on update-preview event
ipcMain.on('update-content', function (e, content) {
  moonview.content = content
  if (previewWindow) {
    updatePreview()
  }
})

// create previewWindow
ipcMain.on('show-preview', function (e) {
  if (previewWindow) {
    previewWindow.focus()
  } else {
    createPreviewWindow()
  }
})

// get content and update preview
ipcMain.on('get-content', function (e) {
  updatePreview()
})

/* ========== App Event Listeners ========== */
app.on('ready', createWindow)
app.on('window-all-closed', () => { app.quit() })
app.on('activate', () => { if (mainWindow === null) createWindow()})

ipcMain.on('quitter', (e) => {
  mainWindow.destroy(); // necessary to bypass the repeat-quit-check in the render process.
  app.quit()
})
