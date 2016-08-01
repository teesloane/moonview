/* This file builds out invocable logic for all background related interaction.
Examples: Change Moonview's Background image.*/
const sizeOf = require('image-size') // used for easily calc. img width for bg display type.
const fileUrl = require('file-url')
const el = require('../../helpers/dom-elements')
const monoThief = require('../../helpers/monochrome-thief')

let background = {
  toggle (backgroundImage) {
    let imageSize = sizeOf(backgroundImage)

    // Change the image only when loaded.
    let img = new Image()

    img.onload = function () {
      if (imageSize.width < 1000) {
        document.body.style.backgroundSize = 'auto'
        document.body.style.backgroundRepeat = 'repeat'
      } else {
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
      }
      document.body.style.backgroundImage = `url(${fileUrl(backgroundImage)})`

      // Get avg brightness of image and change font color accordingly
      let brightness = monoThief(img)
      if (brightness < 80) {
        el.editor.style.color = '#fff'
      } else {
        el.editor.style.color = 'black'
      }
    }

    img.src = backgroundImage
    if (img.complete) img.onload()
  }

}

module.exports = background
