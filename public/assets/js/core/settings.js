const el = require('../helpers/dom-elements')
console.log(el)
const defaultSettings = {
  fontSize: 12
}

let settings = {

  setDefault() {
    if (!localStorage.userSettings) {
      localStorage.setItem('userSettings', JSON.stringify(defaultSettings))
      updateDependencies()
      console.log('user defaults were set')
    } 

    updateDependencies()
  },

  // helper to get the settings as an object from local storage
  getSettings() {
    return JSON.parse(localStorage.getItem('userSettings'))
  },

  updateSettings (attr, value) {
    console.log('updated settings called')
    // convert ls to an obj
    let settings = this.getSettings()

    // update the settings with the new value
    settings[attr] = value

    // store to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings) )
    
    // update dom stuff dependent on user Settings
    updateDependencies()
  }
}

// All DOM related changes happen here. 
function updateDependencies() {
  let userSettings = settings.getSettings()
  el.fontSize.value = userSettings.fontSize
  el.editor.style.fontSize = userSettings.fontSize + "px"
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



module.exports = settings