// Web Audio API

//for legacy browsers
var AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

//get the audio element
const audioElement = document.querySelector('audio');

//pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

//select our play button
const playButton = document.querySelector('button');

playButton.addEventListener('click', function() {

  //check if the context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  //play or pause track depending on state
  if (this.dataset.playing === 'false') {
    audioElement.play();
    this.dataset.playing = 'true';
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }
}, false);

audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);

const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);

const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
  gainNode.gain.value = this.value;
}, false);

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
  panner.pan.value = this.value;
}, false);

track.connect(gainNode).connect(panner).connect(audioContext.destination);

console.log(audioElement);
