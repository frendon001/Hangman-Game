//declare and initialize global variables for game
var displayCurrentWord = document.getElementById("current-word");
var displayWinCount = document.getElementById("win-count");
var displayRemainingGuesses = document.getElementById("number-guesses");
var displayLettersGuessed = document.getElementById("letters-guessed");
var isCapLetterReg = /[A-Z]/g;
var playerGuess = "";
// create hangman object for the game
var hangman = {
	//Declare and initialize variables for game session in hangman object
	wins: 0,
	loses: 0,
	remainingGuesses: 12,
	lettersGuessed: [],
	wordsUsed: [],
	currentWord: "",
	currentWordState: "",
	currentWordArr: [],
	//create array of possible guess options
	wordList: ["Constellation", "Meteorite", "Eclipse", "Micrometeorites"],
	newWord: function() {
		//randomly select a word to guess from wordList
		if (this.wordsUsed.length === 0) {
			//select any word since the game was restarted
			this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
			//add the randomly selected word to the wordsUsed list
			this.wordsUsed.push(this.currentWord);
		}
	},
	wordPlaceHolder: function() {
		// var wordEdit = this.currentWord;
		this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
		isCapLetterReg.lastIndex = 0;
	}

};



//assign first word to guess for the game
hangman.newWord();

console.log(hangman.currentWord);
console.log(hangman.wordsUsed);

//populate current word on page with placeholders
hangman.wordPlaceHolder();
displayCurrentWord.textContent = hangman.currentWordState;
displayRemainingGuesses.textContent = hangman.remainingGuesses;

hangman.currentWordArr = hangman.currentWord.split("");

console.log(hangman.currentWordArr);

var newWordState = "";

//Start/continue game on player key input
document.onkeyup = function(event) {

	// Determines which key was pressed.
	playerGuess = event.key.toUpperCase();

	//need to either re-initialize the regex or reset the last index for regex to 0
	//for the .test() method to work properly otherwise there is a strange alternating evaluation of the expression
	//https://siderite.blogspot.com/2011/11/careful-when-reusing-javascript-regexp.html
	// isCapLetterReg = /[A-Z]/g;
	isCapLetterReg.lastIndex = 0;
	// var isValidKey = isCapLetterReg.test(playerGuess);
	

	//Validadate that a A-Z letterkey was entered otherwise do nothing
	//Also validate that current guess is new
	if (isCapLetterReg.test(playerGuess) && playerGuess.length === 1 && hangman.lettersGuessed.indexOf(playerGuess) === -1) {
		console.log("Valid Key Entered: " + playerGuess);
		

		//update letters guessed array with new guess
		hangman.lettersGuessed.push(playerGuess);
		displayLettersGuessed.textContent = hangman.lettersGuessed.join(",");


		//compare the playerGuess against current value and determine if guess is correct
		if (hangman.currentWordArr.indexOf(playerGuess) > -1 ) {
			console.log("Correct: " + hangman.currentWordArr.indexOf(playerGuess));
			//Guess is correct, update currentWordState and display changes on webpage
			newWordState = hangman.currentWordState.split("");
			console.log(newWordState);
			for (var i = newWordState.length - 1; i >= 0; i--) {
				if (hangman.currentWordArr[i] === playerGuess) {
					newWordState[i] = hangman.currentWordArr[i];
				}
			}

			hangman.currentWordState = newWordState.join("");
			console.log(hangman.currentWordState);
			displayCurrentWord.textContent = hangman.currentWordState;


		} else {
			//incorrect guess
			//decrease numberof guesses since valid key was pressed 
			hangman.remainingGuesses -= 1;
			displayRemainingGuesses.textContent = hangman.remainingGuesses;
		}

		//update the letters guessed array and display changes on webpage

		//check if word guess is complete

		//check if player ran out of guesses
	}




};