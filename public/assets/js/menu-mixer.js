const el = require('./dom-elements')

function createMixer () {
  bindListeners()
}

function bindListeners () {
  // open the menu + hide the other menu
  el.mixerOpen.addEventListener('click', () => {
    el.mixer.classList.toggle('open')
    el.openMenubar.classList.toggle('display-none')
  })
}

module.exports = createMixer
