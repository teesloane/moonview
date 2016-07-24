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
    } else {
      console.log('user settings already exist they are: ', JSON.parse(localStorage.getItem('userSettings')))
    }
  },

  // helper to get the settings as an object from local storage
  getSettings() {
    return JSON.parse(localStorage.getItem('userSettings'))
  },

  updateSettings (attr, value) {
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
  console.log('update dependencies called, settings is: ', userSettings )
  el.editor.style.fontSize = parseInt(userSettings.fontSize)
  console.log(el.editor)
}


// Preference Window Event Listeners (Change the Settings)
el.closePreferences.addEventListener('click', () => {
  el.preferences.classList.toggle('display-none')
})

el.fontSize.addEventListener('change', () => {
  settings.updateSettings('fontSize', el.fontSize.value)
})



module.exports = settings