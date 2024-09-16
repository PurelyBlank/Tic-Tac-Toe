/**
 * Gameboard module pattern for Tic Tac Toe
 * Contains functionality of storing game state 
 * and marking players actions on board
 */
const gameBoard = function() {
    const row = 3
    const col = 3
    let board = []

    for (let i = 0; i < row; ++i) {
        board.push([])
        for (let j = 0; j < col; ++j) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board

    const dropToken = (player, position) => {
        if (board[position.row][position.col].getValue() === 0) {
            board[position.row][position.col].addToken(player)
            return true
        }
        return false
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell => cell.getValue())))
        console.log(boardWithCellValues)
    }

    return { getBoard, dropToken, printBoard }
}()


/**
 * Cell representing a tile on the Tic Tac Toe board
 * Stores which player is on that cell
 */
function Cell() {
    let value = 0
    let addToken = (player) => { value = player }
    let getValue = () => value

    return  { addToken, getValue }
}

/**
 * A module pattern for monitoring the games condition
 */
const gameController = function() {
    // get names from displayController to get user input
    const player1 = "player1"
    const player2 = "player2"

    let rounds = 0

    const players = [
        {
            name : player1,
            id : 1
        },
        {
            name : player2,
            id : 2
        }
    ]

    currentPlayer = players[0]
    
    const switchPlayer = () => { currentPlayer = players[0].id === currentPlayer.id ? players[1] : players[0] }
    const getCurrentPlayer = () => currentPlayer

    const haveWinner = (player) => {
        let board = gameBoard.getBoard();
        let playerName = player.name;
    
        // Function to check if all values in an array are equal to playerName
        const checkLine = (a, b, c) => a.getValue().name === playerName && 
                                       a.getValue().name === b.getValue().name && 
                                       b.getValue().name === c.getValue().name;
    
        return (
            checkLine(board[0][0], board[0][1], board[0][2]) || // Row 1
            checkLine(board[1][0], board[1][1], board[1][2]) || // Row 2
            checkLine(board[2][0], board[2][1], board[2][2]) || // Row 3
    
            checkLine(board[0][0], board[1][0], board[2][0]) || // Column 1
            checkLine(board[0][1], board[1][1], board[2][1]) || // Column 2
            checkLine(board[0][2], board[1][2], board[2][2]) || // Column 3
    
            checkLine(board[0][0], board[1][1], board[2][2]) || // Diagonal 1
            checkLine(board[0][2], board[1][1], board[2][0])    // Diagonal 2
        );
    }
    
    const printRound = () => {
        gameBoard.printBoard()
        console.log(`${getCurrentPlayer().name}'s turn.`)
    }

    const playRound = (position) => {
        ++rounds
        if (rounds === 9) {
            console.log("Tie!")
            return
        }
        
        console.log(`${getCurrentPlayer().name}'s turn placed token on row: ${position.row}, col: ${position.col}`)
        let state = gameBoard.dropToken(getCurrentPlayer(), position)
        // player placed token in a marked cell
        if (!state) { 
            console.log("Oh no, the tile has already been marked! Please try again!")    
            return
        }
        if (haveWinner(getCurrentPlayer())) {
            console.log(`${getCurrentPlayer().name} has won!`)
            return
        }

        switchPlayer()
        printRound()
    }

    printRound()

    return { playRound, getCurrentPlayer, haveWinner }
}()

/**
 * Responsible for rendering and functionality of game
 */
const displayController = function() {
    const cells = document.querySelectorAll(".board--cell")
    cells.forEach((elem) => elem.addEventListener("click", (event) => {
        let board_id = event.target.id
        let row = board_id / 3
        let col = row % 3
    }))
}()