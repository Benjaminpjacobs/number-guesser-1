var guessInput = document.getElementById('guessInput');
var guessButton = document.getElementById('guessButton');
var clearButton = document.getElementById('clearButton');
var resetButton = document.getElementById('resetButton');
var guessMessageTop = document.getElementById('guessMessageTop');
var guessValue = document.getElementById('guessValue');
var guessMessageBottom = document.getElementById('guessMessageBottom');
var errorMessages = document.getElementById('errorMessages');
var randomNumber = null;
var usersLastGuess = null;

// When the user clicks the CLEAR button, reset the input field state
clearButton.addEventListener('click', function () {
	console.log('CLEAR clicked.');
	clearInput();
	disableButton(clearButton);
});

resetButton.addEventListener('click', function () {
	console.log('RESET clicked.');
	clearInput();
	setZeroState();
});

// User clicks guess, so we need to evaluate it against the random number
guessButton.addEventListener('click', function () {
	console.log('GUESS clicked.');
	enableButton(resetButton);
	usersLastGuess = parseInt(guessInput.value, 10);
	if (isNaN(usersLastGuess)) {
		errorMessages.innerText = "<poke>Hey! That's not a valid number!";
		clearInput();
	} else if (usersLastGuess < 1 || usersLastGuess > 100) {
		errorMessages.innerText = "<poke>Hey! Pick a number between 1 and 100!";
		clearInput();
	} else {
		errorMessages.innerText = '';
		evaluateGuess();
	}
});

// Disable or Enable certain buttons as the user enters text.
guessInput.addEventListener('input', function () {
	if (guessInput.value.length > 0) {
		enableButton(clearButton);
		enableButton(resetButton);
	} else {
		disableButton(clearButton);
		if (usersLastGuess == null) {
			// Also disable RESET, because they haven't yet submitted anything.
			disableButton(resetButton);
		}
	}
})

// This function will enable whatever button is passed in as a parameter, and it will update the CSS class appropriately
function enableButton(buttonToEnable) {
	console.log('function call to enableButton()');
	buttonToEnable.disabled = false;
	buttonToEnable.classList.add('buttonEnabled');
	buttonToEnable.classList.remove('buttonDisabled');
}

// This function will disable whatever button is passed in as a parameter, and it will update the CSS class appropriately
function disableButton(buttonToDisable) {
	console.log('function call to disableButton()');
	buttonToDisable.disabled = true;
	buttonToDisable.classList.add('buttonDisabled');
	buttonToDisable.classList.remove('buttonEnabled');
}

// Reset the application interface to zero state
function setZeroState() {
	getRandomNumber();
	disableButton(clearButton);
	disableButton(resetButton);
	usersLastGuess = null;
	guessMessageTop.innerText = "Welcome!";
	guessValue.innerText = '';
	guessMessageBottom.innerText = '';
	errorMessages.innerText = '';
}

// Function to generate a random number and assign it to a global variable
function getRandomNumber() {
	randomNumber = Math.floor(Math.random() * 100 + 1);
	console.log('Random number is currently ' + randomNumber);
}

// Function to clear the guess input field and set focus to the input element
function clearInput() {
	guessInput.value = '';
	guessInput.focus();
}

// Function to evaluate the users guess compared to the current random number
function evaluateGuess() {
	console.log('Evaluate the users guess. If we are here, it is a valid number.');

	errorMessages.innerText = '';
	guessMessageTop.innerText = "Your last guess was";
	guessValue.innerText = usersLastGuess;

	if (usersLastGuess > randomNumber) {
		guessMessageBottom.innerText = "That is too high";
	} else if (usersLastGuess < randomNumber) {
		guessMessageBottom.innerText = "That is too low";
	} else {
		guessMessageBottom.innerText = "BOOM!";
	}
	clearInput();
}
