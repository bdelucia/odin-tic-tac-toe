const ticTacToe = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""] 
    ]
    let currentPlayer = "X";

    function printBoard() {
        console.log(board.map(row => row.join(" | ")).join("\n------\n"));
    }

    function makeMove(row, col){
        if(board[row][col] === ""){
            board[row][col] = currentPlayer;
            if(checkWin()){
                console.log(`${currentPlayer} wins!`);
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        } else {
            console.log("Invalid move")
        }
    }

    function checkWin() {
        const winningLines = [
            ...board,
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];
        return winningLines.some(line => line.every(cell => cell === currentPlayer));
    }

    return { printBoard, makeMove }
})();

ticTacToe.printBoard();
ticTacToe.makeMove(0, 0); // X
ticTacToe.printBoard();
ticTacToe.makeMove(0, 1); // O
ticTacToe.printBoard();
ticTacToe.makeMove(1, 1);
ticTacToe.printBoard();
ticTacToe.makeMove(0, 2);
ticTacToe.printBoard();
ticTacToe.makeMove(2, 2);
ticTacToe.printBoard();