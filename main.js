const electron = require('electron')
const { ipcMain } = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
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

  // Open the DevTools.
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
