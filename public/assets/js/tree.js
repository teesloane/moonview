const path = require('path')
const _private = '../../../private'

const tree = {
  audio: path.join(__dirname, _private, '/ambiance/audio'),
  bg: path.join(__dirname, _private, '/ambiance/images'),
  fonts: ['arial', 'courier', 'cursive'],
  keySounds: path.join(__dirname, _private, '/ambiance/keySounds'),
  selectedAudio: '',
  selectedBackground: ''
}

module.exports = tree
