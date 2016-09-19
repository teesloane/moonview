const {remote, ipcRenderer} = require('electron')
const {Menu} = remote
const file = require('./file-io')
const el = require('../helpers/dom-elements')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        click () { file.newFile() }
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click () { file.open() }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click () { file.save() }
      },
      {
        label: 'Save As',
        click () { file.saveAs() }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
      {
        label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
        click () { el.preferences.classList.toggle('display-none') }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Markdown Preview',
        accelerator: 'CmdOrCtrl+P',
        click (item, focusedWindow) {
          ipcRenderer.send('show-preview')
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      },
      
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  }

]

if (process.platform === 'darwin') {
  const name = require('electron').remote.app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click () {
          if(file.isUnsaved() || file.hasChanged()) {
            // prompt - save or just quit?
            file.fileWarning('You have unsaved work.', 'Save', 'Quit', function(){
              // OPTION A - save
              file.save();
            }, function() {
              // OPTION B: Quit.
              ipcRenderer.send('quitter')
            })
          } else {
            // file is saved and no new work has been done:
            ipcRenderer.send('quitter')
          }
        }
      }
    ]
  })
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  )
}

module.exports = function createAppMenu () {
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
