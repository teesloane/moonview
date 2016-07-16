const help = require('./helpers')
const tree = require('./tree')
const createMenu = require('./menu')

// mounting points for buttons for audio, sounds, bgs etc.
let loopButtons = document.getElementById('loop-buttons')
let backgroundButtons = document.getElementById('background-buttons')
let fontButtons = document.getElementById('font-buttons')
let keySoundButtons = document.getElementById('keySound-buttons')

let loopCancel = document.getElementById('loop-cancel')
let backgroundCancel = document.getElementById('background-cancel')
let keySoundCancel = document.getElementById('keySound-cancel')

// sidebar controls / toggles etc
let sidebar = document.getElementById('button-drawer')
let openSidebar = document.getElementById('sidebar-open')
let closeSidebar = document.getElementById('sidebar-close')

// Drawer toggles
let openMuzak = document.getElementById('open-muzak')
let muzakAssets = document.getElementById('muzak-assets')

let openWallpaper = document.getElementById('open-wallpaper')
let wallpaperAssets = document.getElementById('wallpaper-assets')

let openTypeface = document.getElementById('open-typeface')
let typefaceAssets = document.getElementById('typeface-assets')

let openKeySound = document.getElementById('open-keysounds')
let keySoundsAssets = document.getElementById('keysounds-assets')

let assetDrawer = document.getElementById('asset-drawer')
let allAssetButtons = [muzakAssets, wallpaperAssets, typefaceAssets, keySoundsAssets]

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
    help.createButtons(assetList, count, loopButtons, count + 1, 'loop', help.toggleAudio)
  })

  help.createCancelButton(loopCancel, 'loop', function () {
    if (tree.selectedAudio !== '') {
      tree.selectedAudio.pause()
    }
    tree.selectedAudio = ''

    loopButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })

  // create background buttons
  help.walk(tree.bg, ['.jpeg', '.jpg', '.png'], (assetList, count) => {
    help.createButtons(assetList, count, backgroundButtons, count + 1, 'bg', help.toggleBackground)
  })

  help.createCancelButton(backgroundCancel, 'background', function () {
    document.body.style.background = tree.defaultBackground

    backgroundButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })

  // create font buttons
  help.walk(tree.fonts, null, (assetList, count) => {
    help.createButtons(assetList, count, fontButtons, count + 1, 'font', help.toggleFonts)
  })

  // Create typing sound buttons:
  help.walk(tree.keySounds, ['.wav', '.mp3'], (assetList, count) => {
    help.createButtons(assetList, count, keySoundButtons, count + 1, 'keySound', help.fireKeySound)
  })

  help.createCancelButton(keySoundCancel, 'keySound', function () {
    document.onkeydown = '' // turn off key sounds.
      // var buttonRow = keySoundCancel.parentNode;
      // console.log(buttonRow.childNodes);
    keySoundButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  })
}

function drawerListeners () {
  openSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('invisible')
    openSidebar.classList.toggle('display-none')
    closeSidebar.classList.toggle('display-none')
  })

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('invisible')

    // hide the asset drawer if it's open
    allAssetButtons.forEach((row) => {
      row.classList.add('display-none')
    })

    // swap open/close for sidebar buttons
    openSidebar.classList.toggle('display-none')
    closeSidebar.classList.toggle('display-none')
  })

  openMuzak.addEventListener('click', () => {
    swapButtons(allAssetButtons, muzakAssets)
  })

  openWallpaper.addEventListener('click', () => {
    swapButtons(allAssetButtons, wallpaperAssets)
  })

  openTypeface.addEventListener('click', () => {
    swapButtons(allAssetButtons, typefaceAssets)
  })

  openKeySound.addEventListener('click', () => {
    swapButtons(allAssetButtons, keySoundsAssets)
  })
}

// TODO: find a better name plz
function swapButtons (buttonRow, exception) {
  console.log(buttonRow, exception);
  buttonRow.forEach((row) => {
    // if (!row.classList.contains('display-none') && !exception) {
    if (row === exception) {
      row.classList.toggle('display-none')
    } else {
      row.classList.add('display-none')
    }
  })
}

module.exports = setup
