// file purpose: bind ui events to functionality imported from other folders.
const path = require('path')

const setup = require('./setup')
const file = require('./file-io')
const helpers = require('./helpers')
const tree = require('./tree')


var init = function () {
  setup()
}

init()

// ui event elements. TODO: abstract to templates based on arrays. (ie. a button for each audio file in a folder.)
let els = {
  // file ops
  new: document.getElementById('new-file'),
  open: document.getElementById('open-file'),
  saveAs: document.getElementById('saveas-file'),
  save: document.getElementById('save-file'),

}

/* event listeners */

// File Ops //
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
