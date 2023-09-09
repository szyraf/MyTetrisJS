//###VARIABLES###

//---SETTINGS---
const frameRate = 60;

let Pause = false;

let Speed = 1;

let isFalling = 0;
let fallCounter = 0;

let speedSoftDrop = 1;

let notPutBlocks = false;

//---CANVAS---
let BS = blockSize = 30; // px  (numer % 2)

const canvas = document.getElementById('tetrisCanvas');
const ctx = canvas.getContext('2d');

let extraHeight = BS * 3;
canvas.width  = BS * 20;
canvas.height = BS * 20 + extraHeight;

//---BOARD---
let board = Array.from(Array(10), () => new Array(30)); // x, y     (plansza)
for(let y = 0; y < 30; y++) {
    for(let x = 0; x < 10; x++) {
        board[x][y] = 0;
    }
}

//---RANDOM 7---
let random7 = Array(7); // 7,                                       (losowanie)
let tetrominoQueue = Array(14); // 14,                              (kolejka)

//---TETROMINOS---
let currentTetromino = 0;
let tetrominoRotation = 0;
let xTetromino = 3;
let yTetromino = 1;
const blocks = [    // [7][4][4][4]   currentTetromino, tetrominoRotation, yTetromino, xTetromino,
    [
        [
            [0,0,0,0],      // 0.
            [1,1,1,1],      // I
            [0,0,0,0],      // cyan
            [0,0,0,0]
        ],[
            [0,0,1,0],      // prawo
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ],[
            [0,0,0,0],      // do gory nogami
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ],[
            [0,1,0,0],      // lewo
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ]
    ],[
        [
            [1,0,0,0],      // 1.
            [1,1,1,0],      // J
            [0,0,0,0],      // dark blue
            [0,0,0,0]
        ],[
            [0,1,1,0],      
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ],[
            [0,0,0,0],      
            [1,1,1,0],
            [0,0,1,0],
            [0,0,0,0]
        ],[
            [0,1,0,0],      
            [0,1,0,0],
            [1,1,0,0],
            [0,0,0,0]
        ]
    ],[
        [
            [0,0,1,0],      // 2.
            [1,1,1,0],      // L
            [0,0,0,0],      // orange
            [0,0,0,0]
        ],[
            [0,1,0,0],      
            [0,1,0,0],
            [0,1,1,0],
            [0,0,0,0]
        ],[
            [0,0,0,0],      
            [1,1,1,0],
            [1,0,0,0],
            [0,0,0,0]
        ],[
            [1,1,0,0],      
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ]
    ],[
        [
            [0,1,1,0],      // 3.
            [0,1,1,0],      // O
            [0,0,0,0],      // yellow
            [0,0,0,0]
        ],[
            [0,1,1,0],      
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,1,1,0],      
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,1,1,0],      
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ],[
        [
            [0,1,1,0],      // 4.
            [1,1,0,0],      // S
            [0,0,0,0],      // green
            [0,0,0,0]
        ],[
            [0,1,0,0],      
            [0,1,1,0],
            [0,0,1,0],
            [0,0,0,0]
        ],[
            [0,0,0,0],      
            [0,1,1,0],
            [1,1,0,0],
            [0,0,0,0]
        ],[
            [1,0,0,0],      
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ]
    ],[
        [
            [0,1,0,0],      // 5.
            [1,1,1,0],      // T
            [0,0,0,0],      // purple
            [0,0,0,0]
        ],[
            [0,1,0,0],      
            [0,1,1,0],
            [0,1,0,0],
            [0,0,0,0]
        ],[
            [0,0,0,0],      
            [1,1,1,0],
            [0,1,0,0],
            [0,0,0,0]
        ],[
            [0,1,0,0],      
            [1,1,0,0],
            [0,1,0,0],
            [0,0,0,0]
        ]
    ],[
        [
            [1,1,0,0],      // 6.
            [0,1,1,0],      // Z
            [0,0,0,0],      // red
            [0,0,0,0]
        ],[
            [0,0,1,0],      
            [0,1,1,0],
            [0,1,0,0],
            [0,0,0,0]
        ],[
            [0,0,0,0],      
            [1,1,0,0],
            [0,1,1,0],
            [0,0,0,0]
        ],[
            [0,1,0,0],      
            [1,1,0,0],
            [1,0,0,0],
            [0,0,0,0]
        ]
    ]
];

//---LOCK DELAY---
let lockDelay = 0;
let counterOflockDelay = 0;
let transparency = 1;

//---KEYS---
let isLeft =  false;
let isRight = false;
let isUp =    false;
let isDown =  false;
let isZ =     false;
let isX =     false;
let isC =     false;
let isA =     false;
let isR =     false;

