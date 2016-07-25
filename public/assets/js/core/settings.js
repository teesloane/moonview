const el = require('../helpers/dom-elements')
const file = require('./file-io')
const defaultSettings = {
  fontSize: 12,
  editorWidth: 70,
  autoSave: false
}

let settings = {

  setDefault() {
    if (!localStorage.userSettings) {
      localStorage.setItem('userSettings', JSON.stringify(defaultSettings))
      updateDependencies()
      console.log('user defaults were set')
    }

    this.updateDependencies()
  },

  // helper to get the settings as an object from local storage
  getSettings() {
    return JSON.parse(localStorage.getItem('userSettings'))
  },

  updateSettings(attr, value) {
    console.log('update called on: attr:', attr, "and val: ", value)
      // convert ls to an obj
    let settings = this.getSettings()

    // update the settings with the new value
    settings[attr] = value

    // store to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings))

    // update dom stuff dependent on user Settings
    this.updateDependencies()
  },

  saveIt: undefined,

  // update dom settings based on changes to prefs window
  updateDependencies() {

    let userSettings = settings.getSettings()

    el.fontSize.value = userSettings.fontSize
    el.editor.style.fontSize = userSettings.fontSize + "px"

    el.editorWidth.value = userSettings.editorWidth
    el.editor.style.width = userSettings.editorWidth + "%"

  }
}

// Preference Window Event Listeners (Change the Settings)

// close the prefs modal
el.closePreferences.addEventListener('click', () => {
  el.preferences.classList.toggle('display-none')
})

// change font size
el.fontSize.addEventListener('change', () => {
  settings.updateSettings('fontSize', el.fontSize.value)
})

// change editor width

el.editorWidth.addEventListener('change', () => {
  settings.updateSettings('editorWidth', el.editorWidth.value)
})

module.exports = settings