
// Define the AudioContext
var AudioContext = AudioContext || webkitAudioContext;
// Confirm Web Audio API is available
if (AudioContext) {
	// Create an the audio context
	// The audio context is for managing and playing all sounds
	var context = new AudioContext();
}
else {
	alert("Web Audio API is not available. Please use a supported browser.");
}

var oscillator;
var oscTypes = ['sine','square','sawtooth','triangle'];
var currentNum = 0;
var gainNode;
var theVolume = -0.5;

function createSound(curNum){
	//Check if oscillator exists
	if (oscillator){
		oscillator.stop();
		oscillator.disconnect();
	}

	var currentType = oscTypes[curNum];
	oscillator = context.createOscillator();
	oscillator.type = currentType;
	oscillator.frequency.value = 500;

	// Create a gain node.
	gainNode = context.createGain();
	// Connect the source to the gain node.
	oscillator.connect(gainNode);
	// Connect the gain node to the destination.
	gainNode.connect(context.destination);

	gainNode.gain.value = theVolume;

	oscillator.connect(context.destination);
	oscillator.start(0);
}

$(document).keydown(function(e) {
	console.log(e.keyCode);
	var curKey = e.keyCode;
	switch(curKey){
		//Enter - start sound
		case 13:
			//Create the sound
			createSound(currentNum);
			break;
		//Spacebar - stop sound
		case 32:
			oscillator.stop();
			break;
		//Left Arrow - lower frequency
		case 37:
			oscillator.frequency.value -= 5;
			break;
		//Right Arrow - raise frequency
		case 39: 
			oscillator.frequency.value += 5;
			break;
		//Up Arrow - raise volume
		case 38:
			if (gainNode.gain.value >= 1){
				gainNode.gain.value = 1
			}
			else{
				gainNode.gain.value += 0.05;
			}
			//update volume variable
			theVolume = gainNode.gain.value
			console.log(gainNode.gain.value);
			break
		//Down Arrow - lower volume
		case 40:
			if (gainNode.gain.value <= -1){
				gainNode.gain.value = -1;
			}
			else{
				gainNode.gain.value -= 0.05;
			}
			//update volume variable
			theVolume = gainNode.gain.value
			console.log(gainNode.gain.value);
			break;
		//0 - set oscillator type to 'sine' wave
		case 48:
			currentNum = 0;
			$('#wave').html(oscTypes[currentNum]);
			break;
		//1 - set oscillator type to 'square' wave
		case 49:
			currentNum = 1;
			$('#wave').html(oscTypes[currentNum]);
			break;
		//2 - set oscillator type to 'sawtooth' wave
		case 50:
			currentNum = 2;
			$('#wave').html(oscTypes[currentNum]);
			break;
		//3 - set oscillator type to 'triangle' wave
		case 51:
			currentNum = 3;
			$('#wave').html(oscTypes[currentNum]);
			break;
		default:
			break;
	}
});
