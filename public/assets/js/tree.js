const path = require('path')
const _private = '../../../private'

const tree = {
  audio: path.join(__dirname, _private, '/ambiance/audio'),
  bg: path.join(__dirname, _private, '/ambiance/images'),
  keySounds: path.join(__dirname, _private, '/ambiance/keySounds'),
  fonts: ['arial', 'courier', 'cursive'],
  selectedAudio: '',
  defaultBackground: '#f0f0f0',
  selectedBackground: ''
}

module.exports = tree
