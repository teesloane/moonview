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

  toggleSet (stemsFolder) {
    // get audio files and filter by .extension
    let audioFiles = help.getDirList(stemsFolder)
    audioFiles = help.filterFileTypes(audioFiles, ['.mp3', '.wav'])
    // randomly toggle the audio files.

    // randomly select the first stem to play and remove from the array so not chosen again
    let firstTrack = audioFiles[Math.floor(Math.random() * audioFiles.length)]
    audioFiles.splice(audioFiles.indexOf(firstTrack), 1)

    let firstTrackAudio = new Audio(firstTrack)

    //  Once audio file metadata is loaded, then execute media ops.
    firstTrackAudio.addEventListener('loadedmetadata', function () {
      // get duration
      let dur = firstTrackAudio.duration
      let queSecond = Math.random() * (dur - 0)

      firstTrackAudio.play()

      // when the base audio passes the rnd Quesecond..que up the next track
      if (firstTrackAudio.currentTime > queSecond) {
        let secondTrack = audioFiles[]

      }
    })

    // play the base layer.
    // rndBaseStemAudio.play()
    // console.log(rndBaseStemAudio.currentTime)

    // generate a number between firstStem.currentTime and the end of the file
      // when firstStem.currentTime reaches rndInt - play the next stem
      // repeat for all other stems.
    // connect to the slider

    // connect the cancel button to these audio files.
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
    // get the directory of "tracks"
    let stems = help.getDirList(tree.stems)

    // assemble buttons for each folder full of stems.
    for (let i = 0; i < stems.length; i++) {
      help.createButtons(stems, i, el.loopButtons, i + 1, 'loop', this.toggleSet)
    }

    // get audio files and filter by .extension
    // let audioFiles = help.getDirList(tree.audio)
    // audioFiles = help.filterFileTypes(audioFiles, ['.mp3'])

    // TODO: Cap max amount of audio files

    // // create buttons forEach file.
    // for (let i = 0; i < audioFiles.length; i++) {
    //   help.createButtons(audioFiles, i, el.loopButtons, i + 1, 'loop', this.toggleAudio)
    // }
    //
    // // create a cancel button to stop audio
    // help.createCancelButton(el.loopCancel, 'loop', this.stopAudio)
  }
}

module.exports = audio
