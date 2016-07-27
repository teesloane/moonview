const createAppMenu = require('./core/menu-app')
const createAmbientMenu = require('./core/menu-ambient')
const createMixer = require('./core/menu-mixer')
const settings = require('./core/settings')
const createUpdateEventListener = require('./core/content-update')

const setup = function () {
  settings.setDefault()
  createAppMenu()
  createAmbientMenu()
  createMixer()
  createUpdateEventListener()
}

setup()
