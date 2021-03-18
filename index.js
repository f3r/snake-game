const apple = {
  x: 0,
  y: 19
}

const snake = {
  x: 10,
  y: 5,
  dir: 2,     // 0=up, 1=right, 2=down, 3=left
  length: 1,  // number of blocks
  speed: 1000 // ms
}

// BOARD STATES // 0-empty, 1-snake, 2-apple
const board = new Array(20).fill(null).map(e => new Array(20).fill(0));
board[snake.y][snake.x] = 1
board[apple.y][apple.x] = 2

function printBoard() {
  board.forEach((row, r) => {
    row.forEach((col, c) => {
      if (board[r][c] === 1) {
        const elem = document.querySelector(`.row${r + 1}>.col${c + 1}`)
        elem.classList.add('snake')
      }
      if (board[r][c] === 2) {
        const elem = document.querySelector(`.row${r + 1}>.col${c + 1}`)
        elem.classList.add('apple')
      }
    })
  })
}



function animate() {
  // clean Board
  // new Position of snake
  // print Board
  printBoard()
}

printBoard()
