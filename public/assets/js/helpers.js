const fs = require('fs')

const helpers = {
  // gets a flat array of a dir; calls an action on each file.
  walk(dir, action, maxFiles) {

    if (typeof action !== 'function') {
      // if 2nd param is not a fn, make it so.
      action = function(error, file) { };
    }

    fs.readdir(dir, function (err, list) {
      if (err) throw err
      if (!maxFiles) maxFiles = list.length;

      // create a new array with file's formatted to proper paths.
      assetList = list.map((path) => { return dir + '/' + path })

      // run the callback (action) on each file.
      for (i = 0; i < maxFiles; i++) {
        action(assetList, i)
      }
    })

  },

  playAudio(file) {
    let audio = new Audio(file)
    audio.currentTime = 0;
    audio.play();
  },

  createButtons(assetList, timesCalled, mount, text, action) {
    // callback block; runs for every file in `assetList`
    mount.innerHTML += `<button id="loop-${text}"> ${text} </button>`

    // once all buttons are made, create an array of them.
    if (timesCalled+1 === assetList.length) {
      let arr = Array.from(mount.childNodes) // es6 nodelist -> arr.
      let assetArray = [];

      // strip non-essential childNodes (ie. non button elements).
      arr.forEach((el) => {
        if (el.nodeName === "BUTTON") {
          assetArray.push(el)
        }
      })

      // add an event listener to each item in `list`
      for(i=0; i < arr.length; i++) {
          (function(index) { // closure for unique event listeners.
            arr[index].addEventListener('click', () => {
              action(assetList[index-1])
            })
          })(i)
      }

    }
  }
}

module.exports = helpers
