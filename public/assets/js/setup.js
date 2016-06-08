const helpers = require('./helpers')
const tree = require('./tree')
const createMenu = require('./menu')

// mounting points for buttons for audio, sounds, bgs etc.
let loopButtons = document.getElementById('loop-buttons')
let backgroundButtons = document.getElementById('background-buttons')
let fontButtons = document.getElementById('font-buttons')

const setup = function () {
  // create menu:
  createMenu()
  // create font buttons

  // create audio buttons
  helpers.walk(tree.fonts, null, (assetList, count) => {
    helpers.createButtons(assetList, count, fontButtons, count + 1, 'font', helpers.toggleFonts)
  })

  // create audio buttons
  helpers.walk(tree.audio, ['.wav', '.mp3'], (assetList, count) => {
    helpers.createButtons(assetList, count, loopButtons, count + 1, 'loop', helpers.toggleAudio)
  })

  helpers.walk(tree.bg, ['.jpeg', '.png'], (assetList, count) => {
    helpers.createButtons(assetList, count, backgroundButtons, count + 1, 'bg', helpers.toggleBackground)
  })
}

module.exports = setup
