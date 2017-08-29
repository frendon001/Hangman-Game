//declare and initialize global variables for game
var displayWinCount = document.getElementById("win-count");
var displayLossCount = document.getElementById("loss-count");
var displayCurrentWord = document.getElementById("current-word");
var displayRemainingGuesses = document.getElementById("number-guesses");
var displayLettersGuessed = document.getElementById("letters-guessed");
var isCapLetterReg = /[A-Z]/g;

// create hangman object for the game
var hangman = {
	//Declare and initialize variables for game session in hangman object
	wins: 0,
	losses: 0,
	remainingGuesses: 12,
	gameOver: false,
	lettersGuessed: [],
	wordsUsed: [],
	currentWord: "",
	currentWordState: "",
	currentWordArr: [],
	//create array of possible guess options
	wordList: ["Constellation", "Meteorite", "Eclipse", "Micrometeorites"],
	// wordPlaceHolder: function() {
	// 	//set place holders for currentWordStatus variable
	// 	//used to hide word at the start of new word
	// 	this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
	// 	isCapLetterReg.lastIndex = 0;
	// },
	updateCurrentWordState: function(guess) {
		//update display for word after each guess
		var newWordState = this.currentWordState.split("");
		for (var i = newWordState.length - 1; i >= 0; i--) {
			if (this.currentWordArr[i] === guess) {
				//populate the gussed character in the proper place for display
				newWordState[i] = this.currentWordArr[i];
			}
		}

		this.currentWordState = newWordState.join("");
	},
	newWord: function() {
		//randomly select a word to guess from wordList
		if (this.wordsUsed.length === 0) {

			//select any word since the game was restarted
			this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
			//add the randomly selected word to the wordsUsed list
			this.wordsUsed.push(this.currentWord);
			//store current word as array
			this.currentWordArr = this.currentWord.split("");
			//set place holders for currentWordStatus variable
			//used to hide word at the start of new word
			this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
			isCapLetterReg.lastIndex = 0;

		} else if(this.wordList.length > 1) {

			//createvraible to hold current word for filtering
			var removeWord = this.currentWord;
			//remove the used word from wordList
			this.wordList = this.wordList.filter(function(word){
  				return word.toUpperCase() !== removeWord;
			});
			//Select a new word from filtered word List
			this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
			//add the randomly selected word to the wordsUsed list
			this.wordsUsed.push(this.currentWord);
			//store current word as array
			this.currentWordArr = this.currentWord.split("");
			//set place holders for currentWordStatus variable
			//used to hide word at the start of new word
			this.currentWordState = this.currentWord.replace(isCapLetterReg, "_");
			isCapLetterReg.lastIndex = 0;
		} else {
			this.gameOver = true;
		}
	},
	nextWordReset: function() {
		//reset reamining guesses and letter guessed for next word
		this.remainingGuesses = 12;
		this.lettersGuessed = [];


	}

};


//assign first word to guess for the game
hangman.newWord();

// set initial values on webpage
displayCurrentWord.textContent = hangman.currentWordState;
displayRemainingGuesses.textContent = hangman.remainingGuesses;
displayWinCount.textContent = hangman.wins;
displayLossCount.textContent = hangman.losses;

//console.log(hangman.currentWordArr);



//Start/continue game on player key input
document.onkeyup = function(event) {

	// Determines which key was pressed.
	var playerGuess = event.key.toUpperCase();
	//need to either re-initialize the regex or reset the last index for regex to 0
	//for the .test() method to work properly otherwise there is a strange alternating evaluation of the expression
	//https://siderite.blogspot.com/2011/11/careful-when-reusing-javascript-regexp.html
	isCapLetterReg.lastIndex = 0;

	//check if game is over
	if (hangman.gameOver === true){
		console.log("GAMEOVER!");

	//if game is not over continue playing the game
	//Validadate that a A-Z letterkey was entered otherwise do nothing
	//Also validate that current guess is new
	} else if (isCapLetterReg.test(playerGuess) && playerGuess.length === 1 && hangman.lettersGuessed.indexOf(playerGuess) === -1) {

		//update letters guessed array with new guess
		hangman.lettersGuessed.push(playerGuess);
		//Update display of letters guessed on webpage
		displayLettersGuessed.textContent = hangman.lettersGuessed.join(",");

		//Compare the playerGuess against current value and determine if guess is correct
		if (hangman.currentWordArr.indexOf(playerGuess) > -1) {

			//Guess is correct, update currentWordState
			hangman.updateCurrentWordState(playerGuess);
			//Display currentWordState on webpage
			displayCurrentWord.textContent = hangman.currentWordState;


		} else {

			//Incorrect Guess - Decrease number of guesses since valid key was pressed 
			hangman.remainingGuesses -= 1;
			//Update display of remaining guesses on webpage
			displayRemainingGuesses.textContent = hangman.remainingGuesses;
		}

		//Check if word guess is complete
		if (hangman.currentWordState === hangman.currentWord) {
			//Increment win count and use new word
			hangman.wins++;
			hangman.newWord();
			hangman.nextWordReset();
			//Update values on webpage
			displayCurrentWord.textContent = hangman.currentWordState;
			displayRemainingGuesses.textContent = hangman.remainingGuesses;
			displayWinCount.textContent = hangman.wins;
			displayLossCount.textContent = hangman.losses;
			displayLettersGuessed.textContent = hangman.lettersGuessed.join(",");
		}

		//Check if player ran out of guesses
		if (hangman.remainingGuesses == 0) {
			//Increment losses count and use new word
			hangman.losses++;
			hangman.newWord();
			hangman.nextWordReset();
			// Update values on webpage
			displayCurrentWord.textContent = hangman.currentWordState;
			displayRemainingGuesses.textContent = hangman.remainingGuesses;
			displayWinCount.textContent = hangman.wins;
			displayLossCount.textContent = hangman.losses;
			displayLettersGuessed.textContent = hangman.lettersGuessed.join(",");
		}
	}

};