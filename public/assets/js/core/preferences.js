const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const template = path.join(__dirname, '../../../preferences.html')
const el = require('../helpers/dom-elements')
const settings = require('./settings')

console.log(el, settings)

const preferences = {
  fontSize (value) {
    console.log(value)
  }
}
console.log(el.fontSize)
el.fontSize.addEventListener('change', () => {
  preferences.fontSize(el.fontSize.value)
})

module.exports = preferences