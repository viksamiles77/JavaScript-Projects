const wordDisplay = document.querySelector('.word-display');
const hangmanImage = document.querySelector('.hangman-box img');
const guessesText = document.querySelector('.guesses-text');
const keyboardDiv = document.querySelector('.keyboard');
const playAgainBtn = document.querySelector('#play-again');
const hintBtn = document.querySelector('#hint');
let wordHintCombo;

let currentWord, correctLetters = [], wrongGuessCount;
const maxGuess = 6;


const getHint = function () {
    document.querySelector('.hint-text b').innerText = wordHintCombo.hint;
}

const resetGame = function () {
    correctLetters = [];
    wrongGuessCount = 0;
    document.querySelector('.hint-text b').innerText = '';
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    getRandomWord();
    guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
}

const getRandomWord = function () {
    wordHintCombo = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = wordHintCombo.word;
    console.log(wordHintCombo.word);
    // document.querySelector('.hint-text b').innerText = wordHintCombo.hint;
    // getHint();
    // resetGame();
}

const initGame = function (button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach(function (letter, index) {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;

    if (wrongGuessCount === maxGuess) {
        alert('You lost!');
        resetGame();
    }
    if (correctLetters.length === currentWord.length) {
        alert('You won!');
        resetGame();
    }
}

// loop for generating buttons with all letters from keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button)
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}


const handleKeyDown = function (event) {
    // converting inputs to lowercase
    const pressedKey = event.key.toLowerCase();
    const letterButtons = keyboardDiv.querySelectorAll('button');

    // check if the pressed key corresponds to any letter button
    const matchingButton = Array.from(letterButtons).find(button => button.innerText.toLowerCase() === pressedKey);

    // if a matching button is found, trigger the event
    if (matchingButton) {
        matchingButton.click();
    }
}
document.addEventListener('keydown', handleKeyDown);

resetGame();
playAgainBtn.addEventListener('click', resetGame);
hintBtn.addEventListener('click', getHint)