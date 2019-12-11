function setup() {

  createCanvas(600, 600);
  setData();
  spawnPiece();
  frameRate(60);
}

function draw() {
  doDAS();
  descentPiece(18);

  background(100);
  drawBoard();
  drawShadow();
  drawPiece();
  drawNextQueue();
  drawHeldPiece();
  
  fill(0, 102, 153);
  textSize(20);
  text("tetris by UxoZii exdee",10,450)
  text("LEFT/RIGHT: move left right",10,480)
  text("UP/Z: rotate right left",10,510)
  text("C: hold piece",10,540)

  if (keyIsDown(DOWN_ARROW)) {
    descentTimer += 20;
  }
}

function drawBoard() {
  for (y = 20; y < 40; y++) {
    for (x = 0; x < 10; x++) {
      if (board[y][x] != -1) {
        fill(color(pieceColor[board[y][x]]));
        rect(10 + offsetX + x * 20, 10 + (y - 20) * 20, 20, 20);
      } else {
        fill(color(40, 40, 40));
        rect(10 + offsetX + x * 20, 10 + (y - 20) * 20, 20, 20);
      }
    }
  }
};

function spawnPiece(piece) {
  pieceX = 3;
  pieceY = 19;

  currentPiece = nextQueue[0]

  for (i = 0; i < 6; i++) {
    nextQueue[i] = nextQueue[i + 1]
  }

  nextQueue[6] = hiddenQueue[piecesUsed % 7];

  if (piecesUsed % 7 == 0 && piecesUsed != 0) {
    hiddenQueue = shuffle([0, 1, 2, 3, 4, 5, 6])
  };
  currentRotation = 0;
  piecesUsed++;
  alreadyHeld = false;
}

function lockPiece() {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (y + pieceY > 39) {
        continue;
      };
      if (tetrominoShape[currentPiece][currentRotation][y][x] == 1) {
        board[y + pieceY][x + pieceX] = currentPiece
      }
    }
  }
}

function holdPiece() {
  if (alreadyHeld) {
    return;
  };

  var temp = 0;
  if (heldPiece == -1) {
    heldPiece = currentPiece;
    spawnPiece();
    alreadyHeld = true;
  } else {
    temp = currentPiece;
    currentPiece = heldPiece;
    heldPiece = temp;
    pieceY = 19;
    pieceX = 3;
    alreadyHeld = true;
    currentRotation = 0;
  }
}

function drawPiece() {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (tetrominoShape[currentPiece][currentRotation][y][x] == 1) {
        fill(color(pieceColor[currentPiece]));
        rect(10 + offsetX + (x + pieceX) * 20, 10 + ((y + pieceY) - 20) * 20, 20, 20);
      }
    }
  }
}

function descentPiece(cooldown) {
  descentTimer += 1
  if (descentTimer >= cooldown && canGoDown()) {
    pieceY++;
    descentTimer = 0;
  } else if (descentTimer >= cooldown && canGoDown() == false) {
    lockTimer++
    if (lockTimer > 30) {
      lockPiece();
      lockTimer = 0;
      checkLineClear();
      spawnPiece();
    }

  }
}

function canGoDown() {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (tetrominoShape[currentPiece][currentRotation][y][x] == 1 &&
        pieceY + y + 1 > 39) {
        return false;
      };

      if (tetrominoShape[currentPiece][currentRotation][y][x] == 1 &&
        board[pieceY + y + 1][pieceX + x] != -1) {
        return false;
      };
    }
  }
  return true;
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 37) {
    moveHorizontally("left");
  }

  if (keyCode == 39) {
    moveHorizontally("right");
  }

  if (keyCode == 38) {
    rotatePiece(1);
  }

  if (keyCode == 90) {
    rotatePiece(-1);
  }

  if (keyCode == 32) {
    hardDrop();
  }

  if (keyCode == 67) {
    holdPiece();
  }

}

function doDAS() {


  if (!keyIsDown(37)) {
    DASTimerL = 0;
  }
  if (!keyIsDown(39)) {
    DASTimerR = 0;
  }

  if (keyIsDown(37) && keyIsDown(39)) {
    DASTimerL = 0;
    DASTimerR = 0;
  }

  if (keyIsDown(37)) {
    DASTimerL++;
    if (DASTimerL > 8) {
      moveHorizontally("left");
    }
  }

  if (keyIsDown(39)) {
    DASTimerR++;
    if (DASTimerR > 8) {
      moveHorizontally("right");
    }
  }

}

function moveHorizontally(direction) {
  if (direction == "left") {
    offset = -1
  } else {
    offset = 1
  };

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (tetrominoShape[currentPiece][currentRotation][y][x] == 1 &&
        board[y + pieceY][x + pieceX + offset] != -1) {
        return
      }
    }
  }
  pieceX += offset;
}

