const createAppMenu = require('./menu-app')
const createAmbientMenu = require('./menu-ambient')
const createMixer = require('./menu-mixer')

const setup = function () {
  createAppMenu()
  createAmbientMenu()
  createMixer()
}

setup()
// module.exports = setup
