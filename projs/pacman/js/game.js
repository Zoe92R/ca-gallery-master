'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const CHERRY = '🍒';
const SUPER_FOOD = '🥚';

var gBoard;

var gIntervalCherry;

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(randCherry, 15000);
}

function buildBoard() {
    var SIZE = 10; // to cahne to 10
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
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][SIZE-2] = SUPER_FOOD
    board[SIZE-2][1] = SUPER_FOOD
    board[SIZE-2][SIZE-2] = SUPER_FOOD

    return board;
}


function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    // TODO: update model and dom
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    showNewGame();  
}


function playAgain() {
    gGame.score= 0;
    gGhosts = [];
    hideNewGame()
    init();
}


function getEmptyCells(checkFor) {
    var emptyCells = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            var currCell = gBoard[i][j];
            if (currCell === checkFor) {
                emptyCells.push({ i, j });
            }
        }
    }
    return emptyCells;
}

function randCherry() {
    var emptyCells = getEmptyCells(FOOD).concat(getEmptyCells(EMPTY));
    var randNum = getRandomIntInclusive(0, emptyCells.length)
    var randPos = emptyCells[randNum];
    gBoard[randPos.i][randPos.j] = CHERRY;
    renderCell(randPos, CHERRY);
}

// function checkVictory(){
//     var emptyPoses = getEmptyCells(EMPTY);
//     return (emptyPoses.length === 1);
// }