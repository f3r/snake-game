const size = 20

const apple = {
  x: 0,
  y: 19
}

const snake = {
  x: 11,
  y: 5,
  dir: 2,     // 0=up, 1=right, 2=down, 3=left
  length: 1,  // number of blocks
  speed: 100 // ms
}

// BOARD STATES // 0-empty, 1-snake, 2-apple
var board = new Array(20).fill(null).map(e => new Array(20).fill(0));


function printBoard() {
  board.forEach((row, r) => {
    row.forEach((col, c) => {

      const elem = document.querySelector(`.row${r + 1}>.col${c + 1}`)
      elem.classList.remove('snake')
      elem.classList.remove('apple')

      if (board[r][c] === 1) { elem.classList.add('snake') }
      if (board[r][c] === 2) { elem.classList.add('apple') }
    })
  })
}

function cleanBoard() {
  delete board;
  board = new Array(20).fill(null).map(e => new Array(20).fill(0));
}

function moveSnake() {
  // snake.dir ==> 0=up, 1=right, 2=down, 3=left
  if (snake.dir===0) { snake.y = snake.y === 0 ? size-1 : snake.y-1 }
  if (snake.dir===1) { snake.x = snake.x === size-1 ? 0 : snake.x+1 }
  if (snake.dir===2) { snake.y = snake.y === size-1 ? 0 : snake.y+1 }
  if (snake.dir===3) { snake.x = snake.x === 0 ? size-1 : snake.x-1 }
}

function newPosition() {
  moveSnake()
  board[snake.y][snake.x] = 1
  board[apple.y][apple.x] = 2
}

function animate() {
  cleanBoard()
  newPosition()
  printBoard()
}

//setInterval(animate, snake.speed)
document.addEventListener('keyup', function (event) {
  if (event.code === 'ArrowUp')    { snake.dir = 0 }
  if (event.code === 'ArrowRight') { snake.dir = 1 }
  if (event.code === 'ArrowDown')  { snake.dir = 2 }
  if (event.code === 'ArrowLeft')  { snake.dir = 3 }
})
