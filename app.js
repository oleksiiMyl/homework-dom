/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;

let activePlayer = 0;
let current = 0;
let finishScore = 100;
let playerNumber = 1;
const diceElements = document.querySelectorAll('.dice');
const scoreFieldWrap = document.querySelector('.field-wrap');
const scoreField = document.querySelector('.score-field');
const errorText = document.querySelector('.error-text');

const getPlayerName = (title) => {
  const name = prompt(title, '');

  if (name === null || name === '') {
    return `Player${playerNumber++}`;
  }
  return name;
};

const playerName1 = getPlayerName('Введите имя первого игрока');
const playerName2 = getPlayerName('Введите имя второго игрока');

function Gamer(name, score) {
  this.name = name;
  this.score = score;
}

Gamer.prototype.getScore = function () {
  return this.score;
};

Gamer.prototype.setScore = function (score) {
  this.score = score;
};

Gamer.prototype.resetScore = function () {
  this.score = 0;
};

const player1 = new Gamer(playerName1, 0);
const player2 = new Gamer(playerName2, 0);

const players = [player1, player2];

const initGame = () => {
  scoreFieldWrap.style.display = "block";
  document.querySelector('#name-0').textContent = player1.name;
  document.querySelector('#name-1').textContent = player2.name;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElements[0].style.display = 'none';
  diceElements[1].style.display = 'none';
  current = 0;
  player1.resetScore();
  player2.resetScore();
  finishScore = 100;
};

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;

  diceElements[0].src = `dice-${dice1}.png`;
  diceElements[1].src = `dice-${dice2}.png`;
  diceElements[0].style.display = 'block';
  diceElements[1].style.display = 'block';

  if (dice1 === dice2 || dice1 === RESET_VALUE || dice2 === RESET_VALUE) {
    changePlayer();
    
  } else {
    current += (dice1 + dice2);
    document.getElementById('current-'+activePlayer).textContent = current;

    if (players[activePlayer].getScore() + current >= finishScore) {
      alert(`Player ${players[activePlayer].name} won!!!`);
    }
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElements[0].style.display = 'none';
  diceElements[1].style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

document.querySelector('.btn-hold').addEventListener('click', function() {
  players[activePlayer].setScore(players[activePlayer].getScore() + current);
  document.querySelector(`#score-${activePlayer}`).textContent = players[activePlayer].getScore();
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

document.querySelector('.btn-apply').addEventListener('click', function () {
  let currentValue = scoreField.value;

  if (!isNaN(currentValue)) {
    errorText.style.display = 'none';
    scoreField.classList.remove('invalid');

    if (Number(currentValue) > 0) {
      finishScore = Number(currentValue);
    }
    scoreField.value = '';
    scoreFieldWrap.style.display = "none";

  } else {
    errorText.style.display = 'block';
    scoreField.classList.add('invalid');
  }
});
