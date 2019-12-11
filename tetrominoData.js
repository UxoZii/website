function setData() {
  descentTimer = 0;
  lockTimer = 0;
  board = [];
  for (i = 0; i < 40; i++) {
    board[i] = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  };
  tetrominoName = ["I", "J", "L", "O", "S", "T", "Z"];
  nextQueue = shuffle([0, 1, 2, 3, 4, 5, 6]);
  hiddenQueue = shuffle([0, 1, 2, 3, 4, 5, 6]);
  piecesUsed = 1;
  pieceColor = [
    [0, 255, 255],
    [0, 0, 255],
    [255, 128, 0],
    [255, 255, 0],
    [51, 255, 51],
    [153, 51, 255],
    [255, 0, 0],
    [128, 128, 128]
  ];

  wallKickList = [
    // 0 > 1
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ],
    // 1 > 0
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    // 1 > 2
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    // 2 > 1
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ],
    // 2 > 3
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    // 3 > 2
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
    // 3 > 0
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
    // 0 > 3
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
  ]
  
  
  wallKickListI = [
    // 0 > 1
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2]
    ],
    // 1 > 0
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2]
    ],
    // 1 > 2
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1]
    ],
    // 2 > 1
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1]
    ],
    // 2 > 3
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2]
    ],
    // 3 > 2
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2]
    ],
    // 3 > 0
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1]
    ],
    // 0 > 3
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1]
    ],
  ]


  //tetrominoShape[1][2][3][4]
  tetrominoShape = [

    [
      // I
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ],

    [
      // J
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ]
    ],

    [
      // L
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ]
    ],

    [
      // O
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]
    ],

    [
      // S
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ]
    ],

    [
      // T
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ]
    ],

    [
      // Z
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ]
  ]
};