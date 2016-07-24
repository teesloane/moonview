const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const template = path.join(__dirname, '../../../preferences.html')
const el = require('../helpers/dom-elements')

let prefWindow = null

const preferences = {
  // open the preferences window
  open () {
    if (prefWindow !== null) return

    prefWindow = new BrowserWindow({
      width: 300,
      height: 300,
      show: false,
      resizable: false
    })

    prefWindow.once('ready-to-show', () => {
      prefWindow.show()
    })

    prefWindow.on('closed', () => { prefWindow = null })

    // prefWindow.setMenu(null)
    
    prefWindow.loadURL(`file://${template}`)
  },


  fontSize () {
    el.editor.style.fontSize = el.fontSize.value
  }
}

// double listening for font changes.
el.fontSize.addEventListener('change', preferences.fontSize)
el.fontSize.addEventListener('blur', preferences.fontSize)


module.exports = preferences
