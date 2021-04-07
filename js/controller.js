'use strict';

var gProjs = [
  {
    "id": "minesweeper",
    "name": "mine-sweeper",
    "title": "mine Sweeper",
    "desc": "Mine sweeper is a single player puzzle game. The objective of the game is to clear a rectangular board containing hidden \"mines\" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.",
    "url": "projs/minesweeper",
    "publishedAt": 1448693940000,
    "img": "minesweeper.jpg",
    "labels": ["Matrixes", ",Games"]
  },
  {
    "id": "touchnums",
    "name": "Touch the Nums",
    "title": "Touch the Nums",
    "desc": "Touch the nums is a board game. The player should click the buttons in a sequnce until all numbers are clicked.",
    "url": "projs/touchnums",
    "publishedAt": 1448693940000,
    "img": "touchnums.jpg",
    "labels": ["Matrixes", ",Games"]
  },
  {
    "id": "pacman",
    "name": "pacman",
    "title": "Pacman",
    "desc": "Pac-Man is a maze chase video game. The player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze while avoiding ghosts ",
    "url": "projs/pacman",
    "publishedAt": 1448693940000,
    "img": "pacman.jpg",
    "labels": ["Matrixes", ",Games"]
  }
]

function initPage() {
  renderProjs();
}


function renderProjs() {
  var strHTMLs = gProjs.map(function (proj) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" >
            <div class="portfolio-hover" onclick="renderModal('${proj.id}')">
              <div class="portfolio-hover-content" >
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.img}" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">${proj.labels.join(' ')}</p>
          </div>
        </div>
        `
  }).join('')
  var elProj = document.querySelector('.proj-container')
  elProj.innerHTML = strHTMLs
}


function renderModal(id) {
  console.log(id)
  var proj = getProjById(id)
  console.log(proj)
  var strHTMLs = `
    <h2>${proj.title}</h2>
    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.img}" alt="">
    <p>${proj.desc}</p>
    <ul class="list-inline">
      <li>Date: January 2017</li>
      <li>Client: Threads</li>
      <li>Category: Illustration</li>
    </ul>
    <a href="${proj.url}">Click to see the game</a>
    <br>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>
    `
  var elModal = document.querySelector('.modal-body')
  elModal.innerHTML = strHTMLs

}