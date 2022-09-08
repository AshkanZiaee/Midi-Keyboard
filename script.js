// note is gonna be used to access the html elements
// key is gonna be used for triggering the sounds
// frequency is gonna be used to generate sounds
// active is to let us know which notes are being played
// you can generate sounds by pressing the following keys in the array
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

// Generate sound on keydown
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const keyBoardKey = e.key;
  const noteDetail = getNoteDetail(keyBoardKey);
  if (noteDetail == null) return;
  noteDetail.active = true;
  playNotes();
});

// Stop sound on keyUp
document.addEventListener("keyup", (e) => {
  const keyBoardKey = e.key;
  const noteDetail = getNoteDetail(keyBoardKey);
  if (noteDetail == null) return;
  noteDetail.active = false;
  playNotes();
});

// Get the notes that are being played
function getNoteDetail(key) {
  return NOTE_DETAILS.find((n) => n.key.toLowerCase() === key);
}

function playNotes() {
  NOTE_DETAILS.forEach((node) => {
    const keyDiv = document.querySelector(`[data-note=${node.note}]`);
    keyDiv.classList.toggle("active", node.active);
    // removing active notes after keyup was triggered
    if (node.oscillator) {
      const oscillator = node.oscillator;
      oscillator.stop();
      oscillator.disconnect();
    }
  });

  const activeNotes = NOTE_DETAILS.filter((n) => n.active);

  // each note plays at 100% volume so if to notes play at the same time
  // we get 200% and we don't want that therefore we are decreasing the volume
  // by 1 divided by the amount of nodes that are currently active
  // so we can be sure that we get a total 100% volume at all time
  const gain = 1 / activeNotes.length;
  makeSound(activeNotes, gain);
}

function makeSound(activeNotes, gain) {
  activeNotes.forEach((n) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = gain;
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle"; // "square" "sawtooth" "sine"
    oscillator.frequency.value = n.frequency;
    oscillator.connect(gainNode).connect(audioContext.destination);
    oscillator.start();
    n.oscillator = oscillator;
  });
}
