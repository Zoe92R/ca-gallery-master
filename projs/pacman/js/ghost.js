'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: makeRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    createGhost(board)
    createGhost(board)
    createGhost(board)
    // TODO: 3 ghosts and an interval
    
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL || nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        gameOver()
        return;
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)
    // TODO: return if cannot move
    // TODO: hitting a pacman?  call gameOver
    ghost.location = nextLocation

    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
    // TODO: update the model
    // TODO: update the DOM
    // TODO: Move the ghost
    // TODO: update the model
    // TODO: update the DOM
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function makeRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getGhostHTML(ghost) {
    // return `<span style="color:${ghost.color};">${GHOST}</span>`
    if (gPacman.isSuper) return `<span style="color:blue;">${GHOST}</span>`
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}
