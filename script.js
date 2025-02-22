const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
const synth = window.speechSynthesis;
let isSpeaking = false;
let utterance = null;

// Function to get a female voice
const getFemaleVoice = () => {
    let voices = synth.getVoices();
    
    // Try to find an English female voice
    let femaleVoice = voices.find(voice => voice.name.includes("Female") && voice.lang.startsWith("en")) || 
                      voices.find(voice => voice.lang.startsWith("en"));

    return femaleVoice || voices[0]; // If no female voice is found, use the first available one
};

const textToSpeech = () => {
    const text = textarea.value.trim();

    if (!text) {
        alert("Please enter some text!");
        return;
    }

    if (!utterance) {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.75; // Set speed to 0.75x (slower)
        utterance.voice = getFemaleVoice(); // Assign a female voice

        utterance.onend = () => {
            isSpeaking = false;
            button.innerText = "Convert to Speech";
            utterance = null;
        };
    }

    if (!synth.speaking) {
        synth.speak(utterance);
        button.innerText = "Pause";
        isSpeaking = true;
    } else if (synth.speaking && isSpeaking) {
        synth.pause();
        button.innerText = "Resume";
        isSpeaking = false;
    } else {
        synth.resume();
        button.innerText = "Pause";
        isSpeaking = true;
    }
};

// Make sure voices are loaded before setting one
window.speechSynthesis.onvoiceschanged = () => {
    let defaultVoice = getFemaleVoice();
    if (utterance) utterance.voice = defaultVoice;
};

button.addEventListener("click", textToSpeech);