function checkLineClear() {
  linesToClear = [];
  main: for (y = 0; y < 40; y++) {
    for (i = 0; i < 10; i++) {
      if (board[y][i] == -1) {
        continue main
      }
    }
    linesToClear.push(y);
  }
  doLineClear();
}

function doLineClear() {
  for (i = 0; i < linesToClear.length; i++) {
    makeBoardGoDown(linesToClear[i]);
  }
}

function makeBoardGoDown(from) {
  for (y = from; y > 1; y--) {
    for (x = 0; x < 10; x++) {
      board[y][x] = board[y - 1][x];
    }
  }
}

function rotatePiece(rotationOffset) {

  var tempRotation = currentRotation + rotationOffset;
  if (tempRotation > 3) {
    tempRotation = 0
  };
  if (tempRotation < 0) {
    tempRotation = 3
  };

  setWallKick(currentRotation, rotationOffset);



  for (i = 0; i < 5; i++) {
    canRotate = true
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (y + pieceY - wallKick[i][1] > 39 &&
          tetrominoShape[currentPiece][tempRotation][y][x] == 1) {
          canRotate = false;
          break;
        };
        if (tetrominoShape[currentPiece][tempRotation][y][x] == 1 &&
          board[y + pieceY - wallKick[i][1]][x + pieceX + wallKick[i][0]] != -1) {
          canRotate = false;
          break
        };
      }
    }
    if (canRotate == true) {
      break
    };
  }
  if (canRotate) {
    currentRotation = tempRotation;
    pieceX += wallKick[i][0];
    pieceY -= wallKick[i][1];
    lockTimer = 0;
  }


}

function hardDrop() {
  for (i = 0; i < 20; i++) {
    if (canGoDown()) {
      pieceY++
    } else {
      lockPiece();
      checkLineClear();
      spawnPiece();
      return
    }
  }
}

function drawNextQueue() {
  for (i = 0; i < 7; i++) {
    fill([120, 120, 120])
    rect(220 + offsetX, 10 + i * 50, 45, 45);
  }
  for (i = 0; i < 7; i++) {
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 4; x++) {
        if (tetrominoShape[nextQueue[i]][0][y][x] == 1) {
          fill(color(pieceColor[nextQueue[i]]));
          rect(223 + offsetX + x * 10, 15 + y * 10 + i * 50, 10, 10)
        }
      }
    }
  }
}

function drawShadow() {
  shadowPieceY = pieceY;
  for (i = 0; i < 20; i++) {
    if (!canGoDown()) {
      for (y = 0; y < 4; y++) {
        for (x = 0; x < 4; x++) {
          if (tetrominoShape[currentPiece][currentRotation][y][x] == 1) {
            fill(color([50, 50, 50]));
            rect(10 + offsetX + (x + pieceX) * 20, 10 + ((y + pieceY) - 20) * 20, 20, 20);
          }
        }
      }
      pieceY = shadowPieceY;
      return
    }
    pieceY += 1
  }
  pieceY = shadowPieceY;
}
  
function drawHeldPiece(){
  fill(color([120, 120, 120]))
  rect(6,10,45,45) 
  
  if (heldPiece == -1) {return}
  
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (tetrominoShape[heldPiece][0][y][x] == 1) {
          fill(color(pieceColor[heldPiece]));
          rect(10 + x * 10, 15 + y * 10, 10, 10)
        }
    }
  }
  
}


function setWallKick(rot, off) {
  if (rot == 0 && off == 1) {
    wallKick = wallKickList[0]
  }
  if (rot == 1 && off == -1) {
    wallKick = wallKickList[1]
  }
  if (rot == 1 && off == 1) {
    wallKick = wallKickList[2]
  }
  if (rot == 2 && off == -1) {
    wallKick = wallKickList[3]
  }
  if (rot == 2 && off == 1) {
    wallKick = wallKickList[4]
  }
  if (rot == 3 && off == -1) {
    wallKick = wallKickList[5]
  }
  if (rot == 3 && off == 1) {
    wallKick = wallKickList[6]
  }
  if (rot == 0 && off == -1) {
    wallKick = wallKickList[7]
  }

  if (currentPiece == 0) {
    if (rot == 0 && off == 1) {
      wallKick = wallKickListI[0]
    }
    if (rot == 1 && off == -1) {
      wallKick = wallKickListI[1]
    }
    if (rot == 1 && off == 1) {
      wallKick = wallKickListI[2]
    }
    if (rot == 2 && off == -1) {
      wallKick = wallKickListI[3]
    }
    if (rot == 2 && off == 1) {
      wallKick = wallKickListI[4]
    }
    if (rot == 3 && off == -1) {
      wallKick = wallKickListI[5]
    }
    if (rot == 3 && off == 1) {
      wallKick = wallKickListI[6]
    }
    if (rot == 0 && off == -1) {
      wallKick = wallKickListI[7]
    }
  }

}