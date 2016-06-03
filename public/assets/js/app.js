const setup = require('./setup')
const file = require('./file-io')
var init = function () {
  setup()
}

init()

// ui event elements.
let els = {
  new: document.getElementById('new-file'),
  open: document.getElementById('open-file'),
  saveAs: document.getElementById('saveas-file'),
  save: document.getElementById('save-file')
}

// event listeners
els.new.addEventListener('click', () => {
  file.newFile()
})

els.open.addEventListener('click', () => {
  file.open()
})

els.saveAs.addEventListener('click', () => {
  file.saveAs()
})

els.save.addEventListener('click', () => {
  file.save()
})
