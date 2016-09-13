const el = {

  editor: document.getElementById('editor'),

  // mounting points for buttons for audio, sounds, bgs etc.
  loopButtons: document.getElementById('loop-buttons'),
  backgroundButtons: document.getElementById('background-buttons'),
  fontButtons: document.getElementById('font-buttons'),
  fieldRecordingButtons: document.getElementById('fieldrecording-buttons'),

  loopCancel: document.getElementById('loop-cancel'),
  backgroundCancel: document.getElementById('background-cancel'),
  fieldRecordingCancel: document.getElementById('fieldrecording-cancel'),

  // sidebar controls / toggles etc
  menubar: document.getElementById('button-drawer'),
  openMenubar: document.getElementById('menu-open'),
  closeMenubar: document.getElementById('menu-close'),
  assetDrawer: document.getElementById('asset-drawer'),

  // Drawer toggles
  openMuzak: document.getElementById('open-muzak'),
  muzakAssets: document.getElementById('muzak-assets'),

  openBackdrop: document.getElementById('open-backdrop'),
  backdropAssets: document.getElementById('backdrop-assets'),

  openTypeface: document.getElementById('open-typeface'),
  typefaceAssets: document.getElementById('typeface-assets'),

  openFieldRecording: document.getElementById('open-fieldrecording'),
  fieldRecordingAssets: document.getElementById('fieldrecording-assets'),

  get allAssetButtons () {
    return [this.muzakAssets, this.backdropAssets, this.typefaceAssets, this.fieldRecordingAssets]
  },

  get allMenuButtons () {
    return [this.openMuzak, this.openBackdrop, this.openTypeface, this.openFieldRecording]
  },

  // mixer Menu //
  openMixer: document.getElementById('mixer-open'),
  closeMixer: document.getElementById('mixer-close'),
  mixer: document.getElementById('mixer'),

  // Preferences Window //
  preferences: document.getElementById('preferences'),
  closePreferences: document.getElementById('close-preferences'),

  fontSize: document.getElementById('pref-font-size'),
  editorWidth: document.getElementById('pref-editor-width'),
  autoSave: document.getElementById('pref-autosave')
}

module.exports = el
