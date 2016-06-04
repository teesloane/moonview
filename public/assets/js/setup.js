// TODO: abstract create audio buttons to separate function

/*
	- runs on first load
	- runs when default settings are set.
	- runs if settings.json doesn't exist.
	- programmatically creates buttons for each sound, background etc.
*/

const helpers = require('./helpers')
const tree = require('./tree')
let loopButtons = document.getElementById('loop-buttons')


const setup = function () {

	// create audio buttons.
	helpers.walk(tree.audio, (list, i, output, maxFiles) => {

		// callback block; runs for every file in `list`
		loopButtons.innerHTML +=
			`<button id="loop-${i}"> ${i} </button>`

		// once all buttons are made, create an array of them.
		if (i+1 === maxFiles) {
			let arr = Array.from(loopButtons.childNodes) // es6 nodelist -> arr.

		// add an event listener to each item in `list`
			for(i=0; i < arr.length; i++) {
				(function(index) { // closure for unique event listeners.
					arr[index].addEventListener('click', () => {
						helpers.playAudio(list[index-1])
					})
				})(i)
			}
		}
		
	})


}

module.exports = setup
