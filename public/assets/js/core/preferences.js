const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const template = path.join(__dirname, '../../../preferences.html')
console.log(template) 

let prefWindow = null

const preferences = {
  // open the preferences window
  open () {
    if (prefWindow !== null) return
    prefWindow = new BrowserWindow({width: 300, height: 400})
    prefWindow.on('closed', () => { prefWindow = null })
  prefWindow.loadURL(`file://${template}`)
  }
}

module.exports = preferences
