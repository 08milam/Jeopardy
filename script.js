// PORJECT NAME: jeopardy
// FILE: script.js
// DATE:
// MOD DATE:
// MOD CHANGES:
// MOD LINE:
// VERSION: 0.0.1
// PROGRAMER: Charles Matthew Milam Jr

//*****************************************************************************function test() {
// creates a randome number for id
// script.js
function getRandomNumber(min, max, exclude) {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(randomNum));
  return randomNum;
}

let minRange = 1;
let maxRange = 19;
let excludedNumbers = [1, 5, 7, 19, 16];
let numberOfRandomNumbers = 6;
let randomNumbers = new Set();

function startGame() {
  // Reset game state
  randomNumbers.clear();

  while (randomNumbers.size < numberOfRandomNumbers) {
    const num = getRandomNumber(minRange, maxRange, excludedNumbers);
    randomNumbers.add(num);
  }

  // Convert the set to an array if needed
  const resultArray = Array.from(randomNumbers);

  const urls = resultArray.map(
    (id) => `https://rithm-jeopardy.herokuapp.com/api/category?id=${id}`
  );

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function displayCategories() {
    const categoryRow = document.getElementById("categoryrow");
    const clueBoard = document.getElementById("clueboard");

    categoryRow.innerHTML = ""; // Clear previous categories
    clueBoard.innerHTML = ""; // Clear previous clues

    for (let url of urls) {
      const data = await fetchData(url);
      const category = document.createElement("div");
      category.textContent = data.title;
      category.classList.add("category");
      categoryRow.appendChild(category);

      const clues = data.clues;
      for (let clue of clues) {
        const clueDiv = document.createElement("div");
        clueDiv.classList.add("clue");

        // Create elements for question and answer
        const questionDiv = document.createElement("div");
        questionDiv.textContent = clue.value;
        const answerDiv = document.createElement("div");
        answerDiv.textContent = clue.question;
        answerDiv.style.display = "none"; // Initially hide the answer

        // Create "Show Answer" button
        const showAnswerButton = document.createElement("button");
        showAnswerButton.textContent = "Show Answer";
        showAnswerButton.style.display = "none"; // Initially hide the button

        // Event listener to toggle between question and answer
        clueDiv.addEventListener("click", () => {
          if (!clueDiv.classList.contains("answered")) {
            questionDiv.style.display = "none"; // Hide question
            answerDiv.style.display = "block"; // Show answer
            clueDiv.classList.add("answered");
            showAnswerButton.style.display = "block"; // Show the button
            // Update score
            const score = document.getElementById("score");
            score.textContent = parseInt(score.textContent) + clue.value;
          }
        });

        // Event listener to show answer when button is clicked
        showAnswerButton.addEventListener("click", () => {
          answerDiv.style.display = "block"; // Show answer
          showAnswerButton.style.display = "none"; // Hide the button
        });

        // Append question, answer, and button to clue div
        clueDiv.appendChild(questionDiv);
        clueDiv.appendChild(answerDiv);
        clueDiv.appendChild(showAnswerButton);
        showAnswerButton.addEventListener("click", () => {
          // Display the answer in a popup
          window.alert(clue.answer);
        });
        clueBoard.appendChild(clueDiv);
      }
    }
  }

  // Start the game
  displayCategories();
}

document.getElementById("startgame").addEventListener("click", startGame);
