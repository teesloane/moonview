const createAppMenu = require('./core/menu-app')
const createAmbientMenu = require('./core/menu-ambient')
const createMixer = require('./core/menu-mixer')

const setup = function () {
  createAppMenu()
  createAmbientMenu()
  createMixer()
}

setup()
// module.exports = setup
