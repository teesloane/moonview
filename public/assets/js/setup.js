const createAppMenu = require('./core/menu-app')
const createAmbientMenu = require('./core/menu-ambient')
const createMixer = require('./core/menu-mixer')
const settings = require('./core/settings')

const setup = function () {
  settings.setDefault()
  createAppMenu()
  createAmbientMenu()
  createMixer()
}

setup()
