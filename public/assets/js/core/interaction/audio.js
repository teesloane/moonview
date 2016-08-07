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

  /* Plz refactor me: sometimes not all audio files are queued up. Closure issues? */
  toggleSet (stemsFolder) {
    // if audio is playing already, stop it and start the new set.
    if (tree.selectedStems.constructor === Array) {
      console.log("it's an array")
      tree.selectedStems.forEach((stem) => {
        // TODO: check if of type Audio Object
        stem.pause()
      })
    }

    // get audio files, filter by .ext, shuffle the array, convert to audio obj's
    let audioFiles = help.getDirList(stemsFolder)
    audioFiles = help.filterFileTypes(audioFiles, ['.mp3', '.wav'])
    audioFiles = help.shuffle(audioFiles)
    audioFiles.forEach((file, idx, arr) => { arr[idx] = new Audio(file) })

    // assign to the tree so that the files can be stopped via stopAudio()
    tree.selectedStems = audioFiles
    console.log(tree.selectedStems)

    // randomly toggle the audio files when metadata loads
    tree.selectedStems[0].addEventListener('loadedmetadata', () => {
      for (let i = 0; i < tree.selectedStems.length; i++) {
        // on first loop iteration, just play the first audio file in the array.
        if (i === 0) {
          tree.selectedStems[0].loop = true
          tree.selectedStems[0].play()

        // on every suceeding loop, que up the next track somewhere within the
        // duration of the first track.
        } else {
          // make sure metadata (duration) is loaded before proceding.
          tree.selectedStems[i].addEventListener('loadedmetadata', () => {
            var queNext = Math.random() * (tree.selectedStems[i - 1].duration)

            // CLOSURE ALERT! Play the next file at the next unique queNext time.
            ~(function (idx, delay) {
              delay += queNext // sum equals delay so that it staircases new audio.
              console.log('track:', idx, 'will play in:', delay)

              setTimeout(function () {
                tree.selectedStems[idx].loop = true
                tree.selectedStems[idx].play()
              }, delay * 1000) // change 1000 to speed up / slow down when next track plays
            })(i, queNext)
          })
        }
      }
    })

    // connect to the slider
  },

  stopAudio () {
    if (tree.selectedStems !== '') {
      tree.selectedStems.forEach((stem) => {
        stem.pause()
      })
    }

    tree.selectedStems = ''

    el.loopButtons.childNodes.forEach(function (child) {
      child.classList.remove('on')
    })
  },

  createButtons () {
    // get the directory of "tracks"
    let stems = help.getDirList(tree.stems)

    // TODO: checking against non-dirs (EVIL DS STORES)

    // TODO: Cap max amount of audio files

    // create button for each folder full of stems.
    for (let i = 0; i < stems.length; i++) {
      help.createButtons(stems, i, el.loopButtons, i + 1, 'loop', this.toggleSet)
    }

    // create a cancel button to stop audio
    help.createCancelButton(el.loopCancel, 'loop', this.stopAudio)
  }
}

module.exports = audio
