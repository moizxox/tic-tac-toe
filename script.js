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
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Game Script
let oTurn = true;
let gameCards = document.querySelectorAll(".card");
let playerMove = 0;

// Initialize game state
const initializeGame = () => {
  oTurn = true;
  playerMove = 0;
  gameCards.forEach((card) => {
    card.innerText = "";
    card.style.background = `var(--card-bg)`;
    card.style.cursor = "pointer";
    card.style.pointerEvents = "auto";
  });
};

// Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = gameCards[pattern[0]].innerText;
    let pos2 = gameCards[pattern[1]].innerText;
    let pos3 = gameCards[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      alert(`Player ${pos1} wins!`);
      initializeGame();
      return true;
    }
  }
  return false;
};

// Handle game draw
const checkDraw = () => {
  if (playerMove === 9) {
    alert("It's a draw!");
    initializeGame();
    return true;
  }
  return false;
};

// Reset game
const gameReset = () => {
  initializeGame();
};

// Event listeners
const resetBtn = document.querySelector(".btn");
resetBtn.addEventListener("click", gameReset);

gameCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.style.pointerEvents === "none") {
      return;
    }

    card.innerText = oTurn ? "O" : "X";
    card.style.background = oTurn ? `var(--o-bg-color)` : `var(--x-bg-color)`;
    card.style.pointerEvents = "none";

    oTurn = !oTurn;
    playerMove++;

    if (checkWinner()) return;
    if (checkDraw()) return;
  });
});

// Initialize the game
initializeGame();
