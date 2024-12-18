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
        printBoard();
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
                retryButton.style.position = "fixed"
                retryButton.style.top = "50%";        
                retryButton.style.left = "50%";    
                retryButton.style.transform = "translate(-50%, -50%)"; 
                retryButton.addEventListener('click', () => {
                    resetGame();
                    makeMoveButton.disabled = false;
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
    return { printBoard, makeMove, checkWin } /* makes the functions publically available, since board and currentPlayer aren't included, they are closed off (example of closure) and made private */
})();

// const runGame = (function () {
//     ticTacToe.printBoard();
//     document.querySelector("#submitMove").addEventListener("click", () => {
//         ticTacToe.printBoard();
//         const row = parseInt(document.querySelector("#rowInput").value, 10);
//         const col = parseInt(document.querySelector("#colInput").value, 10);
    
//         if (!isNaN(row) && !isNaN(col) && row >= 0 && row <= 2 && col >= 0 && col <= 2) {
//             const gameOver = ticTacToe.makeMove(row, col);
//             if (gameOver) {
//                 document.querySelector("#submitMove").disabled = true; 
//             }
//         } else {
//             alert("Please enter valid row and column values (0-2).");
//         }
//     });
// })();

const playGame = (function () {
    ticTacToe.printBoard();

    var gameOver;
    const cells = document.querySelector(".cell");
    cells.addEventListener('click', (e) => {
        const cellID = e.target.id;
        switch(cellID){
            case 'cell-1':
                gameOver = ticTacToe.makeMove(0,0);
                break;
            case 'cell-2':
                gameOver = ticTacToe.makeMove(0,1);
                break;
            case 'cell-3':
                gameOver = ticTacToe.makeMove(0,3);
                break;
            case 'cell-4':
                gameOver = ticTacToe.makeMove(1,0);
                break;
            case 'cell-5':
                gameOver = ticTacToe.makeMove(1,1);
                break;
            case 'cell-6':
                gameOver = ticTacToe.makeMove(1,2);
                break;
            case 'cell-7':
                gameOver = ticTacToe.makeMove(2,0);
                break;
            case 'cell-8':
                gameOver = ticTacToe.makeMove(2,1);
                break;
            case 'cell-9':
                gameOver = ticTacToe.makeMove(2,2);
                break;
        }
        if(gameOver){
            document.querySelector("#submitMove").disabled = true; 
        }
    })


})();


