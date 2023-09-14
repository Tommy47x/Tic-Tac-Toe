let clickCounter = 0; // Reset in-page
let currentPlayer = "X"; // We start with X 
const buttons = document.querySelectorAll('.btn-outline-primary'); // Constant for all buttons
const message = document.getElementById('message'); // Constant for in-page message (Last-Move + Winner)
let gameEnded = false; // Var for in-game progress (When = True game stops)

window.onload = createButton(); // Otherwise first clicks don't work

function createButton() {
    for (let i = 0; i < buttons.length; ++i) { // We activate the onClick function inside JS with this for
        buttons[i].addEventListener('click', function () { // The onClick function
            if (!gameEnded && this.textContent !== "X"
                && this.textContent !== "O") {
                if (clickCounter % 2 === 0) { // Algorithm for choosing the player (1 round, each)
                    currentPlayer = "X" // First we start with X (First move)
                } else {
                    currentPlayer = "O"; // Second move (O)
                }
                this.textContent = currentPlayer; // For Last-Move in: message
                message.textContent = "Last Move: " + currentPlayer; // Last-Move
                const winner = checkWinner(); // For the function declared down
                ++clickCounter; // For stopping the game if it's draw (9 moves in total)
                if (clickCounter === 9) { // Draw Algorithm
                    message.textContent = "It's a draw!"
                }
                if (winner) {
                    message.textContent = winner;
                    gameEnded = true;
                }
            }
        });
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const winConditions = { // Constant for win / loss condition
        "XXX": "X wins!",
        "OOO": "O wins!"
    };

    for (const combo of winningCombos) { // for every winning possibility
        const comboText = combo.map(index => buttons[index].textContent).join(''); // map for index of button
        if (winConditions[comboText]) { // 'join' up is for adding every letter to fit 'winConditions'.
            return winConditions[comboText]; // return result
        }
    }

}
