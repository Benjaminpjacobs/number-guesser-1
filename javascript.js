// Set the global variables that will be needed.
var guessInput = document.getElementById('guessInput');
var guessButton = document.getElementById('guessButton');
var clearButton = document.getElementById('clearButton');
var resetButton = document.getElementById('resetButton');
var guessMessageTop = document.getElementById('guessMessageTop');
var guessValue = document.getElementById('guessValue');
var guessMessageBottom = document.getElementById('guessMessageBottom');
var errorMessages = document.getElementById('errorMessages');
var minRangeValue = document.getElementById('minRangeValue');
var maxRangeValue = document.getElementById('maxRangeValue');
var randomNumber = null;
var usersLastGuess = null;
var debug = false;

// Event listener on the CLEAR button. We need to clear the input element and disable the appropriate buttons.
clearButton.addEventListener('click', function () {
	clearInput();
	disableElement(clearButton);
});

// Event listener on the RESET button. We need to clear the input element and reset back to zero state.
resetButton.addEventListener('click', function () {
	if (debug) {
		console.log('=+=+=+=+=+=+ NEW GAME =+=+=+=+=+=+');
	}
	clearInput();
	setZeroState();
});

// Event listener that checks the input of the Min Range to ensure it is a valid number.
minRangeValue.addEventListener('input', function () {
	var minVal = parseInt(minRangeValue.value, 10);
	if (isNaN(minVal)) {
		errorMessages.innerText = "Min range value must be a valid number.";
	} else {
		minRangeValue.value = minVal;
	}
})

// Event listener that checks the input of the Max Range to ensure it is a valid number.
maxRangeValue.addEventListener('input', function () {
	var maxVal = parseInt(maxRangeValue.value, 10);
	if (isNaN(maxVal)) {
		errorMessages.innerText = "Max range value must be a valid number.";
	} else {
		maxRangeValue.value = maxVal;
	}
})

// User clicks guess, so we need to evaluate it against the random number
guessButton.addEventListener('click', function () {
	enableElement(resetButton);
	usersLastGuess = parseInt(guessInput.value, 10);
	minVal = parseInt(minRangeValue.value, 10);
	maxVal = parseInt(maxRangeValue.value, 10);
	if (isNaN(usersLastGuess)) {
		errorMessages.innerText = "Hey, now you're just messing with me! Please enter a valid number.";
		clearInput();
	} else if (usersLastGuess < minVal || usersLastGuess > maxVal) {
		errorMessages.innerText = "Really? C'mon, pick a number between " + minVal + " and " + maxVal + ".";
		clearInput();
	} else {
		errorMessages.innerText = '';
		if (debug) {
			console.log('Random number is currently ' + randomNumber);
		}
		if (randomNumber == null) {
			getRandomNumber();
		}
		evaluateGuess();
	}
});

// Disable or Enable certain buttons as the user enters text.
guessInput.addEventListener('input', function () {
	if (guessInput.value.length > 0) {
		enableElement(clearButton);
		enableElement(resetButton);
	} else {
		disableElement(clearButton);
		if (usersLastGuess == null) {
			// Also disable RESET, because they haven't yet submitted anything.
			disableElement(resetButton);
		}
	}
})

// This function will enable whatever button is passed in as a parameter, and it will update the CSS class appropriately
function enableElement(elementToEnable) {
	elementToEnable.disabled = false;
}

// This function will disable whatever button is passed in as a parameter, and it will update the CSS class appropriately
function disableElement(elementToDisable) {
	elementToDisable.disabled = true;
}

// Reset the application interface to zero state
function setZeroState() {
	disableElement(clearButton);
	disableElement(resetButton);
	enableElement(minRangeValue);
	enableElement(maxRangeValue);
	usersLastGuess = null;
	randomNumber = null;
	minRangeValue.value = '1';
	maxRangeValue.value = '100';
	guessMessageTop.innerText = "";
	guessValue.innerText = '?';
	guessValue.classList.add('guessValue');
	guessValue.classList.remove('boom');
	guessMessageBottom.innerText = '';
	errorMessages.innerText = '';
}

// Function to generate a random number and assign it to a global variable
function getRandomNumber() {
	var min = minRangeValue.value;
	var max = maxRangeValue.value;
	min = Math.ceil(min);
	max = Math.floor(max);
	randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	if (debug) {
		console.log('New random number generation.' +
			'\nMin: ' + min + ', Max: ' + max +
			'\nRandom Number is now: ' + randomNumber);
	}
}

// Function to clear the guess input field and set focus to the input element
function clearInput() {
	guessInput.value = '';
	guessInput.focus();
	disableElement(clearButton);
	if (usersLastGuess == null) {
		// Also disable RESET, because they haven't yet submitted anything.
		disableElement(resetButton);
	}
}

// Function to evaluate the users guess compared to the current random number
function evaluateGuess() {
	if (debug) {
		console.log('Min: ' + minRangeValue.value + '\n' +
			'Max: ' + maxRangeValue.value + '\n' +
			'Random number: ' + randomNumber + '\n' +
			'User guess: ' + usersLastGuess);
	}
	// Disable the min and max ranges (only to be re-enabled on reset)
	disableElement(minRangeValue);
	disableElement(maxRangeValue);
	errorMessages.innerText = '';
	guessMessageTop.innerText = "Your last guess was";
	guessValue.innerText = usersLastGuess;
	guessValue.classList.add('guessValue');
	guessValue.classList.remove('boom');
	if (usersLastGuess > randomNumber) {
		guessMessageBottom.innerText = "That is too high";
	} else if (usersLastGuess < randomNumber) {
		guessMessageBottom.innerText = "That is too low";
	} else {
		guessMessageTop.innerText = "Lucky guess! Keep going..."
		guessMessageBottom.innerText = "But now we'll increase the range.";
		guessValue.innerText = '';
		guessValue.classList.add('boom');
		guessValue.classList.remove('guessValue');
		adjustMinMax();
		getRandomNumber();
	}
	clearInput();
}

// Function that will subtract 10 from the Min Range and add 10 to the Max Range, which should only happen when the user guesses the random number correctly.
function adjustMinMax() {
	minRangeValue.value = parseInt(minRangeValue.value, 10) - 10;
	maxRangeValue.value = parseInt(maxRangeValue.value, 10) + 10;
}
