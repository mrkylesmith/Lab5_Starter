// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Use SpeechSynthesis interface of Web Speech API 
  const speechSynthesis = window.speechSynthesis;

  // Declare selectors 
  const selectVoice = document.getElementById("voice-select");
  const selectTalk = document.querySelector("button");
  const selectTextArea = document.getElementById("text-to-speak");
  const simleImage = document.querySelector("img");

  // Once page has loaded, load all available voices
  speechSynthesis.addEventListener("voiceschanged", (event) => {
  const voices = speechSynthesis.getVoices();
 
  // Populate the “Select Voice” dropdown with all available voices for given browser
  for (let i = 0; i < voices.length; ++i) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    selectVoice.appendChild(option);
  }

  selectTalk.addEventListener('click', (event) => {
    // If speech audio is already playing, finish audio before responding to click
    if (speechSynthesis.speaking) {
      return;
    }

    // Capture input text from textbox to use as utterance
    const inputText = selectTextArea.value;
    let utterance = new SpeechSynthesisUtterance(inputText);

    // If no input text given, do nothing
    if (!inputText) {
      return;
    }

    // Get selected audio option from dropdown options
    const selectedOption = selectVoice.selectedOptions[0].getAttribute("data-name");
    utterance.voice = voices.find(({ name }) => name === selectedOption);

    // Play speech audio of input text, update smiling image during speech 
    speechSynthesis.speak(utterance);
    simleImage.src = "assets/images/smiling-open.png";

    // Once speech finishes, change image back to original smiling image
    utterance.onend = () => {
      simleImage.src = "assets/images/smiling.png";
    };
  });
 });
}