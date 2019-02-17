// Global variables //

const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
const resetButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const overlay = document.getElementById('overlay');
const letters = document.getElementsByClassName('letter');
const shownLetters = document.getElementsByClassName('show');
const scoreboard = document.getElementById('scoreboard');

const phrases = [
    'When in Rome',
    'Fish out of water',
    'Beat a dead horse',
    'Rule of thumb',
    'Down for the count',
    'Under your hat',
    'Rob Peter to pay Paul',
    'Better late than never'
];

let missed = 0;


// Hide Start Screen Overlay //

resetButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});


// Get random phrase and split into new array of characters //

function getRandomPhraseAsArray(arr) {
    let phraseIndex = Math.floor(Math.random()*phrases.length);
    let randomPhrase = arr[phraseIndex].toLowerCase();
    let phraseItems = randomPhrase.split('');
    return phraseItems;
};


// Function to set the game display //

function addPhrasetoDisplay(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        let li = document.createElement('li');
        let text = document.createTextNode(arr[i]);
        li.appendChild(text);
        phrase.appendChild(li);
        if (arr[i] != ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
};


// Call Random phrase and append to game display //

const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray); 


// Check if chosen letter matches character(s) in phraseItems //

function checkLetter(btn) {
    let check = false;
    for (let i = 0; i < letters.length; i += 1) {
        if (btn.textContent === letters[i].textContent.toLowerCase()) {
            letters[i].classList.add('show');
	        check = true;
        } 
    }
    return check;
};


// Listen to user selections on the keyboard and call checkLetter() on each selection //

qwerty.addEventListener('click', (e) => {
	let letterFound = checkLetter(e.target);
	if (e.target.tagName === 'BUTTON') {
            e.target.classList.add('chosen');
            e.target.disabled = true;
	 	    if(letterFound) {
			    checkWin(shownLetters, letters, missed);
	 	    } else if (!letterFound) {
			    checkLose();
		    }
  	}
});


// Each time the player guesses a letter, this function will check whether the game has been won or lost //


function checkWin(x, y, z) {
	if (x.length === y.length && z <= 5) {
		title.innerHTML = 'YOU WIN!';
		resetButton.innerHTML = 'Start New Game!';
		overlay.style.display = 'block';
		overlay.classList.add('win');
	}
};

function checkLose() {
	missed += 1;
	const ol = scoreboard.firstElementChild;
	let li = ol.children[missed - 1];
	if (missed <= 5) {
		li.style.display = 'none';
	}
    if (missed >= 5) {
		title.innerHTML = 'YOU LOSE!';
		resetButton.innerHTML = 'Try Again';
		overlay.style.display = 'block';
		overlay.classList.add('lose');
	}
}



