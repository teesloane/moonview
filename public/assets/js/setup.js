const createAppMenu = require('./core/menu-app')
const createAmbientMenu = require('./core/menu-ambient')
const settings = require('./core/settings')
const markdownUpdate = require('./core/content-update')

const setup = function () {
  settings.setDefault()
  createAppMenu()
  createAmbientMenu()
  markdownUpdate()
}

setup()
