const help = require('./helpers')
const tree = require('./tree')
const createMenu = require('./menu')
const el = require('./dom-elements')

const setup = function () {
  // create menu:
  createMenu()

  // create event listenersfor menu drawer buttons (ie. Muzak, Type etc.)
  drawerListeners()

  // create sidebar buttons
  createButtons()
}

function createButtons () {
  // create audio buttons
  help.walk(tree.audio, ['.wav', '.mp3'], (assetList, count) => {
    help.createButtons(assetList, count, el.loopButtons, count + 1, 'loop', help.toggleAudio)
  })

  help.createCancelButton(el.loopCancel, 'loop', function () {
    if (tree.selectedAudio !== '') {
      tree.selectedAudio.pause()
    }
    tree.selectedAudio = ''

    el.loopButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })

  // create background buttons
  help.walk(tree.bg, ['.jpeg', '.jpg', '.png'], (assetList, count) => {
    help.createButtons(assetList, count, el.backgroundButtons, count + 1, 'bg', help.toggleBackground)
  })

  help.createCancelButton(el.backgroundCancel, 'background', function () {
    document.body.style.background = tree.defaultBackground

    el.backgroundButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })

  // create font buttons
  help.walk(tree.fonts, null, (assetList, count) => {
    help.createButtons(assetList, count, el.fontButtons, count + 1, 'font', help.toggleFonts)
  })

  // Create typing sound buttons:
  help.walk(tree.keySounds, ['.wav', '.mp3'], (assetList, count) => {
    help.createButtons(assetList, count, el.keySoundButtons, count + 1, 'keySound', help.fireKeySound)
  })

  help.createCancelButton(el.keySoundCancel, 'keySound', function () {
    document.onkeydown = '' // turn off key sounds.

    el.keySoundButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })
}

function drawerListeners () {
  el.openMenubar.addEventListener('click', () => {
    el.menubar.classList.toggle('open')
    el.openMenubar.classList.toggle('display-none')
    el.closeMenubar.classList.toggle('display-none')
  })

  el.closeMenubar.addEventListener('click', () => {
    el.menubar.classList.toggle('open')
    el.menubar.classList.remove('extend')

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

  el.openKeySound.addEventListener('click', () => {
    swapButtons(el.allMenuButtons, el.openKeySound)
    swapAssets(el.allAssetButtons, el.keySoundsAssets)
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

module.exports = setup
