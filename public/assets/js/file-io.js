  /**
  - purpose: provide functions for standard file operations:
    - open(), save(), new() etc.
*/

const fs = require('fs')
const {dialog} = require('electron').remote

const file = {

  open () {
    dialog.showOpenDialog({
      // dialog options
      title: 'Open a document',
      buttonLabel: 'Open',
      filters: [
        {name: 'Text', extensions: ['txt', 'md', 'rtf']} // restricted file extensions.
      ]

    }, function (filesIn) {
      if (filesIn === undefined) return
      let file = filesIn[0] // must be 1st element of array even though only one item is selected to be opened.
      fs.readFile(file, 'utf-8', function (err, data) {
        if (err) throw err
        document.getElementById('editor').value = data
        // TODO: alert that file was saved
      })
    })
  },

  save () {
    // open the dialog box
    dialog.showSaveDialog({
      title: 'Save your document',
      buttonLabel: 'Save',
      filters: [{name: 'text', extensions: ['txt']}]
    },
    // write the file, check for errors etc.
    function (fileOut) {
      if (fileOut === undefined) return
      fs.writeFile(fileOut, document.getElementById('editor').value, function (err) {
        if (err) throw err
      })
    })
  },

  new () {
    console.log('new file created')
  }
}

module.exports = file
