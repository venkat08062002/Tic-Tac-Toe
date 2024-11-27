const tiles = document.querySelectorAll(".tile");
const displayPlayer = document.querySelector(".display-player");
const announcer = document.querySelector(".announcer");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";  // Start with player X
let gameActive = true;  // Game is active
let gameState = ["", "", "", "", "", "", "", "", ""];  // Empty grid

// Function to handle tile click
function handleTileClick(index) {
    if (gameState[index] !== "" || !gameActive) return;  // Prevent click on already filled tile

    // Mark the tile with current player's symbol
    gameState[index] = currentPlayer;
    tiles[index].textContent = currentPlayer;

    // Check for winner or tie
    checkWinner();
}

// Function to check for a winner or a tie
function checkWinner() {
    // Possible winning combinations (index positions)
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check each winning pattern
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            announceWinner(currentPlayer);
            return;
        }
    }

    // Check for tie (no more empty tiles)
    if (!gameState.includes("")) {
        announceTie();
    }

    // If no winner, switch player
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    displayPlayer.textContent = currentPlayer === "X" ? "X" : "0";
}

// Function to announce the winner
function announceWinner(player) {
    gameActive = false;  // Stop the game
    announcer.textContent = `${player} wins!`;
    announcer.classList.remove("hide");
}

// Function to announce a tie
function announceTie() {
    gameActive = false;
    announcer.textContent = "It's a tie!";
    announcer.classList.remove("hide");
}

// Function to reset the game
function resetGame() {
    window.location="index.html"
}

// Add event listeners to each tile
tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => handleTileClick(index));
});

// Add event listener to reset button
resetButton.addEventListener("click", resetGame);
