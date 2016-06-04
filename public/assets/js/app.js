// file purpose: bind ui events to functionality imported from other folders.
const path = require('path')

const setup = require('./setup')
const file = require('./file-io')
const helpers = require('./helpers')
const tree = require('./tree')


var init = function () {
  setup()
}

init()
