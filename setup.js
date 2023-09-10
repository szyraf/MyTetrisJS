//---SETUP---
function setup() {
  BS = document.querySelector('#BlockSize').value
  extraHeight = BS * 3
  canvas.width = BS * 20
  canvas.height = BS * 20 + extraHeight

  Pause = document.querySelector('#Pause').checked
  Speed = document.querySelector('#Speed').value
  notPutBlocks = !document.querySelector('#NotPutBlocks').checked
  DAS = document.querySelector('#DAS').value
  ARR = document.querySelector('#ARR').value
  SDF = document.querySelector('#SDF').value
}

//---ON LOAD---
window.onload = function () {
  //RANDOM 7
  random_random7()
  for (let i = 0; i < 7; i++) {
    tetrominoQueue[i] = random7[i]
  }
  random7_to_tetrominoQueue()

  //FRAME
  setInterval(frame, 1000 / frameRate)

  //KEYS
  keys_setup()
}
