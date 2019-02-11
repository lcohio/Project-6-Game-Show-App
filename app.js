// Variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const letters = document.getElementsByClassName('letter');
const shownLetters = document.getElementsByClassName('show');
const ul = document.getElementsByTagName('ul')[0];
const h3 = document.getElementsByTagName('h3')[0];
const overlay = document.getElementById('overlay');
const lives = document.getElementsByTagName('img');
const buttonReset = document.querySelector('.btn__reset');
const buttons = document.getElementsByTagName('button');
const title = document.querySelector('h2');
let missed = 0;
let reset = false;
let score = 0;

const phrases = [
    'When in Rome',
    'A fish out of water',
    'Beating a dead horse',
    'Rule of thumb',
    'Down for the count',
    'Under your hat',
    'Rob Peter to pay Paul'
];



// Get random phrase and split into new array of characters

function getRandomPhraseAsArray(arr) {
    let randomPhrase = Math.floor(Math.random() * arr.length);
    return arr[randomPhrase].split('');
};

// Function to set the game display

function addPhraseToDisplay(arr) {
    for (let i = 0; i <arr.length; i += 1) {
        const createLI = document.createElement('li');
        createLI.textContent = arr[i];
        ul.appendChild(createLI);
        if (arr[i].match(/^[A-Za-z]+$/)) {
            createLI.className = 'letter';
        } else {
            createLI.className = 'space';
        }
    }
}

// Call functions created above

const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

// Check if letter picked matches letters in the random array

function checkLetter(btn) {
    let guessed = false;
    for (let i = 0; i < letters.length; i += 1) {
        if (btn.target.textContent === letters[i].textContent.toLowerCase()) {
            letters[i].className += ' show';
            guessed = true;
            score += 50;
            h3.textContent = `Score : ${score}`;
        }
     }
    return guessed;
}

// Display the correct overlay for outcome of the game

function checkWin() {
    if (letters.length === shownLetters.length) {
       overlay.style.display = '';
       overlay.className = 'win';
       title.innerHTML = 'Great job, you won the game.';
       buttonReset.textContent = 'I Want More';
       reset = true;
       score += 1000;
       h3.className = 'scoreOverlay';
       h3.textContent = `Score : ${score}`;
    } else if (missed === 5) {
       overlay.style.display = '';
       overlay.className = 'lose';
       title.innerHTML = 'Game Over!';
       buttonReset.textContent = 'Start Over!';
       reset = true;
       h3.className = 'scoreOverlay';
       h3.textContent = `High Score : ${score}`;
    }
}

// Executes after reset button event is fired

function resetGame() {
    if (reset === true) {
       missed = 0;
       for (let i = 0; i < lives.length; i += 1) {
          lives[i].src = 'images/liveHeart.png';
       }
       for (let i = 0; i < letters.length; i += 1) {
          letters[i].className = 'letter';
       }
       for (let i = 0; i < buttons.length; i += 1) {
          buttons[i].className = '';
          buttons[i].disabled = false;
       }
       const li = document.querySelectorAll('.letter, .space');
       for (let i = 0; i < li.length; i += 1) {
          ul.removeChild(li[i]);
       }
       const phraseArray = getRandomPhraseAsArray(phrases);
       addPhraseToDisplay(phraseArray);
    }
 }

// Hide overlay when the "Start Game" button is clicked

buttonReset.addEventListener('click', () => {
    overlay.style.display = 'none';
    if (reset === true && missed === 5) {
        resetGame();
        score = 0;
        h3.className = 'score';
        h3.textContent = `Score : ${score}`;
     } else {
        resetGame();
        
     }
});

// Listen for key selections and add chosen class to selections

keyboard.addEventListener('click', event => {
    const letterFound = checkLetter(event);
    if (event.target.tagName === 'BUTTON') {
        event.target.className = 'chosen';
        event.target.disabled = true;
        if (letterFound === false && missed < 5) {
            lives[missed].setAttribute('src', 'images/lostHeart.png');
            missed++;
        }
    }
    checkWin();
});