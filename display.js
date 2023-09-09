//---CANVAS---
let BS = (blockSize = 30) // px  (numer % 2)

const canvas = document.getElementById('tetrisCanvas')
const ctx = canvas.getContext('2d')

let extraHeight = BS * 3
canvas.width = BS * 20
canvas.height = BS * 20 + extraHeight

//---BOARD---
let board = Array.from(Array(10), () => new Array(30)) // x, y     (plansza)
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 10; x++) {
    board[x][y] = 0
  }
}

//---BOARD---
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBoard() {
  //BLOCKS 4x2
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  ctx.fillStyle = 'rgb(0, 0, 0)'

  hold_4x2(0, 0, holdTetromino)

  block_4x2(16, 0, 0)
  block_4x2(16, 3, 1)
  block_4x2(16, 6, 2)
  block_4x2(16, 9, 3)
  block_4x2(16, 12, 4)

  //BOARD
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 10; x++) {
      let square = board[x][y]

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1

      if (square == 0) {
        // nic
        ctx.fillStyle = 'rgb(0, 0, 0)'
      } else if (square == 1) {
        // aktualny spadający
        ctx.fillStyle = 'rgba(0, 255, 255, ' + transparency + ')'
      } else if (square == 2) {
        // cień spadania
        ctx.fillStyle = 'rgba(0, 255, 255, 0.1)'
      } else if (square > 2) {
        // klocki różne kolory
        ctx.fillStyle = 'rgb(255, 0, 0)'
      } else {
        ctx.fillStyle = 'rgb(0, 0, 0)'
      }

      if (y >= 10) {
        ctx.fillRect((5 + x) * BS, +(y - 10) * BS + extraHeight, BS, BS)
        ctx.strokeRect((5 + x) * BS, +(y - 10) * BS + extraHeight, BS, BS)
      } else if (y >= 7 && square != 0) {
        ctx.fillRect((5 + x) * BS, +(y - 10) * BS + extraHeight, BS, BS)
        ctx.strokeRect((5 + x) * BS, +(y - 10) * BS + extraHeight, BS, BS)
      }
    }
  }

  //SHADOW
  drawShadow()
}

//---BLOCKS 4x2---
function hold_4x2(x, y, tetromino) {
  for (let x2 = 0; x2 < 4; x2++) {
    for (let y2 = 0; y2 < 2; y2++) {
      if (tetromino != -1) {
        // first hold
        let square = blocks[tetromino][0][y2][x2]

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.lineWidth = 1
        if (square == 0) {
          ctx.fillStyle = 'rgb(0, 0, 0)'
        } else if (square == 1) {
          ctx.fillStyle = 'rgb(0, 255, 255)'
        }
      }
      ctx.fillRect((x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS)
      ctx.strokeRect((x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS)
    }
  }
}

function block_4x2(x, y, miejsce_w_kolejce) {
  for (let x2 = 0; x2 < 4; x2++) {
    for (let y2 = 0; y2 < 2; y2++) {
      let square = blocks[tetrominoQueue[miejsce_w_kolejce]][0][y2][x2]

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      if (square == 0) {
        ctx.fillStyle = 'rgb(0, 0, 0)'
      } else if (square == 1) {
        ctx.fillStyle = 'rgb(0, 255, 255)'
      }

      ctx.fillRect((x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS)
      ctx.strokeRect((x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS)
    }
  }
}

function placeTetromino() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (yTetromino + y < 30) {
        if (blocks[currentTetromino][tetrominoRotation][y][x] == 1) {
          board[xTetromino + x][yTetromino + y] = blocks[currentTetromino][tetrominoRotation][y][x]
        }
      }
    }
  }
}

function removeTetromino() {
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[x][y] == 1) {
        board[x][y] = 0
      }
    }
  }
}

function putTetromino() {
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[x][y] == 1) {
        board[x][y] = 3
      }
    }
  }
}

//---SHADOW---
function drawShadow() {
  removeShadow()
  for (let i = 1; i < 30; i++) {
    if (checkXY(0, i, tetrominoRotation) == false) {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          if (blocks[currentTetromino][tetrominoRotation][y][x] == 1) {
            if (board[xTetromino + x][yTetromino + y + (i - 1)] == 0) {
              //jesli ponizej jest jakis klocek
              board[xTetromino + x][yTetromino + y + (i - 1)] = 2
            }
          }
        }
      }
      break
    }
  }
}

function removeShadow() {
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[x][y] == 2) {
        board[x][y] = 0
      }
    }
  }
}
