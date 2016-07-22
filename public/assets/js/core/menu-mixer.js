const el = require('../helpers/dom-elements')

function createMixer () {
  bindListeners()
}

function bindListeners () {
  // open the menu + hide the other menu
  el.openMixer.addEventListener('click', () => {
    el.mixer.classList.toggle('open')
    el.closeMixer.classList.toggle('display-none')
    el.openMixer.classList.toggle('display-none')

    el.openMenubar.classList.toggle('display-none')
  })

  el.closeMixer.addEventListener('click', () => {
    el.mixer.classList.toggle('open')
    el.closeMixer.classList.toggle('display-none')
    el.openMixer.classList.toggle('display-none')

    el.openMenubar.classList.toggle('display-none')
  })
}

module.exports = createMixer
