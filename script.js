/* Factory and IIFE (instantly invoked function expression) ticTacToe */
const ticTacToe = (function () {
    let board = [ /* private */
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"] 
    ]
    let currentPlayer = "X"; /* private */
    let player1Wins = 0;
    let player2Wins = 0;

    /* Public functions */

    function resetGame(){
        board = [ /* private */
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"] 
        ]
        currentPlayer = "X";
    }

    /* Appends board with some | to show a grid in the webpage */
    function printBoard() {
        let gameBoard = document.querySelector(".gameBoard");
        //gameBoard.innerHTML = "";
        board.forEach(row => {
            const rowDiv = document.createElement("div"); 
            rowDiv.textContent = row.join(" | "); 
            //gameBoard.appendChild(rowDiv); 
        });
    }

    /* Marks cells in the board based on row and col given, returns true if winning condition achieved with the move */
    function makeMove(row, col){
        const retryButton = document.createElement('button');
        const makeMoveButton = document.querySelector('#submitMove');
        const player1ScoreLabel = document.querySelector('.player1Score');
        const player2ScoreLabel = document.querySelector('.player2Score');

        if(board[row][col] === "_"){
            board[row][col] = currentPlayer;
            printBoard()
            if(checkWin()){
                alert(`${currentPlayer} wins!`);
                if(currentPlayer === 'X'){
                    player1Wins++;
                    player1ScoreLabel.textContent = player1ScoreLabel.textContent.slice(0, -1) + player1Wins;
                } else {
                    player2Wins++;
                    player2ScoreLabel.textContent = player2ScoreLabel.textContent.slice(0, -1) + player2Wins;
                }

                retryButton.textContent = "Play another";
                retryButton.addEventListener('click', () => {
                    resetGame();
                    const cells = document.querySelectorAll('.cell');
                    cells.forEach((cell) => {
                        cell.textContent = "";
                    })
                    retryButton.remove();
                })

                document.body.appendChild(retryButton);
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
    return { printBoard, makeMove, checkWin, getCurrentPlayer: () => currentPlayer } /* makes the functions publically available, since board and currentPlayer aren't included, they are closed off (example of closure) and made private */
})();

const playGame = (function () {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            const cellID = e.target.id;
            let row, col;
            switch(cellID){
                case 'cell-1':
                    row = 0;
                    col = 0;
                    break;
                case 'cell-2':
                    row = 0;
                    col = 1;
                    break;
                case 'cell-3':
                    row = 0;
                    col = 2;
                    break;
                case 'cell-4':
                    row = 1;
                    col = 0;
                    break;
                case 'cell-5':
                    row = 1;
                    col = 1;
                    break;
                case 'cell-6':
                    row = 1;
                    col = 2;
                    break;
                case 'cell-7':
                    row = 2;
                    col = 0;
                    break;
                case 'cell-8':
                    row = 2;
                    col = 1;
                    break;
                case 'cell-9':
                    row = 2;
                    col = 2;
                    break;
            }
            if(row !== undefined && col !== undefined){
                e.target.textContent = ticTacToe.getCurrentPlayer();
                const gameOver = ticTacToe.makeMove(row,col);
                
                if(gameOver){
                    cells.forEach(cell => cell.removeEventListener("click", () => {}));
                }
            }
        })
    })
})();


