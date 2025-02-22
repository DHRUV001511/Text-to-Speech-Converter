const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
const synth = window.speechSynthesis;
let isSpeaking = false;
let utterance = null;


const getFemaleVoice = () => {
    let voices = synth.getVoices();
    
   
    let femaleVoice = voices.find(voice => voice.name.includes("Female") && voice.lang.startsWith("en")) || 
                      voices.find(voice => voice.lang.startsWith("en"));

    return femaleVoice || voices[0]; 
};

const textToSpeech = () => {
    const text = textarea.value.trim();

    if (!text) {
        alert("Please enter some text!");
        return;
    }

    if (!utterance) {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.75; 
        utterance.voice = getFemaleVoice();

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

window.speechSynthesis.onvoiceschanged = () => {
    let defaultVoice = getFemaleVoice();
    if (utterance) utterance.voice = defaultVoice;
};

button.addEventListener("click", textToSpeech);
