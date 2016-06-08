const path = require('path')
const _private = '../../../private'

const tree = {
  audio: path.join(__dirname, _private, '/ambiance/audio'),
  bg: path.join(__dirname, _private, '/ambiance/images'),
  fonts: ['arial', 'courier', 'cursive'],
  selectedAudio: '',
  selectedBackground: ''
}

module.exports = tree
