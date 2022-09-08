const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626, active: false },
  { note: "Db", key: "S", frequency: 277.183, active: false },
  { note: "D", key: "X", frequency: 293.665, active: false },
  { note: "Eb", key: "D", frequency: 311.127, active: false },
  { note: "E", key: "C", frequency: 329.628, active: false },
  { note: "F", key: "V", frequency: 349.228, active: false },
  { note: "Gb", key: "G", frequency: 369.994, active: false },
  { note: "G", key: "B", frequency: 391.995, active: false },
  { note: "Ab", key: "H", frequency: 415.305, active: false },
  { note: "A", key: "N", frequency: 440, active: false },
  { note: "Bb", key: "J", frequency: 466.164, active: false },
  { note: "B", key: "M", frequency: 493.883, active: false },
];
const audioContext = new AudioContext();

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const keyBoardKey = e.key;
  const noteDetail = getNoteDetail(keyBoardKey);
  if (noteDetail == null) return;
  noteDetail.active = true;
  playNotes();
});

document.addEventListener("keyup", (e) => {
  const keyBoardKey = e.key;
  const noteDetail = getNoteDetail(keyBoardKey);
  if (noteDetail == null) return;
  noteDetail.active = false;
  playNotes();
});

function getNoteDetail(key) {
  return NOTE_DETAILS.find((n) => n.key.toLowerCase() === key);
}

function playNotes() {
  NOTE_DETAILS.forEach((node) => {
    const keyDiv = document.querySelector(`[data-note=${node.note}]`);
    keyDiv.classList.toggle("active", node.active);
    if (node.oscillator) {
      const oscillator = node.oscillator;
      oscillator.stop();
      oscillator.disconnect();
    }
  });
  const activeNotes = NOTE_DETAILS.filter((n) => n.active);
  const gain = 1 / activeNotes.length;
  makeSound(activeNotes, gain);
}

function makeSound(activeNotes, gain) {
  activeNotes.forEach((n) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = gain;
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.value = n.frequency;
    oscillator.connect(gainNode).connect(audioContext.destination);
    oscillator.start();
    n.oscillator = oscillator;
  });
}

// creates sounds using frequencies
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.type = "triangle"; // "square" "sine" "sawtooth"
oscillator.frequency.value = frequency; // 440 is default (try different frequencies)
oscillator.connect(audioContext.destination); // connects to your audio output
oscillator.start(0); // immediately starts when triggered
oscillator.stop(0.5); // stops after 0.5 seconds

> Blockquote