'use strict';

var gCurrNum;
var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// var gNums = [];
var gClick = 0;
var gstartTime;
var endTime;
var isTimeOn = false;

function init() {
    createNums(16);
    renderGame();
}

function renderGame() {
    gCurrNum = 1;
    createTable();
    //initial board
}

function newGame(elLevel) { // size
    createNums(elLevel); // size
    renderGame();
    // init()
}

function shuffle(nums) {
    //shuffle gNums
    for (var i = nums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

}

function createNums(elLevel) //to size
{
    gNums = [];
    var size = 0;
    if (elLevel.innerText === 'Easy') size = 16;
    else if (elLevel.innerText === 'Hard') size = 25;
    else if (elLevel.innerText === 'Extreme') size = 36;
    else size = 16;
    for (var i = 1; i <= size; i++) {
        gNums.push(i)
    }
}

function createTable() {
    var strHTML = '';
    // change to general size
    var gNumsCopy = gNums.slice();
    shuffle(gNumsCopy);
    var size = Math.sqrt(gNumsCopy.length);
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < size; j++) {
            var applyNum = gNumsCopy.pop();
            strHTML += `<td onclick="checkIfCorrect(this,${applyNum})">${applyNum}</td>`
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
function checkIfCorrect(elCell, num) {
    gClick++;
    var elMessage = document.querySelector('.message');
    if (gClick === 1) {
        isTimeOn = true;
        startTime = Date.now()
        // startClock();
    }
    if (num === gCurrNum) {
        changeColorNumber(elCell);
        disableCell(elCell);
        if (gCurrNum === gNums.length) {
            elMessage.innerText = 'You completed the game!'
            setTimeout(function () { elMessage.innerText = ''; }, 1000);
            isTimeOn = false;
            setTimeout(renderGame, 2000);
        } else {
            gCurrNum++;
        }
    }
}

function changeColorNumber(elCell) {
    elCell.style.backgroundColor = 'rgb(218, 208, 212)';
}

function disableCell(elCell) {
    elCell.onclick = '';
    //to remove hober
    elCell.classList.add('disabled');
}


function startClock(startTime) {
    console.log(startTime);
    var elTimer = document.querySelector('.timer');
    var strHTML = '';
    strHTML += '<button onclick="foo()">New Game</button>'
    // while (isTimeOn){
    //     var elTimer = document.querySelector('.timer');
    //     var currTime = Date.now()
    //     // strHTML += `<h4>${currTime - startTime}</h4>`
    //     strHTML += '<button>New Game</button>'
    // }
    elTimer.innerHTML = strHTML;
}
