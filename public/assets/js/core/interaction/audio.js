/* This file builds out invocable logic for all audio related interaction.
Examples: Start / Pause an audio file. Change volume of an audio file. etc. */
const tree = require('../../helpers/tree')
const help = require('../../helpers/utilities')
const el = require('../../helpers/dom-elements')

let audio = {

  // toggle an audio file
  toggleAudio (file) {
    let audio = new Audio(file)

    if (tree.selectedAudio.currentTime > 0) { // if file is playing
      tree.selectedAudio.pause() // pause the file.
    }

    tree.selectedAudio = audio // asign new file
    tree.selectedAudio.volume = 0.7
    tree.selectedAudio.play() // play new file.

    let audioVolume = document.getElementById('muzak-slider')
    audioVolume.addEventListener('change', () => {
      tree.selectedAudio.volume = audioVolume.value / 100
    })
  },

  toggleFieldRecording (file) {
    let audio = new Audio(file)

    if (tree.selectedFieldRecording.currentTime > 0) {
      tree.selectedFieldRecording.pause()
    }

    tree.selectedFieldRecording = audio
    tree.selectedFieldRecording.loop = true
    tree.selectedFieldRecording.play()

    let fieldVolume = document.getElementById('fieldrecording-slider')
    fieldVolume.addEventListener('change', () => {
      tree.selectedFieldRecording.volume = fieldVolume.value / 100
    })
  },

  stopAudio () {
    if (tree.selectedAudio !== '') {
      tree.selectedAudio.pause()
    }
    tree.selectedAudio = ''

    el.loopButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  },

  createButtons () {
    // get audio files and filter by .extension
    let audioFiles = help.getDirList(tree.audio)
    audioFiles = help.filterFileTypes(audioFiles, ['.mp3'])

    // create buttons forEach file.
    for (let i = 0; i < audioFiles.length; i++) {
      help.createButtons(audioFiles, i, el.loopButtons, i + 1, 'loop', this.toggleAudio)
    }

    // create a cancel button to stop audio
    help.createCancelButton(el.loopCancel, 'loop', this.stopAudio)
  }
}

module.exports = audio
