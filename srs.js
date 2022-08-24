// SRS - Super Rotate System

//---J L S T Z---
const SRS = [[0, 0], [-1 ,0], [-1, 1], [0, -2], [-1, -2]];
let SRSPlusMinus = [1, 1];

//---I---
let   SRS_I =  [[0, 0], [-2 ,0], [1, 0], [-2, -1], [1, 2]];
const SRS_I1 = [[0, 0], [-2 ,0], [1, 0], [-2, -1], [1, 2]];
const SRS_I2 = [[0, 0], [-1 ,0], [2, 0], [-1, -2], [2, -1]];
let SRS_I_PlusMinus_I1I2 = [1, 1]; // PlusMinus, I1/I2

//---ROTATION---
function rotation() {
    if(isX == true && isXDelay == true) {
        isXDelay = false;
        rotationClockwise();
    }
    if(isZ == true && isZDelay == true) {
        isZDelay = false;
        rotationCounterClockwise();
    }
    if(isA == true && isADelay == true) {
        isADelay = false;
        rotation180();
    }
}

function rotationClockwise() {
    if(currentTetromino == 1 || currentTetromino == 2 || (currentTetromino >= 4 && currentTetromino <= 6)) { // 1 2 4 5 6
        if(tetrominoRotation == 0) SRSPlusMinus = [ 1,  1];
        if(tetrominoRotation == 1) SRSPlusMinus = [-1, -1];
        if(tetrominoRotation == 2) SRSPlusMinus = [-1,  1];
        if(tetrominoRotation == 3) SRSPlusMinus = [ 1, -1];

        for (let i = 0; i < 5; i++) {
            if(checkXY(SRS[i][0] * SRSPlusMinus[0], -(SRS[i][1] * SRSPlusMinus[1]), (tetrominoRotation + 1) % 4) == true) {
                removeTetromino();
                xTetromino += SRS[i][0] * SRSPlusMinus[0];
                yTetromino += -(SRS[i][1] * SRSPlusMinus[1]);
                tetrominoRotation = (tetrominoRotation + 1) % 4;
                placeTetromino();
                clearLockDelay();
                break;
            }
        }
    }
    
    if(currentTetromino == 0) { // I
        if(tetrominoRotation == 0) SRS_I_PlusMinus_I1I2 = [ 1,  1];
        if(tetrominoRotation == 1) SRS_I_PlusMinus_I1I2 = [ 1,  2];
        if(tetrominoRotation == 2) SRS_I_PlusMinus_I1I2 = [-1,  1];
        if(tetrominoRotation == 3) SRS_I_PlusMinus_I1I2 = [-1,  2];

        if(SRS_I_PlusMinus_I1I2[1] == 1)  SRS_I = SRS_I1;
        if(SRS_I_PlusMinus_I1I2[1] == 2)  SRS_I = SRS_I2;

        for (let i = 0; i < 5; i++) {
            if(checkXY(SRS_I[i][0] * SRS_I_PlusMinus_I1I2[0], -(SRS_I[i][1] * SRS_I_PlusMinus_I1I2[0]), (tetrominoRotation + 1) % 4) == true) {
                removeTetromino();
                xTetromino +=   SRS_I[i][0] * SRS_I_PlusMinus_I1I2[0];
                yTetromino += -(SRS_I[i][1] * SRS_I_PlusMinus_I1I2[0]);
                tetrominoRotation = (tetrominoRotation + 1) % 4;
                placeTetromino();
                clearLockDelay();
                break;
            }
        }
    }

    if(currentTetromino == 3) { // O
        clearLockDelay();
    }
    
}

function rotationCounterClockwise() {
    if(currentTetromino == 1 || currentTetromino == 2 || (currentTetromino >= 4 && currentTetromino <= 6)) { // 1 2 4 5 6
        if(tetrominoRotation == 0) SRSPlusMinus = [-1,  1];
        if(tetrominoRotation == 1) SRSPlusMinus = [-1, -1];
        if(tetrominoRotation == 2) SRSPlusMinus = [ 1,  1];
        if(tetrominoRotation == 3) SRSPlusMinus = [ 1, -1];

        let counterClockwiseFutureRotation = tetrominoRotation - 1;
        if(counterClockwiseFutureRotation == -1) counterClockwiseFutureRotation = 3;

        for (let i = 0; i < 5; i++) {
            if(checkXY(SRS[i][0] * SRSPlusMinus[0], -(SRS[i][1] * SRSPlusMinus[1]), counterClockwiseFutureRotation) == true) {
                removeTetromino();
                xTetromino += SRS[i][0] * SRSPlusMinus[0];
                yTetromino += -(SRS[i][1] * SRSPlusMinus[1]);
                tetrominoRotation = counterClockwiseFutureRotation;
                placeTetromino();
                clearLockDelay();
                break;
            }
        }
    }

    if(currentTetromino == 0) { // I
        if(tetrominoRotation == 0) SRS_I_PlusMinus_I1I2 = [-1,  1];
        if(tetrominoRotation == 1) SRS_I_PlusMinus_I1I2 = [-1,  2];
        if(tetrominoRotation == 2) SRS_I_PlusMinus_I1I2 = [ 1,  1];
        if(tetrominoRotation == 3) SRS_I_PlusMinus_I1I2 = [ 1,  2];

        if(SRS_I_PlusMinus_I1I2[1] == 1)  SRS_I = SRS_I1;
        if(SRS_I_PlusMinus_I1I2[1] == 2)  SRS_I = SRS_I2;

        let counterClockwiseFutureRotation = tetrominoRotation - 1;
        if(counterClockwiseFutureRotation == -1) counterClockwiseFutureRotation = 3;

        for (let i = 0; i < 5; i++) {
            if(checkXY(SRS_I[i][0] * SRS_I_PlusMinus_I1I2[0], -(SRS_I[i][1] * SRS_I_PlusMinus_I1I2[0]), counterClockwiseFutureRotation) == true) {
                removeTetromino();
                xTetromino +=   SRS_I[i][0] * SRS_I_PlusMinus_I1I2[0];
                yTetromino += -(SRS_I[i][1] * SRS_I_PlusMinus_I1I2[0]);
                tetrominoRotation = counterClockwiseFutureRotation;
                placeTetromino();
                clearLockDelay();
                break;
            }
        }
    }

    if(currentTetromino == 3) { // O
        clearLockDelay();
    }
}

function rotation180() {
    let FutureRotation180 = tetrominoRotation - 2;
    if(FutureRotation180 == -2) FutureRotation180 = 2;
    if(FutureRotation180 == -1) FutureRotation180 = 3;

    for (let i = 0; i < 5; i++) {
        if(checkXY(0, 0, FutureRotation180) == true) {
            removeTetromino();
            tetrominoRotation = FutureRotation180;
            placeTetromino();
            clearLockDelay();
            break;
        }
    }
}