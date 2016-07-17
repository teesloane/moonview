const el = {

  editor: document.getElementById('editor'),

  // mounting points for buttons for audio, sounds, bgs etc.
  loopButtons: document.getElementById('loop-buttons'),
  backgroundButtons: document.getElementById('background-buttons'),
  fontButtons: document.getElementById('font-buttons'),
  keySoundButtons: document.getElementById('keySound-buttons'),

  loopCancel: document.getElementById('loop-cancel'),
  backgroundCancel: document.getElementById('background-cancel'),
  keySoundCancel: document.getElementById('keySound-cancel'),

  // sidebar controls / toggles etc
  menubar: document.getElementById('button-drawer'),
  openMenubar: document.getElementById('sidebar-open'),
  closeMenubar: document.getElementById('sidebar-close'),
  assetDrawer: document.getElementById('asset-drawer'),

  // Drawer toggles
  openMuzak: document.getElementById('open-muzak'),
  muzakAssets: document.getElementById('muzak-assets'),

  openWallpaper: document.getElementById('open-wallpaper'),
  wallpaperAssets: document.getElementById('wallpaper-assets'),

  openTypeface: document.getElementById('open-typeface'),
  typefaceAssets: document.getElementById('typeface-assets'),

  openKeySound: document.getElementById('open-keysounds'),
  keySoundsAssets: document.getElementById('keysounds-assets'),

  get allAssetButtons () {
    return [this.muzakAssets, this.wallpaperAssets, this.typefaceAssets, this.keySoundsAssets]
  },

  get allMenuButtons () {
    return [this.openMuzak, this.openWallpaper, this.openTypeface, this.openKeySound]
  }

}

module.exports = el
