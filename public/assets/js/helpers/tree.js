const path = require('path')
// todo: get out of this ../../ bs
const _private = '../../../../private'

const tree = {
  audio: path.join(__dirname, _private, '/ambiance/audio'),
  bg: path.join(__dirname, _private, '/ambiance/images'),
  fieldRecordings: path.join(__dirname, _private, '/ambiance/fieldrecordings'),
  fonts: ['arial', 'courier', 'cursive'],
  stems: path.join(__dirname, _private, 'ambiance/stems'),
  selectedAudio: '',
  selectedFieldRecording: '',
  defaultBackground: '#f0f0f0',
  selectedBackground: ''
}

module.exports = tree
