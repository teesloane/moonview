const createAppMenu = require('./menu-app')
const createAmbientMenu = require('./menu-ambient')

const setup = function () {
  createAppMenu()
  createAmbientMenu()
}

setup()
// module.exports = setup
