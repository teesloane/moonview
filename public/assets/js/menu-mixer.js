const el = require('./dom-elements')

function createMixer () {
  bindListeners()
}

function bindListeners () {
  // open the menu + hide the other menu
  el.mixerOpen.addEventListener('click', () => {
    el.mixer.classList.toggle('open')
    el.mixerClose.classList.toggle('display-none')
    el.mixerOpen.classList.toggle('display-none')

    el.openMenubar.classList.toggle('display-none')
  })

  el.mixerClose.addEventListener('click', () => {
    el.mixer.classList.toggle('open')
    el.mixerClose.classList.toggle('display-none')
    el.mixerOpen.classList.toggle('display-none')

    el.openMenubar.classList.toggle('display-none')
  })
}

module.exports = createMixer
