//========== javescript that passes tests ===========

function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
    let n = array.length;
    while (n) {
        let i = Math.floor(Math.random() * n--);
        let temp = array[n];
        array[n] = array[i];
        array[i] = temp;
    }
    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.guessCount = 0;
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        return this.playersGuess < this.winningNumber;
    }
    checkGuess(num) {
        if (this.playersGuess === this.winningNumber) {
            return 'You Win!';
        }
        else if (this.guessCount > 4) {
            return 'You Lose.'
        }
        else if (this.pastGuesses.includes(num)) {
            return 'You have already guessed that number.'
        }
        else if (typeof num !== 'number' || num < 1 || num > 100) {
            return 'That is an invalid guess.';
        }
        else {
            this.pastGuesses.push(num);
            return this.howClose(num);
        }
    }

    howClose() {
        if (this.difference() < 10) {
            return 'You\'re burning up!';
        }
        else if (this.difference() < 25) {
            return 'You\'re lukewarm.';
        }
        else if (this.difference() < 50) {
            return 'You\'re a bit chilly.';
        }
        else if (this.difference() < 100) {
            return 'You\'re ice cold!';
        }
    }

    playersGuessSubmission(num) {
        if (typeof num !== 'number' || num < 1 || num > 100) {
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        this.guessCount++;
        return this.checkGuess(num);
    }

    provideHint() {
        let notCalled = true;
        let result;
        let winningNumber = this.winningNumber;
        return (function () {
            if (notCalled) {
                notCalled = false;
                result = shuffle([winningNumber, generateWinningNumber(), generateWinningNumber()]);
            }
            return result;
        })();
    }

}


function newGame() {
    return new Game;
}

//================== Adds visual temps ====================================

function letFrostAppear() {
    document.getElementById('cold-back').style.visibility = 'visible';
    setTimeout(function () {
        document.getElementById('firstFrost').style.visibility = 'visible';
    }, 100)
    setTimeout(function () {
        document.getElementById('secondFrost').style.visibility = 'visible';
    }, 400)
    setTimeout(function () {
        document.getElementById('thirdFrost').style.visibility = 'visible';
    }, 800)
}
function hideFrost() {
    document.getElementById('cold-back').style.visibility = 'hidden';
    setTimeout(function () {
        document.getElementById('firstFrost').style.visibility = 'hidden';
    }, 100)
    setTimeout(function () {
        document.getElementById('secondFrost').style.visibility = 'hidden';
    }, 400)
    setTimeout(function () {
        document.getElementById('thirdFrost').style.visibility = 'hidden';
    }, 800)
}

function letLargeFlamesAppear() {
    document.getElementById('hot-back').style.visibility = 'visible';
    document.getElementById('flames-large').style.visibility = 'visible';
}

function getWarmer() {
    document.getElementById('hot-back').style.visibility = 'visible';
}

function getCooler() {
    document.getElementById('cold-back').style.visibility = 'visible';
}

function hideOtherTemps() {
    document.getElementById('cold-back').style.visibility = 'hidden';
    document.getElementById('flames-large').style.visibility = 'hidden';
    document.getElementById('hot-back').style.visibility = 'hidden';
    hideFrost();
}

//========================= Altered Code to Style Game ==========================

let hints;

