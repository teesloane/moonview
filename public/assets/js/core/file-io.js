const fs = require('fs')
const {remote, ipcRenderer} = require('electron')
const {dialog} = require('electron').remote

let file = {
  currentFile: undefined,

  // todo: if file is unsaved when trying to open, prompt first.
  open () {
    dialog.showOpenDialog({
      // dialog options
      title: 'Open a document',
      buttonLabel: 'Open',
      filters: [{
        name: 'Text',
        extensions: ['txt', 'md']
      } // restricted file extensions.
    ]},

    function (filesIn) {
      if (filesIn === undefined) return
      let fileIn = filesIn[0] // must be 1st element of array even though only one item is selected to be opened.
      fs.readFile(fileIn, 'utf-8', function (err, data) {
        if (err) throw err
        document.getElementById('editor').value = data
        file.currentFile = fileIn
      })
    })
  },

  saveAs () {
    // open the dialog box
    dialog.showSaveDialog({
      title: 'Save your document',
      buttonLabel: 'Save',
      filters: [{
        name: 'text',
        extensions: ['txt', 'md']
      }]
    },
      // write the file, check for errors etc.
    function (fileOut) {
      if (fileOut === undefined) return
      fs.writeFile(fileOut, document.getElementById('editor').value, function (err) {
        file.currentFile = fileOut
        if (err) throw err
      })
    })
  },

  save () {
    // if file hasn't been saved, run saveAs()
    if (file.currentFile === undefined) {
      file.saveAs()
    } else {
      fs.writeFile(file.currentFile.toString(), document.getElementById('editor').value, function (err) {
        if (err) throw err
      })
    }
  },

  checkBeforeQuit() {
    if (file.currentFile === undefined && editor.value !== '') {
      dialog.showMessageBox({
        type: 'warning',
        buttons: ['Quit', 'Save'],
        title: 'Unsaved Work',
        message: 'You have unsaved work. Do something about it?'
      }, function (rdata) {
        if(rdata === 1) {
          file.save()
        } else {
            console.log('no save fucker');
           ipcRenderer.send('quitter');
        }
      })
    }

  },

  newFile () {
    let editor = document.getElementById('editor')

    // check for text in editor that is not from an opened file.
    if (file.currentFile === undefined && editor.value !== '') {
      dialog.showMessageBox({
        type: 'warning',
        buttons: ['Cancel', 'New File'],
        title: 'Unsaved Text',
        message: 'You have unsaved work.'
      }, function (rdata) {
        if (rdata === 1) {
          document.getElementById('editor').value = ''
          file.currentFile = undefined
        }
      })
    // check if the current file is defined and needs to be diffed from the HDD file.
    } else if (file.currentFile !== undefined) {
    // If there is a current file, compare it with what's in the editor
      fs.readFile(file.currentFile, 'utf-8', function (err, data) {
        // TODO: Account for a file possibly being deleted while it's open
        if (err) { throw err }
        if (editor.value !== data) {
          dialog.showMessageBox({
            type: 'warning',
            buttons: ['Cancel', 'New File'],
            title: 'Unsaved Text',
            message: 'You still have some unsaved work kickin\' around. You sure you want to make a new file?'
          }, function (rdata) {
            // if user selects "new file" as decided by returned array of choices.
            if (rdata === 1) {
              document.getElementById('editor').value = ''
              file.currentFile = undefined
            }
          })
        // if the diff between the editor / hdd instance are the same; create a new file with no prompt.
        } else {
          document.getElementById('editor').value = ''
          file.currentFile = undefined
        }
      })
    } else {
      document.getElementById('editor').value = ''
      file.currentFile = undefined
    }
  }

}

module.exports = file
