const sounds = {
  appleEat: new Audio('./sounds/apple-eat.wav')
}

const size = 20
var points = 0

const apple = {
  x: Math.floor(Math.random()*19),
  y: Math.floor(Math.random()*19)
}

const snake = {
  pos: [
    { x: 10, y: 10, }
  ],
  dir: 2,     // 0=up, 1=right, 2=down, 3=left
  length: 1,  // number of blocks
  speed: 400 // ms
}

// BOARD STATES // 0-empty, 1-snake, 2-apple
var board = new Array(20).fill(null).map(e => new Array(20).fill(0));


function printBoard() {
  board.forEach((row, r) => {
    row.forEach((col, c) => {

      const elem = document.querySelector(`.row${r + 1}>.col${c + 1}`)
      elem.classList.remove('snake')
      elem.classList.remove('snake-power')
      elem.classList.remove('apple')

      if (board[r][c] === 1) { elem.classList.add('snake') }
      if (board[r][c] === 2) { elem.classList.add('apple') }
      if (board[r][c] === 3) { elem.classList.add('snake-power') }
    })
  })
}

function cleanBoard() {
  delete board;
  board = new Array(20).fill(null).map(e => new Array(20).fill(0));
}

function moveSnake() {
  // snake.dir ==> 0=up, 1=right, 2=down, 3=left
  const newSnake = { x: snake.pos[0].x, y: snake.pos[0].y }

  if (snake.dir===0) { newSnake.y = snake.pos[0].y === 0 ? size-1 : snake.pos[0].y-1 }
  if (snake.dir===1) { newSnake.x = snake.pos[0].x === size-1 ? 0 : snake.pos[0].x+1 }
  if (snake.dir===2) { newSnake.y = snake.pos[0].y === size-1 ? 0 : snake.pos[0].y+1 }
  if (snake.dir===3) { newSnake.x = snake.pos[0].x === 0 ? size - 1 : snake.pos[0].x - 1 }
  snake.pos.unshift(newSnake)
  snake.pos.pop()
}

function newApplePosition() {
  do {
    apple.x = Math.floor(Math.random()*19)
    apple.y = Math.floor(Math.random()*19)
  } while (Math.abs(snake.x-apple.x) < 5 || Math.abs(snake.y-apple.y) < 5)
}

function makeFaster() {
  clearInterval(timerId)
  if (snake.speed > 50) {
    snake.speed = Math.round(snake.speed * 0.9)
  }
  timerId = setInterval(animate, snake.speed)
}

function snakeGrows() {
  snake.pos.push({x: snake.pos[0].x, y: snake.pos[0].y})
}

function increasePoints() {
  points += 100
  document.getElementById('points').innerText = points
}

function checkEat() {
  if (snake.pos[0].x === apple.x && snake.pos[0].y === apple.y) {
    newApplePosition()
    snakeGrows()
    increasePoints()
    makeFaster()
    sounds.appleEat.play()
  }
}

function newPosition() {
  moveSnake()
  checkEat()
  snake.pos.forEach((pos,idx) => {
    board[pos.y][pos.x] = idx === 0 ? 3 : 1
  })
  board[apple.y][apple.x] = 2
}

function animate() {
  cleanBoard()
  newPosition()
  printBoard()
}

var timerId = setInterval(animate, snake.speed)

document.addEventListener('keyup', function (event) {
  if (event.code === 'ArrowUp')    { snake.dir = 0 }
  if (event.code === 'ArrowRight') { snake.dir = 1 }
  if (event.code === 'ArrowDown')  { snake.dir = 2 }
  if (event.code === 'ArrowLeft')  { snake.dir = 3 }
})
