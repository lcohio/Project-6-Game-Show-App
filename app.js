// Variables

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
let missed = 0;

// Hide Start Screen Overlay on Button Click

resetButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phrases = [
    'When in Rome',
    'A fish out of water',
    'Beat a dead horse',
    'Rule of thumb',
    'Down for the count',
    'Under your hat',
    'Rob Peter to pay Paul'
];

// Get random phrase and split into new array of characters

function getRandomPhraseAsArray(arr) {
    let phraseIndex = Math.floor(Math.random()*phrases.length);
    let randomPhrase = arr[phraseIndex].toLowerCase();
    let phraseItems = randomPhrase.split('');
    return phraseItems;
};

// Function to set the game display

function addPhrasetoDisplay(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        let phraseArray = getRandomPhraseAsArray(phrases);
        let li = document.createElement('li'[i]);
        phraseArray.appendChild(li);
    }
}








