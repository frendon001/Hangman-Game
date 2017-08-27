var test = [];
console.log(test);
console.log(test.length);
//Declare and initialize variables for game session in hangman object

var hangman = {
	wins: 0,
	loses: 0,
	remainingGuesses: 12,
	lettersGuessed: [],
	wordsUsed: [],
	currentWord: "",
	currentWordState: "",
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
		var regex = /[a-z]|[A-Z]/g;
		this.currentWordState = this.currentWord.replace(regex, "_");
	}

};

var displayCurrentWord = document.getElementById("current-word");

//assign first word to guess for the game
hangman.newWord();
console.log(hangman.currentWord);
console.log(hangman.wordsUsed);

//populate current word on page with placeholders
hangman.wordPlaceHolder();
displayCurrentWord.textContent = hangman.currentWordState;


//Start/continue game on player key input
document.onkeyup = function(event) {

	// Determines which key was pressed.
	var playerGuess = event.key.toUpperCase();
	console.log(playerGuess);

	//compare the playerGuess against current value and determine if guess is correct

	//update the letters guessed array and display changes on webpage

	//check if word if word guess is complete

	//check if player ran out of guesses







};