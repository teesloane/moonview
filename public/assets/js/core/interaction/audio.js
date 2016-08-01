/* This file builds out invocable logic for all audio related interaction.
Examples: Start / Pause an audio file. Change volume of an audio file. etc. */
const tree = require('../../helpers/tree')

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
  }
}

module.exports = audio
