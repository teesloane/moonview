const marked = require('marked')
const { ipcRenderer } = require('electron')
const container = document.getElementById('preview-container')

ipcRenderer.send('get-content')

ipcRenderer.on('update-preview', function (e, content) {
  container.innerHTML = marked(content)
})
