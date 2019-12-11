function setup() {

  createCanvas(600, 600);
  setData();
  spawnPiece();
  frameRate(60);
}

function draw() {
  descentPiece(18);

  background(100);
  drawBoard();
  drawPiece();

  if (keyIsDown(DOWN_ARROW)) {
    descentTimer++;
  }
}

function drawBoard() {
  for (y = 20; y < 40; y++) {
    for (x = 0; x < 10; x++) {
      if (board[y][x] != -1) {
        fill(color(pieceColor[board[y][x]]));
        rect(10 + x * 20, 10 + (y - 20) * 20, 20, 20);
      } else {
        fill(color(40, 40, 40));
        rect(10 + x * 20, 10 + (y - 20) * 20, 20, 20);
      }
    }
  }
};

function spawnPiece(piece) {
  pieceX = 3;
  pieceY = 19;
  currentPiece = nextQueue[piecesUsed % 7]
  if (piecesUsed % 7 == 0 && piecesUsed != 0) {
    nextQueue = shuffle([0, 1, 2, 3, 4, 5, 6])
  };
  currentRotation = 0;
  piecesUsed++;
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

function drawPiece() {
  for (y = 0; y < 4; y++) {
    for (x = 0; x < 4; x++) {
      if (tetrominoShape[currentPiece][currentRotation][y][x] == 1) {
        fill(color(pieceColor[currentPiece]));
        rect(10 + (x + pieceX) * 20, 10 + ((y + pieceY) - 20) * 20, 20, 20);
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
  console.log(i)
  console.log(canRotate);
  if (canRotate) {
    currentRotation = tempRotation;
    pieceX += wallKick[i][0];
    pieceY -= wallKick[i][1];
    lockTimer = 0;
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