## Synopsis

This is the Number Guesser game, for Module 1 of the Turing FEE program. And it's pretty awesome.
  ### Features
    * Users can enter a min/max range for the random number generation. This is helpful if you want a smaller range to reach a successful guess quicker.
    * Once an initial guess has been made, the min/max values are locked for the current game.
    * Users can keep guessing until they guess the correct number.
    * Once a correct guess has been made, the min range is decreased by 10 and the max range is increased by 10. This will allow the game to get progressively more difficult.
    * Users can reset the game and start over with a new range and a new generated random number.
    * Users can open the JavaScript console and set `debug = true`. This will turn on console logging so that users can see what is going on within the application.

  ### Known Issues
    * There is no error checking to validate that min range value is less than max range value.

  ### New requirements suggestions
    * Guess button should be disabled when the input field is empty, because guessing with no value doesn't really make sense. This wasn't in the requirements, but in a real world   scenario I would have asked the product owner about this.

  ### Things I would like to have completed
    * More refactoring. Plenty of this left to do, and I am not following the DRY rule as much as I would like.
    * Clean up unused CSS rules.
    * Make the min and max input fields flash once with the pink color when their values change automatically by -10 and +10, respectively to help inform the user that there was a change.

## Code Example

Not Applicable

## Motivation

My motivation for this was the wonderful instructors at Turing, and my awesome cohort peers. #1703ForLyfe

## Installation

Download the code and run it!

## API Reference

No API's were harmed in the making of this project.

## Tests

Tests? What are those?

## Contributors

Just me...Jason Collins, Cohort 1703

## License

Not Applicable
