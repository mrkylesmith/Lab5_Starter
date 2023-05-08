// expose.js
window.addEventListener('DOMContentLoaded', init);

function displayHornImageAndAudio(event, hornImage, hornAudio) {
  // Set correct horn image based on selection
  hornImage.src = `assets/images/${event.target.value}.svg`;
  // Set correct horn audio based on selection
  hornAudio.src = `assets/audio/${event.target.value}.mp3`;
}

function controlVolume(event, audioImage, hornAudio) {
  // Volume selected
  const volume = event.target.value;

  // At zero volume, the mute icon (level 0) should be displayed
  if (volume == 0){
    audioImage.src = "assets/icons/volume-level-0.svg";
  } else if (volume < 33) {
    audioImage.src = "assets/icons/volume-level-1.svg";
  } else if (volume < 67) {
    audioImage.src = "assets/icons/volume-level-2.svg";
  } 
  else {
    audioImage.src = "assets/icons/volume-level-3.svg";
  }
  // Set horn audio volume based on volume input, scale between 0-1
  hornAudio.volume = volume / 100; 
}

function init() {
  // Selection for 'Select Horn' dropdown
  const hornSelect = document.getElementById("horn-select");
  // Selection for volume control slider 
  const volumeElement = document.getElementById("volume");
  // Selection for the "Play Sound" button
  const playSoundButton = document.querySelector("button");
  // Selection for main image displaying horn
  const hornImage = document.querySelectorAll("img")[0];

  // Selectors for horn audio and audio image
  const hornAudio = document.querySelector("audio");
  const audioImage = document.querySelectorAll("img")[1];
  
  // Declare confetti for when 'Party horn' is selected
  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', (event) => {
    // Display the correct image for horn selected
    displayHornImageAndAudio(event, hornImage, hornAudio); 
  });

  volumeElement.addEventListener('input', (event) => {
    controlVolume(event, audioImage, hornAudio);
  });

  // Play selected sound when 'Play Sound' button is clicked
  playSoundButton.addEventListener('click', (event) => {
    // If horn is selected from dropdown menu
    if(hornSelect.value != 'select') {
        // If the Party Horn is selected, shoot out confetti
        if (hornSelect.value === 'party-horn') {
            jsConfetti.addConfetti();
        }
        hornAudio.play();
    }
  });
}