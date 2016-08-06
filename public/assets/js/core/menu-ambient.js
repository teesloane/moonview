/* Assembles the menu for accessing ambient assets and interacting with:
Imports interactions files (audio, font etc) for creating the buttons. This file also
sets up all the necessary event listeners for interacting with the above buttons */

let el = require('../helpers/dom-elements')
const audio = require('./interaction/audio')
const backDrop = require('./interaction/back-drop')
const font = require('./interaction/font')
const fieldRecording = require('./interaction/field-recording.js')

function createAmbientMenu () {
  // create buttons for each interactive ambient asset
  audio.createButtons()
  backDrop.createButtons()
  font.createButtons()
  fieldRecording.createButtons()

  mainMenuListeners()
  mixerMenuListeners()
}

// Listeners specific to the ambient menu
function mainMenuListeners () {
  el.openMenubar.addEventListener('click', () => {
    el.menubar.classList.toggle('open')
    el.openMenubar.classList.toggle('display-none')
    el.closeMenubar.classList.toggle('display-none')
    el.openMixer.classList.add('display-none')
  })

  el.closeMenubar.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, 'null')
    el.menubar.classList.toggle('open')
    el.menubar.classList.remove('extend')
    el.openMixer.classList.remove('display-none')

    el.editor.focus()

    // hide the asset drawer if it's open
    el.allAssetButtons.forEach((row) => {
      row.classList.add('display-none')
    })

    // swap open/close for sidebar buttons
    el.openMenubar.classList.toggle('display-none')
    el.closeMenubar.classList.toggle('display-none')
    el.assetDrawer.classList.add('display-none')
  })

  // event listeners for toggling asset buttons in the second drawer
  el.openMuzak.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openMuzak)
    swapAssets(el.allAssetButtons, el.muzakAssets)
  })

  el.openBackdrop.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openBackdrop)
    swapAssets(el.allAssetButtons, el.backdropAssets)
  })

  el.openTypeface.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openTypeface)
    swapAssets(el.allAssetButtons, el.typefaceAssets)
  })

  el.openFieldRecording.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openFieldRecording)
    swapAssets(el.allAssetButtons, el.fieldRecordingAssets)
  })

  // Dom manipulation to happen when the editor is focused on & menus are open
  el.editor.addEventListener('click', () => {
    // close any open bottom level menus
    el.menubar.classList.remove('open')
    el.mixer.classList.remove('open')

    // close the asset drawer if it's open
    el.assetDrawer.classList.add('display-none')

    // revert menu icons to what they should be
    el.openMenubar.classList.remove('display-none') // show the open menu button
    el.closeMenubar.classList.add('display-none') // hide the x for menu.

    el.openMixer.classList.remove('display-none') // show the open for mixer
    el.closeMixer.classList.add('display-none') // hide the close button
  })
}

// listners specific to the audio mixer menu
function mixerMenuListeners () {
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

// for swapping which row of media assets are displayed
// (show the music buttons, img buttons etc)
function swapAssets (buttonRow, exception) {
  el.assetDrawer.classList.remove('display-none')
  el.menubar.classList.add('extend')
  buttonRow.forEach((row) => {
    if (row === exception) {
      row.classList.remove('display-none')
    } else {
      row.classList.add('display-none')
    }
  })
}

// highlights the currently selected button.
function swapButtons (buttonRow, exception) {
  buttonRow.forEach((button) => {
    if (button === exception) {
      button.classList.add('on')
      button.classList.remove('dim')
    } else {
      button.classList.remove('on')
      button.classList.add('dim')
    }
  })
}

module.exports = createAmbientMenu
