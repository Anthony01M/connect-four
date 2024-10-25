const rows = 6;
const cols = 7;
let currentPlayer = 1;
let gameBoard = Array(rows).fill(null).map(() => Array(cols).fill(0));

const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset');

function createGrid() {
    grid.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col, 10);
    for (let r = rows - 1; r >= 0; r--) {
        if (gameBoard[r][col] === 0) {
            gameBoard[r][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${col}']`);
            cell.classList.add(`player${currentPlayer}`);
            if (checkWin(r, col)) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isDraw()) {
                alert("It's a draw!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
            }
            break;
        }
    }
}

function isDraw() {
    return gameBoard.every(row => row.every(cell => cell !== 0));
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal /
           checkDirection(row, col, 1, -1);  // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            console.log(`Checking cell (${r}, ${c})`);
            console.log("GameBoard", gameBoard);
            console.log("GameBoard[r]", gameBoard[r]);
            console.log("GameBoard[r][c]", gameBoard[r][c]);
            console.log("Player", currentPlayer);
            if (gameBoard[r][c] === currentPlayer) {
                count++;
                console.log(`Count for player ${currentPlayer}: ${count}`);
                if (count === 4) return true;
            } else {
                count = 0;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function resetGame() {
    gameBoard = Array(rows).fill(null).map(() => Array(cols).fill(0));
    currentPlayer = 1;
    createGrid();
}

resetButton.addEventListener('click', resetGame);

createGrid();

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});