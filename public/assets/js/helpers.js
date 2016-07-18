const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
let tree = require('./tree')

const helpers = {
  // gets a flat array of a dir; calls an action on each file.
  walk (dir, fileTypes, action) {
    // if `action` a fn, make it so.
    if (typeof action !== 'function') {
      action = function (error, file) {
        if (error) throw error
      }
    }

    // create a list of the assets in the directory
    let assetList = []

    /* Sometimes this helper fn will be used on an an array instead of a directory - just to follow the same patterns as how it's used elsewhere.
    See tree.fonts */
    if (dir.constructor === Array) {
      assetList = dir
      // run the callback (action) on each file.
      for (let i = 0; i < assetList.length; i++) {
        action(assetList, i)
      }
    } else {
      fs.readdir(dir, function (err, list) {
        if (err) throw err

        // loop through each file, and check if extension name is of the right type.
        // push these to a new array.
        list.forEach((file) => {
          fileTypes.forEach((type) => {
            if (path.extname(file) === type) assetList.push(file)
          })
        })

        // loop over the assetList and turn the files into string'd paths.
        assetList = assetList.map((file) => {
          return dir + '/' + file
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
    console.log(font)
  },

  toggleBackground (backgroundImage) {
    // default background properties/
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundRepeat = 'no-repeat'

    let tiled = sizeOf(backgroundImage)

    if (tiled.width < 1000) {
      document.body.style.backgroundSize = 'auto'
      document.body.style.backgroundRepeat = 'repeat'
    }

    // Change the image only when loaded.
    let img = new Image()

    img.onload = function () {
      document.body.style.backgroundImage = `url(${backgroundImage})`
    }

    img.src = backgroundImage
  },

  toggleAudio (file) {
    let audio = new Audio(file)

    if (tree.selectedAudio.currentTime > 0) { // if file is playing
      tree.selectedAudio.pause() // pause the file.
    }

    tree.selectedAudio = audio // asign new file
    tree.selectedAudio.play() // play new file.
  },

  toggleFieldRecording (file) {
    let audio = new Audio(file)

    if (tree.selectedFieldRecording.currentTime > 0) {
      tree.selectedFieldRecording.pause()
    }

    tree.selectedFieldRecording = audio
    tree.selectedFieldRecording.loop = true
    tree.selectedFieldRecording.play()
  },

  createButtons (assetList, timesCalled, mount, text, type, action) {
    // callback block; runs for every file in `assetList`
    mount.innerHTML += `<button id="${type}-${text}" class="btn gourd"> ${text} </button>`

    // once all buttons are made, create an array of them.
    if (timesCalled + 1 === assetList.length) {
      let arr = Array.from(mount.childNodes) // es6 nodelist -> arr.
      let assetArray = []

      // strip non-essential childNodes (ie. non button elements).
      arr.forEach((el) => {
        if (el.nodeName === 'BUTTON') {
          assetArray.push(el)
        }
      })

      // add an event listener to each item in `list`
      for (let i = 0; i < arr.length; i++) {
        (function (index) { // closure for unique event listeners.
          arr[index].addEventListener('click', () => {
            action(assetList[index])

            // add an indicator to show which button is selected
            arr.forEach(function (button) {
              if (button.classList.contains('on')) {
                button.classList.remove('on')
              }

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
