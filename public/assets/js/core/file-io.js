const fs = require('fs')
const { ipcRenderer } = require('electron')
const { dialog } = require('electron').remote

let file = {
  currentFile: undefined,

  open () {
    dialog.showOpenDialog({
      title: 'Open a document',
      buttonLabel: 'Open',
      filters: [{name: 'Text', extensions: ['txt', 'md']}]
    }, function (filesIn) {
      if (filesIn === undefined) return
      let fileIn = filesIn[0] // must be 1st element of array even though only one item is selected to be opened.
      fs.readFile(fileIn, 'utf-8', function (err, data) {
        if (err) throw err
        document.getElementById('editor').value = data
        file.currentFile = fileIn
      })
    })
  },

  saveAs (callback) {
    dialog.showSaveDialog({
      title: 'Save your document',
      buttonLabel: 'Save',
      filters: [{name: 'text', extensions: ['txt', 'md']}]
    }, function (fileOut) {
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

  newFile () {
    if (this.isUnsaved() || this.hasChanged()) {
      this.fileWarning('You have an unsaved file. Save it?', 'Cancel', 'New File', function () {
        // noop function - nothing happens on 'cancel'.
      }, function () {
        // reset the editor for a "new file"
        document.getElementById('editor').value = ''
        file.currentFile = undefined
      })
    } else {
      document.getElementById('editor').value = ''
      file.currentFile = undefined
    }
  },

  // ====================================================== //
  // HELPERS FOR CHECKING FOR UNSAVED FILES, warnings, etc. //
  fileWarning (Message, OptionA, OptionB, ActionA, ActionB) {
    dialog.showMessageBox({
      type: 'warning',
      buttons: [OptionA, OptionB], // string
      title: 'Unsaved Work',
      message: Message
    }, function (rdata) {
      if (rdata === 0) {
        ActionA()
      } else if (rdata === 1) { ActionB() }
    })
  },

  hasChanged () {
    let editor = document.getElementById('editor')

    if (file.currentFile !== undefined) {
      fs.readFile(file.currentFile, 'utf-8', function (err, data) {
        if (err) throw err
        if (editor.value !== data) return true
      })
    }
  },

  editorIsEmpty () {
    let editor = document.getElementById('editor')
    if (editor.value === '') return true
  },

  isUnsaved () {
    let editor = document.getElementById('editor')
    if (file.currentFile === undefined && editor.value !== '') {
      return true
    }
  },

  windowCloseCheck () {
    window.onbeforeunload = function (e) {
      e.returnValue = false
    // window.alert('try to close me');
      if (file.isUnsaved() || file.hasChanged()) {
      // prompt - save or just quit?
        file.fileWarning('You have unsaveeed work.', 'Save', 'Quit', function () {
        // OPTION A - save
          file.save()
        }, function () {
        // OPTION B: Quit.
          ipcRenderer.send('quitter')
        })
      } else {
        // file is saved and no new work has been done:
        ipcRenderer.send('quitter')
      }
    }
  }
}

module.exports = file
