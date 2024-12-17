/* Factory and IIFE (instantly invoked function expression) ticTacToe */
const ticTacToe = (function () {
    let board = [ /* private */
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"] 
    ]
    let currentPlayer = "X"; /* private */

    /* Public functions */

    /* Appends board with some | to show a grid in the webpage */
    function printBoard() {
        let gameBoard = document.querySelector(".gameBoard");
        gameBoard.innerHTML = "";
        board.forEach(row => {
            const rowDiv = document.createElement("div"); 
            rowDiv.textContent = row.join(" | "); 
            gameBoard.appendChild(rowDiv); 
        });
    }

    /* Marks cells in the board based on row and col given, returns true if winning condition achieved with the move */
    function makeMove(row, col){
        if(board[row][col] === "_"){
            board[row][col] = currentPlayer;
            printBoard()
            if(checkWin()){
                alert(`${currentPlayer} wins!`);
                return true;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X"; /* Flips the player */
            return false;
        } else {
            console.log("Invalid move");
            return false;
        }
    }

    /* Checks if there are any winning conditions in the board's current state */
    function checkWin() {
        const winningLines = [
            ...board, /* the rows */
            [board[0][0], board[1][0], board[2][0]], /* 1st column */
            [board[0][1], board[1][1], board[2][1]], /* 2nd column */
            [board[0][2], board[1][2], board[2][2]], /* 3rd column */
            [board[0][0], board[1][1], board[2][2]],  /* diagonal "\" */
            [board[0][2], board[1][1], board[2][0]] /* diagonal "/" */
        ];
        return winningLines.some(line => line.every(cell => cell === currentPlayer)); /* checks if there is atleast one winning line with all the cells filled by one player */
    }
    return { printBoard, makeMove, checkWin } /* makes the functions publically available, since board and currentPlayer aren't included, they are closed off (example of closure) and made private */
})();

const runGame = (function () {
    ticTacToe.printBoard();
    document.querySelector("#submitMove").addEventListener("click", () => {
        ticTacToe.printBoard();
        const row = parseInt(document.querySelector("#rowInput").value, 10);
        const col = parseInt(document.querySelector("#colInput").value, 10);
    
        if (!isNaN(row) && !isNaN(col) && row >= 0 && row <= 2 && col >= 0 && col <= 2) {
            const gameOver = ticTacToe.makeMove(row, col);
            if (gameOver) {
                document.querySelector("#submitMove").disabled = true; 
            }
        } else {
            alert("Please enter valid row and column values (0-2).");
        }
    });
})();


