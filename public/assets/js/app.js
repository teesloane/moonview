const setup = require('./setup')
const file = require('./file-io')
var init = function () {
  setup()
}

init()

// ui event elements.
let els = {
  open: document.getElementById('open-file'),
  save: document.getElementById('save-file')
}

// event listeners
els.open.addEventListener('click', () => {
  file.open()
})

els.save.addEventListener('click', () => {
  file.save()
})
