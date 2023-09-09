function keys_setup() {
  document.addEventListener('keydown', keyDown)
  document.addEventListener('keyup', keyUp)
}

//---KEYS---
let isLeft = false
let isRight = false
let isUp = false
let isDown = false
let isZ = false
let isX = false
let isC = false
let isA = false
let isR = false

//---DELAYS---
let isZDelay = true
let isXDelay = true
let isCDelay = true
let isADelay = true
let isRDelay = true

//---KEYS---
function keyDown(event) {
  switch (event.keyCode) {
    case 37: // lewo
      event.preventDefault()
      isLeft = true
      break
    case 39: // prawo
      event.preventDefault()
      isRight = true
      break
    case 38: // góra
      event.preventDefault()
      isUp = true
      break
    case 40: // dół
      event.preventDefault()
      isDown = true
      break
    case 90: // z
      isZ = true
      break
    case 88: // x
      isX = true
      break
    case 67: // c
      isC = true
      break
    case 65: // a
      isA = true
      break
    case 82: // r
      isR = true
      break
    case 27: // esc
      document.querySelector('#Pause').checked = !document.querySelector('#Pause').checked
      break
  }
}

function keyUp(event) {
  switch (event.keyCode) {
    case 37: // lewo
      isLeft = false
      break
    case 39: // prawo
      isRight = false
      break
    case 38: // góra
      isUp = false
      hardDropDelay = true
      break
    case 40: // dół
      isDown = false
      break
    case 90: // z
      isZ = false
      isZDelay = true
      break
    case 88: // x
      isX = false
      isXDelay = true
      break
    case 67: // c
      isC = false
      isCDelay = true
      break
    case 65: // a
      isA = false
      isADelay = true
      break
    case 82: // r
      isR = false
      isRDelay = true
      break
  }
}
