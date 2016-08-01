/* This file works closely with menu-ambient: it provides the logic necessary to
walk directories, create buttons based on lists (from a dir), and add event listeners
(with their own respective action) as callbacks */

const fs = require('fs')
const path = require('path')

const helpers = {

  /* Walk is used for interacting with a directory.
    Parameters:
      Dir: The directory to walk. Usu. a string of the path, edge case: array (assembling Fonts.)
      fileTypes: the files that will be accepted, and the paths of which will be put into an array
      Action: Function to invoke on each file in the directory.
  */
  walk (dir, fileTypes, action) {
    // check to see if action if not a function; if so, make it one (that throws an error)
    if (typeof action !== 'function') {
      action = function (error, file) {
        if (error) throw error
      }
    }

    // create a list of the assets in the directory
    let assetList = []

    /* Sometimes this fn will be used on an an array instead of a directory
    just to follow the same patterns as how it's used elsewhere.
    ex: this is run on tree.fonts to create the font buttons; the fonts aren't files. */
    if (dir.constructor === Array) {
      assetList = dir
        // run the callback (action) on each file.
      for (let i = 0; i < assetList.length; i++) {
        action(assetList, i)
      }
    } else {
      fs.readdir(dir, function (err, list) {
        if (err) throw err

        // loop through files; if .ext name is is correct "type" -> push to array.
        list.forEach((file) => {
          fileTypes.forEach((type) => {
            if (path.extname(file) === type) assetList.push(file)
          })
        })

        // set max on assetList to stop from borking ui
        // (if people drop files into the folders.)
        if (assetList.length > 7) {
          console.log('There are too many files in the ambiance folder! Just showing the first 7.')
          assetList = assetList.slice(0, 7)
        }

        // loop over the assetList and turn the files into string'd paths.
        assetList = assetList.map((file) => {
          return path.resolve(dir, file)
        })

        // run the callback (action) on each file.
        for (let i = 0; i < assetList.length; i++) {
          action(assetList, i)
        }
      })
    }
  },

  toggleFonts (font) {
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
  createButtons (assetList, timesCalled, mount, text, type, action) {
    // create the button.
    mount.innerHTML += `<button id="${type}-${text}" class="btn gourd"> ${text} </button>`

    // once all buttons are made, create an array of them.
    if (timesCalled + 1 === assetList.length) {
      let arr = Array.from(mount.childNodes) // es6 nodelist -> arr.
      let assetArray = []

      // strip non-essential childNodes (ie. non button elements).
      arr.forEach((el) => { if (el.nodeName === 'BUTTON') assetArray.push(el) })

      // add an event listener to each item in `list`
      for (let i = 0; i < arr.length; i++) {
        (function (index) { // closure for unique event listeners.
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

  createCancelButton (mount, type, action) {
    mount.innerHTML += `<button id="cancel-${type}" class="btn gourd cancel"><i class="ion-android-close _icon x-small"></button>`
    mount.addEventListener('click', action)
  }
}

module.exports = helpers
