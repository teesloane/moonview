const createAppMenu = require('./core/menu-app')
const createAmbientMenu = require('./core/menu-ambient')
const settings = require('./core/settings')
const markdownUpdate = require('./core/content-update')
const file = require('./core/file-io')

const setup = function () {
  settings.setDefault()
  createAppMenu()
  createAmbientMenu()
  markdownUpdate()

  file.windowCloseCheck()
  // listen for app close // if things are unsaved run a prompt 
}

setup()
