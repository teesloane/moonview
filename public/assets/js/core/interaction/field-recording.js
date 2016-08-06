/* This file builds out invocable logic for all field recording related interaction.
Examples: Start / Pause a field recording. */

const tree = require('../../helpers/tree')
const help = require('../../helpers/utilities')
const el = require('../../helpers/dom-elements')

let fieldRecording = {

  toggle (file) {
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
    let audioFiles = help.getDirList(tree.fieldRecordings)
    audioFiles = help.filterFileTypes(audioFiles, ['.mp3'])

    // TODO: Cap max amount of audio files

    // create buttons forEach file.
    for (let i = 0; i < audioFiles.length; i++) {
      help.createButtons(audioFiles, i, el.fieldRecordingButtons, i + 1, 'loop', this.toggle)
    }

    // create a cancel button to stop audio
    help.createCancelButton(el.fieldRecordingCancel, 'fieldRecording', this.stopAudio)
  }
}

module.exports = fieldRecording
