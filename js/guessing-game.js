

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
    howClose(num) {
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