//---DELAYS---
let isZDelay = true;
let isXDelay = true;
let isCDelay = true;
let isADelay = true;
let isRDelay = true;

let dropDelay = 0;
let hardDropDelay = true;

//---HOLD---
let holdTetromino = -1;
let isHold = true;

//---MOVES---
let DAS = 7.5; // 125ms
let ARR = 0; // 0ms
let delay = 0;
let arrowsDirection = 0; // -1 = lewo
                         //  1 = prawo
                         //  0 = nigdzie
let phase = 0; // 0 - żadna
               // 1 - 1 klatka
               // 2 - czekamy na DAS
               // 3 - ARR

//###FUNCTIONS###

//---SETUP---
function setup() {
    BS = document.querySelector('#BlockSize').value;
    extraHeight = BS * 3;
    canvas.width  = BS * 20;
    canvas.height = BS * 20 + extraHeight;

    Pause = document.querySelector('#Pause').checked;
    Speed = document.querySelector('#Speed').value;
    notPutBlocks = !document.querySelector('#NotPutBlocks').checked;
    DAS = document.querySelector('#DAS').value;
    ARR = document.querySelector('#ARR').value;
}

//---ON LOAD---
window.onload = function() {
    //RANDOM 7
    random_random7();
    for(let i = 0; i < 7; i++) {
        tetrominoQueue[i] = random7[i];
    }
    random7_to_tetrominoQueue();

    //FRAME
    setInterval(frame, 1000 / frameRate);

    //KEYS
    document.addEventListener("keydown", keyPush);
    document.addEventListener("keyup", keyUp);
}

//---FRAME---
function frame() { //Główna funkcja
    //SETUP
    setup();

    //MOVES
    if(Pause == false) {
        clearCanvas();

        if(isFalling == 0) {
            createNewTetromino();
            isFalling = 1;
            fallCounter = 0;
            counterOflockDelay = 0;
            isHold = true;
            checkLineClear();
        }
        else {
            keys();

            if(checkXY(0, 1, tetrominoRotation) == false) {
                fallCounter = 0;
                lockDelay++;
                transparency -= 1 / 30.0;
                if(lockDelay >= 30) {
                    lockDelay = 0;
                    oneDown(false);
                }
            }
            else {
                transparency = 1;
                fallCounter++;
                if(fallCounter >= 60 / Speed) { // 60fps
                    oneDown(false);
                    fallCounter = 0;
                }    
            }    

        }
    }

    //RENDER
    drawBoard();

    //RESTART
    checkRestart();
}

//---LOCK DELAY---
function clearLockDelay() {
    if(lockDelay > 0 && counterOflockDelay <= 15) {
        lockDelay = 0;
        counterOflockDelay++;
        transparency = 1;
    }
}

//---BOARD---
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBoard() {
    //BLOCKS 4x2
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    
    hold_4x2(0, 0, holdTetromino);

    block_4x2(16, 0, 0);
    block_4x2(16, 3, 1);
    block_4x2(16, 6, 2);
    block_4x2(16, 9, 3);
    block_4x2(16, 12, 4);

    //BOARD
    for(let y = 0; y < 30; y++) {
        for(let x = 0; x < 10; x++) {
            let square = board[x][y];
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;

            if(square == 0) { // nic
                ctx.fillStyle = 'rgb(0, 0, 0)';
            }
            else if(square == 1) { // aktualny spadający
                ctx.fillStyle = 'rgba(0, 255, 255, ' + transparency + ')';
            }
            else if(square == 2) { // cień spadania
                ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
            }
            else if(square > 2) { // klocki różne kolory
                ctx.fillStyle = 'rgb(255, 0, 0)';
            }
            else {
                ctx.fillStyle = 'rgb(0, 0, 0)';
            }
            
            if(y >= 10) {
                ctx.fillRect(  (5 + x) * BS, + (y - 10) * BS + extraHeight, BS, BS);
                ctx.strokeRect((5 + x) * BS, + (y - 10) * BS + extraHeight, BS, BS);
            }   
            else if(y >= 7 && square != 0) {
                ctx.fillRect(  (5 + x) * BS, + (y - 10) * BS + extraHeight, BS, BS);
                ctx.strokeRect((5 + x) * BS, + (y - 10) * BS + extraHeight, BS, BS);
            }
        }
    }

    //SHADOW
    drawShadow();
}

