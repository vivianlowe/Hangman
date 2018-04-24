// Array of words (all lowercase)

var moviesList = ["High School Musical", "Finding Nemo","Princess Diaries" ];

// Computer selected solution will be here

var chosenWord = '';

// Will break the solution in individual letters to be stored in array
var lettersInChosenWord= [];

// number of blanks we show based on the solution
var numBlanks = 0;

// holds a mix of blanks and solved letters
var blanksAndSuccesses = [];

// holds the wrong guesses
var wrongGuesses = [];

// holds the letters guessed
var letterGuessed = '';


// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;


// how we'll start and restart the game
function startGame() {

	//reset the guesses back to 0
	numGuesses = 9;

	// solution chosen randomly from wordList
	chosenWord = moviesList[Math.floor(Math.random() * moviesList.length)];

	// breaks the word into individual letters
	lettersInChosenWord = chosenWord.split("");

	// counts the number of letters in the word
	numBlanks = lettersInChosenWord.length;

	// here we print the solution in the console (for testing purposes)
	console.log(chosenWord);

	// here we reset the guess and success array at each round
	blanksAndSuccesses = [];

	// here we reset the wrong guesses from the previous round
	wrongGuesses = [];

	/*Here we fill up the blanksAndSuccess list the appropriate number of blanks 
	which is based on the number of blanks in a solution*/
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	// prints the initial blanks in the console
	console.log(blanksAndSuccesses);


	//reprints the guesses left to 9
	document.getElementById("guesses-left").innerHTML = numGuesses;

	// prints the blanks at the beginning of each round in theh HTML
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

	// Clears wrong guesses from previous round
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

}

// Here is where we'll do all of the comparisons for matches
function checkLetters(letter) {

	// a boolean which will be toggled based on whether or not a user letter is found anywhere in the word
	var letterInWord = false;

	for (var i=0; i < numBlanks; i++) {
		if (chosenWord[i] === letter) {
			// if the letter exists then change this to true 
			// it will be used in the next step
			letterInWord = true;
		}
	}


	// if the letter exists somewhere in the word, 
	// then figure out exactly where (what index)
	if (letterInWord) {
		// loop throughout the word
		for (var j=0; j < numBlanks; j++) {
			// populate the blanksAndSuccesses with every instance of the letter
			if (chosenWord[j] === letter) {
				// set specific blank spaces to equal the correct letter when there is a match
				blanksAndSuccesses[j] = letter;
			}
		}
		// Log for testing purposes
		console.log(blanksAndSuccesses);
	} 

	// if the letter doesn't exist at all...
	else {
		// then we add the letter to the list of wrong letters
		wrongGuesses.push(letter);
		// we also substract one of the guesses
		numGuesses--;
	}
}

// Here is the code that needs to be run after each guess is made
function roundComplete() {
	// innitial status update is the controls telling us the win, losses, and guesses left
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + 
		" | NumGuesses: " + numGuesses);

	//  -  HTML Updates  -

	// update the HTML to reflect the new number of guesses
	document.getElementById("guesses-left").innerHTML = numGuesses;
	// will print the array of guesses and blanks on the page
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	// will print the wrong guesses on to the page
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	// if we guess all the letters right
	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
		
		winCounter++;

		alert("You win!");
		// update the win counter in the HTML
		document.getElementById("win-counter").innerHTML = winCounter;

		// restart the game
		startGame();
	}

	// if we run out of guesses
	else if (numGuesses === 0) {

		lossCounter++;

		alert("You lose");

		// update the loss counter in the HTML
		document.getElementById("loss-counter").innerHTML = lossCounter;

		// restart game
		startGame();
	}
}
// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)

// alerts the game
startGame();

// initializes the function for capturing key clicks
document.onkeyup = function(event) {

	// converts all key clicks to lowercase letters
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	//runs the code to check for correct guesses
	checkLetters(letterGuessed);

	// runs the code that ends each round
	roundComplete();
};





