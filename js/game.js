'use strict';
var WALL = '<img src="./img/wall.png">';
var FOOD = '.';
var EMPTY = ' ';
var POWERFOOD = '<img src="./img/powerfood.png">';
var CHERRY = '&#127826';
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};
var gFoodEatenCount = 0;
var gIsGameWin = false;
var gIntervalCherry;

function init() {
  closeModal();
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  gIntervalCherry = setInterval(createCherry, 15000);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 ||
        i === 1 && j === 8 ||
        i === 8 && j === 1 ||
        i === 8 && j === 8) {
        board[i][j] = POWERFOOD;
      }
    }
  }
  // gIntervalCherry = setInterval(createCherry, 1000);
  return board;
}

function createCherry() {

  var currCell = {
    location: {
      i: getRandomIntInclusive(1, 9),
      j: getRandomIntInclusive(1, 9)
    }
  }

  if (gBoard[currCell.location.i][currCell.location.j] === EMPTY || 
      gBoard[currCell.location.i][currCell.location.j] === FOOD) {
    gBoard[currCell.location.i][currCell.location.j] = CHERRY;
    renderCell(currCell.location, CHERRY);
  }
  return gBoard;
}

function updateScore(value) {
  gGame.score += value;
  gFoodEatenCount += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  isVictory();
}

function updateScoreCherry(value) {
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  return;
}

function isVictory() {
  if (gFoodEatenCount === 60 || gFoodEatenCount === 59) {
    gGame.isOn = false;
    gIsGameWin = true;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    openModal(gIsGameWin);
  }
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  openModal(gIsGameWin);
}

function restartGame() {
  gFoodEatenCount = 0;
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = gGame.score
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  gIntervalGhosts = null;
  init();
}

function openModal(gIsGameWin) {

  var elModal = document.querySelector('.modal');
  elModal.style.display = 'block';
  if (gIsGameWin) {
    var elModalH3 = document.querySelector('.modal h3');
    elModalH3.innerHTML = `Congratulations! You have won!<br>Play Again?`;
  }
}

function closeModal() {

  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
}