//---BLOCKS 4x2---
function hold_4x2(x, y, tetromino) {
    for(let x2 = 0; x2 < 4; x2++) {
        for(let y2 = 0; y2 < 2; y2++) {
            if(tetromino != -1) { // first hold
                let square = blocks[tetromino][0][y2][x2];   
            
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                if(square == 0) {
                    ctx.fillStyle = 'rgb(0, 0, 0)';
                } 
                else if(square == 1) {
                    ctx.fillStyle = 'rgb(0, 255, 255)';
                }
            }
            ctx.fillRect(  (x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS);
            ctx.strokeRect((x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS);
        }
    }
}

function block_4x2(x, y, miejsce_w_kolejce) {
    for(let x2 = 0; x2 < 4; x2++) {
        for(let y2 = 0; y2 < 2; y2++) {
            let square = blocks[tetrominoQueue[miejsce_w_kolejce]][0][y2][x2];   
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            if(square == 0) {
                ctx.fillStyle = 'rgb(0, 0, 0)';
            } 
            else if(square == 1) {
                ctx.fillStyle = 'rgb(0, 255, 255)';
            }
            
            ctx.fillRect(  (x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS);
            ctx.strokeRect((x + x2) * BS, (y + y2) * BS + extraHeight, BS, BS);
        }
    }
}

//---RANDOM 7---
function random_random7() { // genialne
    let numbersToDrawn = [0, 1, 2, 3, 4, 5, 6];
    for(let i = 6; i >= 0; i--) {
        let drawnNumber = randomIntFromInterval(0, i);
        random7[6 - i] = numbersToDrawn[drawnNumber];
        numbersToDrawn[drawnNumber] = numbersToDrawn[i];
    }
}

function random7_to_tetrominoQueue() {
    random_random7()
    for(let i = 0; i < 7; i++) {
        tetrominoQueue[i + 7] = random7[i];
    }
}

//---RANDOM MINMAX---
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//---LINE CLEAR---
function checkLineClear() {
    for(let y = 0; y < 30; y++) {
        let ifLineClear = 0;
        for(let x = 0; x < 10; x++) {
            if(board[x][y] > 2) {
                ifLineClear++;
            }
        }
        if(ifLineClear == 10) {
            LineClear(y);
        }
    }
}

function LineClear(Y) {
    for(let x = 0; x < 10; x++) {
        board[x][Y] = 0;
    }
    for(let y = Y; y >= 0; y--) {
        if(y == 0) {
            for(let x = 0; x < 10; x++) {
                board[x][y] = 0;
            }
        }
        else {
            for(let x = 0; x < 10; x++) {
                board[x][y] = board[x][y - 1];
            }
        }
    }
}

//---TETROMINOS---
function createNewTetromino() {
    currentTetromino = tetrominoQueue[0];
    tetrominoRotation = 0;
    xTetromino = 3;
    yTetromino = 7;
       
    placeTetromino();
    
    for(let i = 0; i < 13; i++) {
        tetrominoQueue[i] = tetrominoQueue[i + 1];
    }
    
    tetrominoQueue[13] = -1;
    if(tetrominoQueue[7] == -1) {
        random7_to_tetrominoQueue();
    }
}

function placeTetromino() {
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 4; x++) {
            if(yTetromino + y < 30) {
                if(blocks[currentTetromino][tetrominoRotation][y][x] == 1) {
                    board[xTetromino + x][yTetromino + y] = blocks[currentTetromino][tetrominoRotation][y][x];   
                }
            } 
        }
    }
}

function removeTetromino() {
    for(let y = 0; y < 30; y++) {
        for(let x = 0; x < 10; x++) {
            if(board[x][y] == 1) {
                board[x][y] = 0;
            }
        }
    }
}

function putTetromino() {
    for(let y=0; y<30; y++) {
        for(let x=0; x<10; x++) {
            if(board[x][y] == 1) {
                board[x][y] = 3;
            }
        }
    }
}

//---SHADOW---
function drawShadow() {
    removeShadow();
    for(let i = 1; i < 30; i++) {
        if(checkXY(0, i, tetrominoRotation) == false) {
            for(let y = 0; y < 4; y++) {
                for(let x = 0; x < 4; x++) {
                    if(blocks[currentTetromino][tetrominoRotation][y][x] == 1) {
                        if(board[xTetromino + x][yTetromino + y + (i - 1)] == 0) { //jesli ponizej jest jakis klocek
                            board[xTetromino + x][yTetromino + y + (i - 1)] = 2;
                        }
                    }
                }
            }
            break;
        }
    }
}

function removeShadow() {
    for(let y = 0; y < 30; y++) {
        for(let x = 0; x < 10; x++) {
            if(board[x][y] == 2) {
                board[x][y] = 0;
            }
        }
    }
}

//---MOVES---
function keys()
{
    hold();
    moveLeftRight();
    rotation();
    softDrop();
    hardDrop();
}

function hold() {
    if (isC == true && isCDelay == true && isHold == true) {
        isHold = false;
        isCDelay = false;

        removeTetromino();

        if(holdTetromino == -1) { // first hold
            holdTetromino = currentTetromino;
            createNewTetromino();
            isFalling = 1;
            fallCounter = 0;
            counterOflockDelay = 0;
        }
        else {
            let tmp = holdTetromino;
            holdTetromino = currentTetromino;
            currentTetromino = tmp;

            tetrominoRotation = 0;
            xTetromino = 3;
            yTetromino = 7;
            placeTetromino();

            isFalling = 1;
            fallCounter = 0;
            counterOflockDelay = 0;
        }
    }
}

function moveLeftRight() {
    if (isRight == true) {
        if(arrowsDirection != 1) {
            moveRight()
            phase = 2;
        }
        else {
            delay++;
            if(phase == 2) {
                if(delay >= DAS) {
                    moveRight()
                    phase = 3;
                    delay = 0;
                }
            }
            else if(phase == 3) {
                if(delay >= ARR) {
                    moveRight()
                    delay = 0;
                }
            }
        }
        arrowsDirection = 1;
    }
    else if (isLeft == true) {
        if(arrowsDirection != -1) {
            moveLeft()
            phase = 2;
        }
        else {
            delay++;
            if(phase == 2) {
                if(delay >= DAS) {
                    moveLeft()
                    phase = 3;
                    delay = 0;
                }
            }
            else if(phase == 3) {
                if(delay >= ARR) {
                    moveLeft()
                    delay = 0;
                }
            }
        }
        arrowsDirection = -1;
    }
    else {
        delay = 0;
        arrowsDirection = 0
        phase = 0
    }
}

function moveRight() {
    if(checkXY(1, 0, tetrominoRotation) == true) {
        removeTetromino();
        xTetromino++;
        placeTetromino();
        clearLockDelay();
    }
}

function moveLeft() {
    if(checkXY(-1, 0, tetrominoRotation) == true) {
        removeTetromino();
        xTetromino--;
        placeTetromino();
        clearLockDelay();
    }
}

function softDrop() {
    if (isDown == true) {
        dropDelay++;
        if(dropDelay >= speedSoftDrop) {
            oneDown(true);
            dropDelay = 0;
        }        
    }
    else {
        dropDelay = 0;
    } 
}

function hardDrop() {
    if (isUp == true && hardDropDelay == true) {
        hardDropDelay = false;
        isUp = false;
        for (let i = 0; i < 30; i++) {
            oneDown(false);
        } 
    }
}

function oneDown(noPut) {
    if(checkXY(0, 1, tetrominoRotation) == true) {
        removeTetromino();
        yTetromino++;
        placeTetromino();
    }
    else if(noPut == false) {
        if(notPutBlocks == true) {
            putTetromino();
            isFalling = 0;
        }
    }
}

//---CHECK XY---
function checkXY(X, Y, futureRotation) {
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 4; x++) {
            if(blocks[currentTetromino][futureRotation][y][x] == 1) {
                if(yTetromino + y + Y > 29) { // Down
                    return false;
                }

                if(xTetromino + x + X > 9) { // Right
                    return false;
                }

                if(xTetromino + x + X < 0) { // Left
                    return false;
                }

                if(board[xTetromino + x + X][yTetromino + y + Y] > 2) { //jesli jest jakis klocek
                    return false;
                }
            }
        }
    }
    return true;
}

