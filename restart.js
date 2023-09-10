function checkRestart() {
  if (isR == true && isRDelay == true) {
    isRDelay = false
    restart()
  }
}

function restart() {
  isFalling = 0
  fallCounter = 0

  //BOARD
  board = Array.from(Array(10), () => new Array(30)) // x, y     (plansza)
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 10; x++) {
      board[x][y] = 0
    }
  }

  //TETROMINOS
  currentTetromino = 0
  tetrominoRotation = 0
  xTetromino = 3
  yTetromino = 1

  //LOCK DELAY
  lockDelay = 0
  counterOflockDelay = 0
  currentTetrominoTransparency = 1

  //KEYS
  isLeft = false
  isRight = false
  isUp = false
  isDown = false
  isZ = false
  isX = false
  isC = false
  isA = false

  //DELAYS
  isZDelay = true
  isXDelay = true
  isCDelay = true
  isADelay = true

  dropDelay = 0
  hardDropDelay = true

  //HOLD
  holdTetromino = -1
  isHold = true

  //MOVES
  delay = 0
  arrowsDirection = 0
  phase = 'DAS'

  //RANDOM 7
  random_random7()
  for (let i = 0; i < 7; i++) {
    tetrominoQueue[i] = random7[i]
  }
  random7_to_tetrominoQueue()
}
