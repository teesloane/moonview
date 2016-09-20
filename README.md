# moonview

## What is moonview?

moonview allows you to write text files inside an ambient bubble. Pick from a collection of medias and create your own writing environment: moonview comes packaged with a handful of fonts, backdrops, field recordings, and audio stems.

![](https://cloud.githubusercontent.com/assets/12987958/18655246/2dfe1214-7eb5-11e6-8e08-9897fdfb1207.gif)

## Download / Install

You can head over to the `releases` tab to get the latest version of moonview.
Currently Mac builds are being supported, and soon Linux and Windows will follow. If you just can't wait, check out the build instructions below. Currently, `electron-packager` is used for bundling the app, and a linux / windows build script has not been written (hint pull requests hint).

## Can I customize moonview Further?

If you are technically inclined you can customize moonview however you like. First note that the App is entirely open source, so you can fork the repo and make changes as you like.

If you would like to replace the media assets that come with moonview, you can do that with a bit of folder digging.

**How Audio Files work**
moonview gets a bit creative with working with playing audio files. For some, you may be disappointed to find that you cannot simply drop an audio file into a folder and have it available to your in moonview.

**A brief Preface to customizing ambient media assets**

moonview works with _folders_ of audio files. Think of each folder as a "song", and the contents of that folder as the different sounds you hear in the song. For example, `Song 1` Might have a `Bass.mp3`, `Synth.mp3` and `Chamber choir.mp3` stem file inside it. moonview uses folders in this way to randomly play back the audio stems in a way so that each time you listen to one of the "songs" it will never be the same as before.

Note: If you do want to use your own audio stems, seamless audio loops will make for a more pleasant audio experience (unless you don't mind obvious audio looping).

## Can I contribute?

Yes. moonview uses Standard Js for linting standards.

moonview is intentionally written with Just JavaScript (and Electron); so any PR's to add Javascript front end frameworks will likely be turned down.

## Build Instructions

Install dependencies:

`npm install`

Start the electron application:

` npm start `

Run gulp to compile `.css` files:

`gulp`
