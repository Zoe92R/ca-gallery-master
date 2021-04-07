'use strict'
const PACMAN = '😛';
// var gIntervalSuper;

var gPacman;


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === CHERRY) updateScore(10);
    // debugger;
    if (nextCell === SUPER_FOOD && gPacman.isSuper === false) {
    //    gPacman.isSuper = true; 
        superPacman();
        setTimeout(notSuperPacman, 5000)
    }   // to set time for 5 sec
    if (nextCell === FOOD) {
        updateScore(1);
        var emptyPoses = getEmptyCells(FOOD);
        if (emptyPoses.length === 1) { //checking for victory
            console.log('victory!');
            gameOver();
        }
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper){
            killGhost(nextLocation);
            renderCell(nextLocation, PACMAN)
            // gDeadGhosts = gGhosts.
        }
        else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, PACMAN)
    // TODO: return if cannot move
    // TODO: hitting a ghost?  call gameOver
    // TODO: update the model
    // TODO: update the DOM
    // TODO: Move the pacman
    // TODO: update the model
    // TODO: update the DOM
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default:
            return null
    }

    return nextLocation;
}

function superPacman() {
    gPacman.isSuper = true;
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    return;
}

function notSuperPacman() {
    gPacman.isSuper = false;
    reviveGhosts();
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    return;
}

function killGhost(nextLocation) {
    for (var n = 0 ; n < gGhosts.length ; n++)
    var currGhostLoc = gGhosts[n].location;
        if (currGhostLoc.i === nextLocation.i && currGhostLoc.j === nextLocation.j){
            gDeadGhosts = gGhosts.splice(0,1,n);
            // to check if splice work for the 0 index
            return;
        }
    return;
}

function reviveGhosts() {
    gGhosts.concat(gDeadGhosts);
    gDeadGhosts = []
}