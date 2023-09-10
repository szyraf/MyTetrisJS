//---SETTINGS---
const frameRate = 60

let Pause = false

let Speed = 1

let isFalling = 0
let fallCounter = 0

let notPutBlocks = false

//---LOCK DELAY---
let lockDelay = 0
let counterOflockDelay = 0
let currentTetrominoTransparency = 1

let dropDelay = 0
let hardDropDelay = true

//---HOLD---
let holdTetromino = -1
let isHold = true

//---MOVES---
let DAS = 7.5 // 125ms
let ARR = 0 // 0ms
let SDF = 40
let delay = 0
let arrowsDirection = 0 // -1 = lewo
//  1 = prawo
//  0 = nigdzie
let phase = 'DAS' // DAS ARR

//---FRAME---
function frame() {
  // console.time('frame')
  //Główna funkcja
  //SETUP
  setup()

  //MOVES
  if (Pause == false) {
    clearCanvas()

    if (isFalling == 0) {
      createNewTetromino()
      isFalling = 1
      fallCounter = 0
      counterOflockDelay = 0
      isHold = true
      checkLineClear()
    } else {
      keys()

      if (checkXY(0, 1, tetrominoRotation) == false) {
        fallCounter = 0
        lockDelay++
        currentTetrominoTransparency -= 1 / 30.0
        if (lockDelay >= 30 || counterOflockDelay === 15) {
          lockDelay = 0
          oneDown(false)
        }
      } else {
        lockDelay = 0
        currentTetrominoTransparency = 1
        fallCounter++
        if (fallCounter >= 60 / Speed) {
          // 60fps
          oneDown(false)
          fallCounter = 0
        }
      }
    }
  }

  //RENDER
  drawBoard()

  //RESTART
  checkRestart()

  // console.timeEnd('frame')
}

//---MOVES---
function keys() {
  hold()
  moveLeftRight()
  rotation()
  softDrop()
  hardDrop()
}

function hold() {
  if (isC == true && isCDelay == true && isHold == true) {
    isHold = false
    isCDelay = false

    removeTetromino()

    if (holdTetromino == -1) {
      // first hold
      holdTetromino = currentTetromino
      createNewTetromino()
      isFalling = 1
      fallCounter = 0
      counterOflockDelay = 0
    } else {
      let tmp = holdTetromino
      holdTetromino = currentTetromino
      currentTetromino = tmp

      tetrominoRotation = 0
      xTetromino = 3
      yTetromino = 7
      placeTetromino()

      isFalling = 1
      fallCounter = 0
      counterOflockDelay = 0
    }
  }
}

function moveLeftRight() {
  if (isRight == true) {
    if (arrowsDirection != 1) {
      moveRight()
      phase = 'DAS'
    }
    for (let i = 0; i < 50; i++) {
      if (phase === 'DAS') {
        if (delay >= DAS * 50) {
          moveRight()
          phase = 'ARR'
          delay = 0
        }
      }
      if (phase === 'ARR') {
        if (delay >= ARR * 50) {
          moveRight()
          delay = 0
        }
      }

      delay++
    }
    arrowsDirection = 1
  } else if (isLeft == true) {
    if (arrowsDirection != -1) {
      moveLeft()
      phase = 'DAS'
    }
    for (let i = 0; i < 50; i++) {
      if (phase == 'DAS') {
        if (delay >= DAS * 50) {
          moveLeft()
          phase = 'ARR'
          delay = 0
        }
      }
      if (phase == 'ARR') {
        if (delay >= ARR * 50) {
          moveLeft()
          delay = 0
        }
      }

      delay++
    }
    arrowsDirection = -1
  } else {
    delay = 0
    arrowsDirection = 0
    phase = 'DAS'
  }
}

function moveRight() {
  if (checkXY(1, 0, tetrominoRotation) == true) {
    removeTetromino()
    xTetromino++
    placeTetromino()
    clearLockDelay()
  }
}

function moveLeft() {
  if (checkXY(-1, 0, tetrominoRotation) == true) {
    removeTetromino()
    xTetromino--
    placeTetromino()
    clearLockDelay()
  }
}

function softDrop() {
  if (isDown == true) {
    for (let i = 0; i < 50; i++) {
      dropDelay++
      if (dropDelay >= (1 / SDF) * 50) {
        oneDown(true)
        dropDelay = 0
      }
    }
  } else {
    dropDelay = 0
  }
}

function hardDrop() {
  if (isUp == true && hardDropDelay == true) {
    hardDropDelay = false
    isUp = false
    for (let i = 0; i < 30; i++) {
      oneDown(false)
    }
  }
}

function oneDown(noPut) {
  if (checkXY(0, 1, tetrominoRotation) == true) {
    removeTetromino()
    yTetromino++
    placeTetromino()
  } else if (noPut == false) {
    if (notPutBlocks == true) {
      putTetromino()
      isFalling = 0
    }
  }
}

//---CHECK XY---
function checkXY(X, Y, futureRotation) {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (blocks[currentTetromino][futureRotation][y][x] == 1) {
        if (yTetromino + y + Y > 29) {
          // Down
          return false
        }

        if (xTetromino + x + X > 9) {
          // Right
          return false
        }

        if (xTetromino + x + X < 0) {
          // Left
          return false
        }

        if (board[xTetromino + x + X][yTetromino + y + Y] > 2) {
          //jesli jest jakis klocek
          return false
        }
      }
    }
  }
  return true
}

//---LOCK DELAY---
function clearLockDelay() {
  if (counterOflockDelay <= 14 && checkXY(0, 1, tetrominoRotation) === false) {
    lockDelay = 0
    counterOflockDelay++
    currentTetrominoTransparency = 1
  }
}

//---LINE CLEAR---
function checkLineClear() {
  for (let y = 0; y < 30; y++) {
    let ifLineClear = 0
    for (let x = 0; x < 10; x++) {
      if (board[x][y] > 2) {
        ifLineClear++
      }
    }
    if (ifLineClear == 10) {
      LineClear(y)
    }
  }
}

function LineClear(Y) {
  for (let x = 0; x < 10; x++) {
    board[x][Y] = 0
  }
  for (let y = Y; y >= 0; y--) {
    if (y == 0) {
      for (let x = 0; x < 10; x++) {
        board[x][y] = 0
      }
    } else {
      for (let x = 0; x < 10; x++) {
        board[x][y] = board[x][y - 1]
      }
    }
  }
}
