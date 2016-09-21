const el = require('../helpers/dom-elements')
const defaultSettings = {
  fontSize: 13,
  editorWidth: 540
}

let settings = {

  setDefault () {
    if (!localStorage.userSettings) {
      localStorage.setItem('userSettings', JSON.stringify(defaultSettings))
      this.updateDependencies()
    }

    this.updateDependencies()
  },

  // helper to get the settings as an object from local storage
  getSettings () {
    return JSON.parse(localStorage.getItem('userSettings'))
  },

  updateSettings (attr, value) {
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
  updateDependencies () {
    let userSettings = settings.getSettings()
    console.log(userSettings)

    el.fontSize.value = userSettings.fontSize
    el.editor.style.fontSize = userSettings.fontSize + 'px'

    el.editorWidth.value = userSettings.editorWidth
    el.editor.style.width = userSettings.editorWidth + 'px'

    // show the editor width value next to the text
    el.editorWidthVal.textContent = userSettings.editorWidth + 'px';
  }
}

/** ### Preference Window Event Listeners (Change the Settings) ### **/

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
