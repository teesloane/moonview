const fs = require('fs')

const helpers = {
  walk(dir, action, maxFiles, output) {

    if (typeof action !== 'function') {
      // if 2nd param is not a fn, make it so.
      action = function(error, file) { };
    }

    fs.readdir(dir, function (err, list) {
      if (err) throw err
      if (!maxFiles) maxFiles = list.length;

      // create a new array with file's formatted to proper paths.
      pathList = list.map((path) => { return dir + '/' + path })

      // run the callback (action) on each file.
      for (i = 0; i < maxFiles; i++) {
        action(pathList, i, output, maxFiles)
      }

    })

  },

  playAudio(file) {
    let audio = new Audio(file)
    audio.currentTime = 0;
    audio.play();
  }

}

module.exports = helpers
