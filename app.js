// Variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttonReset = document.querySelector('.btn__reset');
let missed = 0;



// Hide overlay when the "Start Game" button is clicked

buttonReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Get random phrase and split into new array of characters

function getRandomPhraseAsArray(arr) {
    let randomPhrase = Math.floor(Math.random() * arr.length);
    return arr[randomPhrase].split('');
};

// Function to set the game display

function addPhraseToDisplay(arr){
    const ul = phrase.firstElementChild;
    for (let i = 0; i < arr.length; i += 1) {
      const li = appendToElement(ul, 'li', 'textContent', arr[i]);
      li.className = checkIfLetter(li)?'letter': 'space';
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 







