const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
const el = require('../helpers/dom-elements')

function markdownUpdate () {
  el.editor.addEventListener('input', function (e) {
    ipcRenderer.send('update-content', e.target.value)
  })
}

module.exports = markdownUpdate
