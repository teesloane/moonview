# moonview

## What is Moonview?

Moonview allows you to write text files inside an ambient bubble. Pick from a collection of medias and create your own writing environment: Moonview comes packaged with a handful of fonts, backdrops, field recordings, and audio stems.

## Can I customize Moonview Further?

If you are technically inclined you can customize Moonview however you like. First note that the App is entirely open source, so you can fork the repo and make changes as you like.

If you would like to replace the media assets that come with Moonview, you can do that with a bit of folder digging.

**How Audio Files work**

Moonview gets a bit creative with working with playing audio files. For some, you may be disappointed to find that you cannot simply drop an audio file into a folder and have it available to your in Moonview.

**A brief Preface to customizing ambient media assets**

Moonview works with _folders_ of audio files. Think of each folder as a "song", and the contents of that folder as the different sounds you hear in the song. For example, `Song 1` Might have a `Bass.mp3`, `Synth.mp3` and `Chamber choir.mp3` stem file inside it. Moonview uses folders in this way to randomly play back the audio stems in a way so that each time you listen to one of the "songs" it will never be the same as before.

Note: If you do want to use your own audio stems, seamless audio loops will make for a more pleasant audio experience (unless you don't mind obvious audio looping).

## Can I contribute?

Yes. Moonview uses Standard Js for linting standards.

Moonview is intentionally written with Just JavaScript; so any PR's to add Javascript front end frameworks will likely be turned down.

## Build Instructions

Install dependencies:

`npm install`

Start the electron application:

` npm start `

Run gulp to compile `.css` files:

`gulp`
