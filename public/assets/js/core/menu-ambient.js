let el = require('../helpers/dom-elements')
const assemble = require('../helpers/asset-assembly')
const tree = require('../helpers/tree')

function createAmbientMenu () {
  createButtons()
  createListeners()

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

function createButtons () {
  // create audio buttons
  assemble.walk(tree.audio, ['.wav', '.mp3'], (assetList, count) => {
    assemble.createButtons(assetList, count, el.loopButtons, count + 1, 'loop', assemble.toggleAudio)
  })

  assemble.createCancelButton(el.loopCancel, 'loop', function () {
    if (tree.selectedAudio !== '') {
      tree.selectedAudio.pause()
    }
    tree.selectedAudio = ''

    el.loopButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })

  // create background buttons
  assemble.walk(tree.bg, ['.jpeg', '.jpg', '.png'], (assetList, count) => {
    assemble.createButtons(assetList, count, el.backgroundButtons, count + 1, 'bg', assemble.toggleBackground)
  })

  assemble.createCancelButton(el.backgroundCancel, 'background', function () {
    document.body.style.background = tree.defaultBackground

    el.backgroundButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })

  // create font buttons
  assemble.walk(tree.fonts, null, (assetList, count) => {
    assemble.createButtons(assetList, count, el.fontButtons, count + 1, 'font', assemble.toggleFonts)
  })

  // Create field recording buttons:
  assemble.walk(tree.fieldRecordings, ['.wav', '.mp3'], (assetList, count) => {
    assemble.createButtons(assetList, count, el.fieldRecordingButtons, count + 1, 'fieldRecording', assemble.toggleFieldRecording)
  })

  assemble.createCancelButton(el.fieldRecordingCancel, 'fieldRecording', function () {
    if (tree.selectedFieldRecording !== '') {
      tree.selectedFieldRecording.pause()
    }
    tree.selectedFieldRecording = ''

    el.fieldRecordingButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })
}

// Listeners specific to the ambient menu
function createListeners () {
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

  el.openWallpaper.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openWallpaper)
    swapAssets(el.allAssetButtons, el.wallpaperAssets)
  })

  el.openTypeface.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openTypeface)
    swapAssets(el.allAssetButtons, el.typefaceAssets)
  })

  el.openFieldRecording.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openFieldRecording)
    swapAssets(el.allAssetButtons, el.fieldRecordingAssets)
  })
}

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
  // buttonRow.forEach((button) => { button.classList.remove('on') })
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
