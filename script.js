const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const cells = document.querySelectorAll(".cell");
//randomising the word selection to remove redundancy
const targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

let attempt = 0;
//check the user input
function checkGuess() {
//setting input to uppercase for easy matching
  const guess = guessInput.value.trim().toUpperCase();
//check input length
  if (guess.length !== 5 || !isNaN(guess)) {
    message.innerText = "Please enter a 5-letter word.";
    return;
  }

  message.innerText = "";
//split used to split into a char array
  const guessArr = guess.split("");
  //target word split into char array as well for matching
  const targetArr = targetWord.split("");
  //intially all matching absent
  const results = ["absent", "absent", "absent", "absent", "absent"];

  const freq = {};
  //no of time a character appear to remove duplicates, error found during testing
  targetArr.forEach((char) => {
    freq[char] = (freq[char] || 0) + 1;
  });
  //matching character to character for the input and target word 
  guessArr.forEach((char, i) => {
    if (char === targetArr[i]) {
      results[i] = "correct";
      freq[char]--;
    }
  });

  guessArr.forEach((char, i) => {
    if (results[i] !== "correct") {
      if (freq[char] && freq[char] > 0) {
        results[i] = "present";
        freq[char]--;
      }
    }
  });
  //movingg to the next grid and adding the result to the current grid with results
  const startIndex = attempt * 5;
  guessArr.forEach((char, i) => {
    const cell = cells[startIndex + i];
    cell.innerText = char;
    cell.classList.add(results[i]);
  });

  guessInput.value = "";

  if (guess === targetWord) {
    message.innerText = "You guessed the word";
    guessInput.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  attempt++;
  //game over condition if attempts exhausted
  if (attempt === 6) {
    message.innerText = 'Game over, the word was "' + targetWord + '"';
    guessInput.disabled = true;
    submitBtn.disabled = true;
  }
}

submitBtn.addEventListener("click", checkGuess);
//handling if user presser enter instead of clicking the submit button
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});