/*
	- runs on first load
	- runs when default settings are set.
	- runs if settings.json doesn't exist.
	- programmatically creates buttons for each sound, background etc.
*/

const helpers = require('./helpers')
const tree = require('./tree')
const createMenu = require('./menu')

// mounting points for buttons for audio, sounds, bgs etc.
let loopButtons = document.getElementById('loop-buttons')

const setup = function () {
	// create menu:
	createMenu();

	// create audio buttons
	helpers.walk(tree.audio, (assetList, count) => {
		helpers.createButtons(assetList, count, loopButtons, i+1, helpers.playAudio)
	})

}

module.exports = setup
