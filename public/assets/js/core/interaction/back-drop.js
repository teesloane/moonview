/* This file builds out invocable logic for all background related interaction.
Examples: Change Moonview's Background image.*/
const sizeOf = require('image-size') // used for easily calc. img width for bg display type.
const fileUrl = require('file-url')
const help = require('../../helpers/utilities')
const el = require('../../helpers/dom-elements')
const tree = require('../../helpers/tree')
const monoThief = require('../../helpers/monochrome-thief')

let backDrop = {
  toggleBackDrop (image) {
    let imageSize = sizeOf(image)

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
      document.body.style.backgroundImage = `url(${fileUrl(image)})`

      // Get avg brightness of image and change font color accordingly
      let brightness = monoThief(img)
      if (brightness < 80) {
        el.editor.style.color = '#fff'
      } else {
        el.editor.style.color = 'black'
      }
    }

    img.src = image
    if (img.complete) img.onload()
  },

  setDefaultBackDrop () {
    document.body.style.background = tree.defaultBackground

    el.backgroundButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  },

  createButtons () {
    // get image files and filter by .extension
    let imageFiles = help.getDirList(tree.bg)
    imageFiles = help.filterFileTypes(imageFiles, ['.png', '.jpg', '.jpeg'])

    // create buttons forEach file.
    for (let i = 0; i < imageFiles.length; i++) {
      help.createButtons(imageFiles, i, el.backgroundButtons, i + 1, 'bg', this.toggleBackDrop)
    }

    // create a cancel button to set default backDrop image.
    help.createCancelButton(el.backgroundCancel, 'background', this.setDefaultBackDrop)
  }

}

module.exports = backDrop
