  /**
  - purpose: provide functions for standard file operations:
    - open(), save(), new() etc.
*/

const fs = require('fs')
const {dialog} = require('electron').remote

let currentFile;

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
        // TODO: store the file path in a variable.
        currentFile = file;

        // TODO: alert that file was saved
      })
    })
  },

  saveAs () {
    console.log('save as');
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
        currentFile = fileOut
        if (err) throw err

      })
    })
  },

  save () {
    // if file hasn't been saved, run saveAs()
    if (!currentFile) {
      this.saveAs();
    } else {
      fs.writeFile(currentFile.toString(), document.getElementById('editor').value, function (err) {
        if (err) throw err
      })
    }
  },

  newFile () {
    let editor = document.getElementById('editor')

    // if there is text in the editor
    if (editor.value !== '') {

      // TODO: if check on editor.value against actual file to see if things have changed / the file should be saved first.
      // I wonder if a diff on a large file would be costly...

      dialog.showMessageBox({
        type: 'warning',
        buttons: ['Cancel', 'New File'],
        title: 'Unsaved Text',
        message: 'You still have some unsaved work kickin\' around. You sure you want to make a new file?'
      }, function(rdata) {
          if (rdata === 1) {
            document.getElementById('editor').value = '';
            currentFile = null;
          }
      })
    } else {
      return
    }
  }

}

module.exports = file
