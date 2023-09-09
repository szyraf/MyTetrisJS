//---RANDOM 7---
let random7 = Array(7) // 7,                                       (losowanie)
let tetrominoQueue = Array(14) // 14,                              (kolejka)

//---RANDOM 7---
function random_random7() {
  // genialne
  let numbersToDrawn = [0, 1, 2, 3, 4, 5, 6]
  for (let i = 6; i >= 0; i--) {
    let drawnNumber = randomIntFromInterval(0, i)
    random7[6 - i] = numbersToDrawn[drawnNumber]
    numbersToDrawn[drawnNumber] = numbersToDrawn[i]
  }
}

function random7_to_tetrominoQueue() {
  random_random7()
  for (let i = 0; i < 7; i++) {
    tetrominoQueue[i + 7] = random7[i]
  }
}

//---RANDOM MINMAX---
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
