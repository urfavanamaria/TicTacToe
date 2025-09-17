const prompt = require('prompt-sync')();
let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = '🐐';
let gameActive = true;

while (gameActive) {
  printBoard();
  const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `);

  if (position >= 0 && position <= 8) {
    handleMove(parseInt(position));
  } else {
    console.log('Invalid position, enter a number between 0 and 8.');
  }
}

function printBoard() {
  const displayBoard = gameBoard.map((cell, idx) =>
    cell === ' ' ? idx : cell
  );
  console.log(`
    ${displayBoard[0]} | ${displayBoard[1]} | ${displayBoard[2]}
    ---------
    ${displayBoard[3]} | ${displayBoard[4]} | ${displayBoard[5]}
    ---------
    ${displayBoard[6]} | ${displayBoard[7]} | ${displayBoard[8]}
  `);
}

function handleMove(position) {
  if (gameBoard[position] === ' ') {
    gameBoard[position] = currentPlayer;
  } else {
    console.log('Cell already taken, choose another one.');
    return false;
  }

  if (checkWin()) {
    printBoard();
    console.log(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return true;
  }

  if (gameBoard.every((cell) => cell !== ' ')) {
    printBoard();
    console.log("It's a draw!");
    gameActive = false;
    return true;
  }

  currentPlayer = currentPlayer === '🐐' ? '🍇' : '🐐';
  return true;
}

function checkWin() {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return conditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    );
  });
}
