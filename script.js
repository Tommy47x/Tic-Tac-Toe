let clickCounter = 0; // Reset in-page
let currentPlayer = "X"; // We start with X 
const buttons = document.querySelectorAll('.btn-outline-primary'); // Constant for all buttons
const message = document.getElementById('message'); // Constant for in-page message (Last-Move + Winner)
let gameEnded = false; // Var for in-game progress (When = True game stops)

for (let i = 0; i < buttons.length; i++) { // We activate the onClick function inside JS with this for
    buttons[i].addEventListener('click', function () { // The onClick function
        if (!gameEnded && this.textContent !== "X" && this.textContent !== "O") {
            if (clickCounter % 2 === 0) { // Algorithm for choosing the player (1 round, each)
                currentPlayer = "X" // First we start with X (First move)
            } else {
                currentPlayer = "O"; // Second move (O)
            }
            this.textContent = currentPlayer; // For Last-Move in: message
            clickCounter++; // For stopping the game if it's draw (9 moves in total)
            message.textContent = "Last: " + currentPlayer; // Last-Move
            const winner = checkWinner(); // For the function declared down
            if (winner) {
                message.textContent = winner;
                gameEnded = true;

            }
        }
    });
}

function checkWinner() { // Function that checks all the posibilities of winning
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) { // Algorithm for choosing the winner
        const [a, b, c] = combo;
        if (buttons[a].textContent === "X" && buttons[b].textContent === "X" && buttons[c].textContent === "X") {
            return "X wins!"; // 3 moves correctly = Win for X
        } else if (buttons[a].textContent === "O" && buttons[b].textContent === "O" && buttons[c].textContent === "O") {
            return "O wins!";// 3 moves correctly = Win for O
        }
    }
    if (clickCounter === 9) { // Draw algorithm based on the number of total moves
        return "It's a draw!";
    }

    return null;
}
