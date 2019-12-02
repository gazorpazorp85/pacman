var gPacman;
var pacman = '<span class="pacman"><img src="./img/pacmanright.png"></span>';
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = pacman;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(eventKeyboard);
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  switch (nextCell) {
    case WALL:
      return;
    case FOOD:
      updateScore(1);
      break;
    case CHERRY:
      updateScoreCherry(10);
      break;
    case POWERFOOD:
      if (!gPacman.isSuper) {
        updateScore(1);
        superPacman(gPacman);
      }
      else return;
    case ghostImage:
      if (gPacman.isSuper) {
        killGhost(nextLocation);
      } else {
        gameOver()
        renderCell(gPacman.location, EMPTY);
        return;
      }
  }

  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  renderCell(gPacman.location, EMPTY);
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = pacman;
  renderCell(gPacman.location, pacman); 
}

function superPacman(gPacman) {
  gPacman.isSuper = true;
  ghostChangeColor();
  setTimeout(function () {
    endSuperPacman();
  }, 5000);
}

function endSuperPacman(board) {
  gPacman.isSuper = false;
  reviveGhosts(board);
  changeGhostColorBack();
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };
  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      pacman = '<span class="pacman"><img src="./img/pacmanup.png"></span>';
      break;
    case 'ArrowDown':
      nextLocation.i++;
      pacman = '<span class="pacman"><img src="./img/pacmandown.png"></span>';
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      pacman = '<span class="pacman"><img src="./img/pacmanleft.png"></span>';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      pacman = '<span class="pacman"><img src="./img/pacmanright.png"></span>';
      break;
    default: return null;
  }

  return nextLocation;
}