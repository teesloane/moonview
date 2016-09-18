const electron = require('electron')
const { ipcMain } = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let mainWindow
let prefWindow
let previewWindow

const moonview = {
  content: ''
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    minWidth: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// create window for markdown preview
function createPreviewWindow () {
  const mainBounds = mainWindow.getBounds()
  previewWindow = new BrowserWindow({
    autoHideMenuBar: true,
    title: 'Markdown Preview',
    x: mainBounds.x + 200,
    y: mainBounds.y + 200
  })
  previewWindow.loadURL(`file://${__dirname}/public/preview.html`)

  // remove reference to the window object when the window is closed
  previewWindow.on('closed', function (e) {
    previewWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed. (not mac)
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') {
    app.quit()
  // }
})

app.on('activate', function () {
  // mac dock click to reopen a window instance.
  if (mainWindow === null) {
    createWindow()
  }
})

function updatePreview () {
  previewWindow.webContents.send('update-preview', moonview.content)
}

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

ipcMain.on('quitter', function(e) {
  mainWindow.close();
  app.quit();
})