class GameAltered {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.guessCount = 0;
        this.haveWon = false
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        return this.playersGuess < this.winningNumber;
    }
    checkGuess(num) {
        if (this.playersGuess === this.winningNumber) {
            this.haveWon = true;
            hideOtherTemps();
            return '<span class="win-lose">You Win!</span>';
        }
        else if (this.guessCount > 4) {
            return '<span class="win-lose">You Lose.</span>'
        }
        else if (this.pastGuesses.includes(num)) {
            return 'You have already guessed that number.'
        }
        else if (isNaN(num) || num < 1 || num > 100) {
            return 'That is an invalid guess.';
        }
        else {
            this.pastGuesses.push(num);
            return this.howClose(num);
        }
    }
    howClose() {
        if (this.difference() < 10) {
            hideOtherTemps();
            letLargeFlamesAppear();
            return 'You\'re <span class="font-effect-fire-animation">burning up!</span>';
        }
        else if (this.difference() < 25) {
            hideOtherTemps();
            getWarmer();
            return 'You\'re <span id="lukewarm">lukewarm</span>.';
        }
        else if (this.difference() < 50) {
            hideOtherTemps();
            getCooler()
            return 'You\'re a<span id="chilly"> bit chilly</span>.';
        }
        else if (this.difference() < 100) {
            hideOtherTemps();
            letFrostAppear();
            return 'You\'re <span class="font-effect-ice" id="ice-cold">ice cold!</span>';
        }
    }

    playersGuessSubmission(num) {
        if (isNaN(num) || num < 1 || num > 100) {
            return 'That is an invalid guess.'
            // throw 'That is an invalid guess.';
        }

        if (!this.pastGuesses.includes(num)) {
            this.guessCount++;
            this.playersGuess = num;
        }

        return this.checkGuess(num);
    }

    provideHint() {
        return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
    }
}

function newGameAltered() {
    return new GameAltered;
}

let game = newGameAltered()

function addGuess(num, newMessage) {
    let notPrevGuessed = newMessage !== 'You have already guessed that number.';
    let isValidInput = newMessage !== 'That is an invalid guess.';
    if (notPrevGuessed && isValidInput) {
        if (game.guessCount === 1) {
            document.getElementById('guess1').innerHTML = num;
        }
        else if (game.guessCount === 2) {
            document.getElementById('guess2').innerHTML = num;
        }
        else if (game.guessCount === 3) {
            document.getElementById('guess3').innerHTML = num;
        }
        else if (game.guessCount === 4) {
            document.getElementById('guess4').innerHTML = num;
        }
        else if (game.guessCount === 5) {
            document.getElementById('guess5').innerHTML = num;
        }
    }
}

function onClickGoOrEnter() {
    if (game.haveWon) {
        return;
    }
    let message = document.getElementsByTagName('h2');
    let inputNumber = Number(document.querySelector('input').value);
    console.log(inputNumber)
    let newMessage = game.playersGuessSubmission(inputNumber);

    let guessUpdate = '';

    if (game.guessCount < 5 && inputNumber !== game.winningNumber && newMessage !== 'You have already guessed that number.' && newMessage !== 'That is an invalid guess.') {
        if (game.isLower()) {
            guessUpdate = 'Guess higher.';
        }
        else {
            guessUpdate = 'Guess lower.';
        }
    }
    else if (newMessage === 'You Lose.') {
        guessUpdate = `The number was ${game.winningNumber}`
    }

    addGuess(inputNumber, newMessage);
    message[0].innerHTML = `${newMessage} ${guessUpdate}`;
    document.querySelector('input').value = '';
}

if (document.getElementById('go-button') !== null) {
    document.getElementById('go-button').addEventListener('click', onClickGoOrEnter);
}

if (document.querySelector('input') !== null) {
    document.querySelector('input').addEventListener('keypress', function (e) {
        let key = e.which || e.keyCode;
        if (key === 13) {
            onClickGoOrEnter();
        }
    });
}


if (document.getElementById('rest-button')) {
    document.getElementById('rest-button').addEventListener('click', function () {
        game = newGameAltered();
        [1, 2, 3, 4, 5].forEach(number => {
            document.getElementById('guess' + number).innerHTML = '-';
        });

        document.querySelector('h2').innerHTML = 'Guess a number between 1-100';
        document.getElementById('hint').classList.remove('closed');
        hideOtherTemps();
        hints = game.provideHint();
    });
}

if (document.getElementById('hint-button')) {
    hints = game.provideHint();
    document.getElementById('hint-button').addEventListener('click', function () {
        hints = shuffle(hints);
        document.getElementById('hint').classList.add('closed');
        document.querySelector('p').innerHTML = `The number is ${hints[0]}, ${hints[1]}, or ${hints[2]}`;
    });
}


if (document.getElementById('x-button')) {
    document.getElementById('x-button').addEventListener('click', function () {
        document.getElementById('hint').classList.remove('closed');
    });
}











