// Dark Mode Toggle
const toggleButton = document.querySelector(".ui-switch input");

toggleButton.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
// Winning Patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 6],
  [0, 4, 8],
  [2, 5, 8],
];

// Game Script
let oTurn = true; // Use boolean instead of string
let gameCards = document.querySelectorAll(".card");
const rootStyles = getComputedStyle(document.documentElement);
let playerMove = 0;
gameCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // If Card Clicked Again
    if (card.style.cursor === "not-allowed") {
      alert("This card is already disabled!");
      return;
    }
    // Players Turn
    if (oTurn) {
      card.style.cursor = "not-allowed";
      card.innerText = "O";
      oTurn = false;
      card.style.background = `var(--o-bg-color)`; // Use CSS variable
    } else if (!oTurn) {
      card.style.cursor = "not-allowed";
      card.innerText = "X";
      oTurn = true;
      card.style.background = `var(--x-bg-color)`; // Use CSS variable
    }
    // checking player count
    if (playerMove === 8) {
      alert("draw");
      gameReset();

    } else {
      checkWinner();
    }
    playerMove++;
  });
  //   Disabling Cards
  const stopGame = () => {
    for (let card of gameCards) {
      card.disabled = true;
      card.style.cursor = "not-allowed";
    }
  };
  //   Enabling Cards
  const startGame = () => {
    for (let card of gameCards) {
      card.disabled = false;
      card.innerText = "";
      card.style.background = `var(--card-bg)`;
      card.style.cursor = "pointer";
    }
  };

  //   Fucntion for Checking Winner
  const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1 = gameCards[pattern[0]].innerText;
      let pos2 = gameCards[pattern[1]].innerText;
      let pos3 = gameCards[pattern[2]].innerText;
      if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
        if (pos1 === pos2 && pos2 === pos3) {
          console.log(pos1, pos2, pos3);
          stopGame();
        }
      }
    }
  };
  //Reset Game
  const gameReset = () => {
    oTurn = false;
    startGame();
  };
  let resetBtn = document.querySelector(".btn");
  resetBtn.addEventListener("click", gameReset);
});