//---KEYS---
function keyPush(event) {
    switch(event.keyCode) {
        case 37: // lewo
            event.preventDefault();
            isLeft = true;
            break;
        case 39: // prawo
            event.preventDefault();
            isRight = true;
            break;
        case 38: // góra
            event.preventDefault();
            isUp = true;
            break;
        case 40: // dół
            event.preventDefault();
            isDown = true;
            break;
        case 90: // z
            isZ = true;
            break;
        case 88: // x
            isX = true;
            break;
        case 67: // c
            isC = true;
            break;
        case 65: // a
            isA = true;
            break;
        case 82: // r
            isR = true;
            break;
        case 27: // esc
            document.querySelector('#Pause').checked = !document.querySelector('#Pause').checked;
        break;
    }
}

function keyUp(event) {
    switch(event.keyCode) {
        case 37: // lewo
            isLeft = false;
            break;
        case 39: // prawo
            isRight = false;
            break;
        case 38: // góra
            isUp = false;
            hardDropDelay = true;
            break;
        case 40: // dół
            isDown = false;
            break;
        case 90: // z
            isZ = false;
            isZDelay = true;
            break;
        case 88: // x
            isX = false;
            isXDelay = true;
            break;
        case 67: // c
            isC = false;
            isCDelay = true;
            break;
        case 65: // a
            isA = false;
            isADelay = true;
            break;
        case 82: // r
            isR = false;
            isRDelay = true;
            break;
    }
}

