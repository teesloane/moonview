/* This file works closely with menu-ambient: it provides the logic necessary to
walk directories, create buttons based on lists (from a dir), and add event listeners
(with their own respective action) as callbacks */

const fs = require('fs')
const path = require('path')

const utilities = {

  // get a directory of files and format the paths to the files.
  getDirList (dir) {
    let dirList = fs.readdirSync(dir)
      .map((file) => {
        return path.resolve(dir, file)
      })

    return dirList
  },

  // oh to use arr.filter() ...
  filterFileTypes (files, fileTypes) {
    let filteredTypes = []

    files.forEach((file) => {
      fileTypes.forEach((type) => {
        if (path.extname(file) === type) filteredTypes.push(file)
      })
    })

    return filteredTypes
  },

  toggleFonts(font) {
    let editor = document.getElementById('editor')
    editor.style.fontFamily = font
  },

  /* createButtons is the CB ("action") used on walk()/
    Purpose:      Creates buttons users can interact with (playing an audio file, changing a background)
    Logic:        Uses a closure to apply unique eventListeners to respective buttons.

    Parameters:
      assetList:    Array     Paths to files that will be acted on. (ex: Trigger an audio file)
      timesCalled:  Int:      Prevents fn from proceeding until all the buttons have been created.
      mount:        String:   Where to mount the buttin in the DOM.
      text:         String:   What text to put in the button.
      type:         String:   Provides a unique id to each button.
      action:       Function: What to do when the button is pressed.
  */
  createButtons(assetList, timesCalled, mount, text, type, action) {
    // create the button.
    mount.innerHTML += `<button id="${type}-${text}" class="btn gourd"> ${text} </button>`

    // once all buttons are made, create an array of them.
    if (timesCalled + 1 === assetList.length) {
      let arr = Array.from(mount.childNodes) // es6 nodelist -> arr.
      let assetArray = []

      // strip non-essential childNodes (ie. non button elements).
      arr.forEach((el) => {
        if (el.nodeName === 'BUTTON') assetArray.push(el)
      })

      // add an event listener to each item in `list`
      for (let i = 0; i < arr.length; i++) {
        (function(index) { // closure for unique event listeners.
          arr[index].addEventListener('click', () => {
            action(assetList[index])

            // Turn off any button that is 'on', turn 'on' the btn clicked.
            arr.forEach((button) => {
              if (button.classList.contains('on')) button.classList.remove('on')
              arr[index].classList.add('on')
            })
          })
        })(i)
      }
    }
  },

  createCancelButton(mount, type, action) {
    mount.innerHTML += `<button id="cancel-${type}" class="btn gourd cancel"><i class="ion-android-close _icon x-small"></button>`
    mount.addEventListener('click', action)
  }
}

module.exports = utilities