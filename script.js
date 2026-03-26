const boardSize = 15;
let board = [];
let currentPlayer = "black";
let gameOver = false;

const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// 初始化棋盤
function initBoard() {
    board = [];
    boardElement.innerHTML = "";
    gameOver = false;
    currentPlayer = "black";
    statusText.textContent = "目前輪到：黑棋";

    for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) {
            board[row][col] = null;

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener("click", handleClick);

            boardElement.appendChild(cell);
        }
    }
}

// 點擊事件
function handleClick(e) {
    if (gameOver) return;

    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    if (board[row][col]) return;

    placePiece(e.target, row, col);

    if (checkWin(row, col)) {
        statusText.textContent = (currentPlayer === "black" ? "黑棋" : "白棋") + " 獲勝！";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "black" ? "white" : "black";
    statusText.textContent = "目前輪到：" + (currentPlayer === "black" ? "黑棋" : "白棋");
}

// 放置棋子
function placePiece(cell, row, col) {
    const piece = document.createElement("div");
    piece.classList.add("piece", currentPlayer);
    cell.appendChild(piece);
    board[row][col] = currentPlayer;
}

// 勝負判定
function checkWin(row, col) {
    row = parseInt(row);
    col = parseInt(col);

    return (
        count(row, col, 1, 0) + count(row, col, -1, 0) >= 4 || // 橫
        count(row, col, 0, 1) + count(row, col, 0, -1) >= 4 || // 直
        count(row, col, 1, 1) + count(row, col, -1, -1) >= 4 || // 斜 \
        count(row, col, 1, -1) + count(row, col, -1, 1) >= 4    // 斜 /
    );
}

// 計算連線
function count(row, col, dx, dy) {
    let r = row + dx;
    let c = col + dy;
    let total = 0;

    while (
        r >= 0 && r < boardSize &&
        c >= 0 && c < boardSize &&
        board[r][c] === currentPlayer
    ) {
        total++;
        r += dx;
        c += dy;
    }

    return total;
}

// 重新開始
restartBtn.addEventListener("click", initBoard);

// 啟動遊戲
initBoard();
