const tree = require('../../helpers/tree')
const el = require('../../helpers/dom-elements')
const help = require('../../helpers/utilities')

let font = {

  toggleFont (font) {
    // let editor = document.getElementById('editor')
    el.editor.style.fontFamily = font
  },

  // create buttons forEach font.
  createButtons () {
    for (let i = 0; i < tree.fonts.length; i++) {
      help.createButtons(tree.fonts, i, el.fontButtons, i + 1, 'font', this.toggleFont)
    }
  }

}

module.exports = font
