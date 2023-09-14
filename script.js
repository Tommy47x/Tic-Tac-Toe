let clickCounter = 0; // Reset in-page
let currentPlayer = "X"; // We start with X 
const buttons = document.querySelectorAll('.btn-outline-primary'); // Constant for all buttons
const message = document.getElementById('message'); // Constant for in-page message (Last-Move + Winner)
let gameEnded = false; // Var for in-game progress (When = True game stops)

window.onload = createButtons(); // Webpage directly loads function so the first moves ain't bugged


function createButtons() { // Separate function for the logic
    for (let i = 0; i < buttons.length; ++i) { // That happens 'onButtonClick'
        buttons[i].addEventListener('click', onButtonClick);
    }
}

function onButtonClick() { // Algorithm for pressing buttons
    if (!gameEnded && this.textContent !== "X" && this.textContent !== "O") { // Restrictions for buttons
        if (clickCounter % 2 === 0) { // Player 1
            currentPlayer = "X";
        } else { // Player 2
            currentPlayer = "O";
        }
        this.textContent = currentPlayer;
        message.textContent = "Last Move: " + currentPlayer;
        const winner = checkWinner();
        ++clickCounter;
        if (clickCounter === 9) {
            message.textContent = "It's a draw!";
        }
        if (winner) {
            message.textContent = winner;
            gameEnded = true;
        }
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
