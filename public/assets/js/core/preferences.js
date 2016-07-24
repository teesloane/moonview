const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const template = path.join(__dirname, '../../../preferences.html')
// const el = require('../helpers/dom-elements')
const settings = require('./settings')


const preferences = {
  fontSize (value) {
    console.log(value)
  }
}

let fontSize = document.getElementById('pref-font-size')
fontSize.addEventListener('change', () => {
  settings.updateSettings('fontSize', fontSize.value) 
})

module.exports = preferences  