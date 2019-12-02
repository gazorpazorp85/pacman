var ghostImage = '<img src="./img/ghost.png">';
var gIntervalGhosts;
var gGhosts;
var gGhostsColors = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        prevColor: '',
        isDead: false

    };
    ghost.prevColor = ghost.color;
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = ghostImage;
}


function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 500);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (!ghost.isDead) {

            var moveDiff = getMoveDiff();
            var nextLocation = { i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j }

            if (gBoard[nextLocation.i][nextLocation.j] === WALL ||
                gBoard[nextLocation.i][nextLocation.j] === WALL) return

            if (gBoard[nextLocation.i][nextLocation.j] === pacman) {
                if (gPacman.isSuper === true) {
                    gBoard[nextLocation.i][nextLocation.j] === EMPTY;
                    gGhosts.splice(0, 1);
                } else {
                    gameOver();
                    return
                }

            }
            
            if (gBoard[nextLocation.i][nextLocation.j] === ghostImage) {
                return
            }
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
            renderCell(ghost.location, ghost.currCellContent)
            ghost.location = nextLocation
            ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]
            gBoard[ghost.location.i][ghost.location.j] = ghostImage
            renderCell(ghost.location, getGhostHTML(ghost))
        }
    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function killGhost(location) {

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            ghost.isDead = true;
        }
    }
}

function reviveGhosts() {

    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].isDead = false;
    }
}

function ghostChangeColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        ghostImage = '<img src="./img/ghost-1.png">'
        gGhosts[i].color = '#0000FF';
    }
}

function changeGhostColorBack() {
    for (var i = 0; i < gGhosts.length; i++) {
        ghostImage = '<img src="./img/ghost.png">'
        gGhosts[i].color = gGhosts[i].prevColor;
    }
}

function getGhostHTML(ghost) {
    if (ghost.isdead) {
        return EMPTY;
    }
    return `<span class="ghost" style="background-color: ${ghost.color}" >${ghostImage}</span>`
}






