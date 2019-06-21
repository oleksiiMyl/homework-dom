import { getFromStorage, setToStorage } from "./components/storage";
import { findGamer, showWinners } from "./components/iterations";
import { getPlayerName, createPlayer } from './components/gamer';
import { getRandom, showDices, hideDices } from "./components/dice";

const RESET_VALUE = 2;
let activePlayer = 0;
let current = 0;
let finishScore = 100;
let winners = [];
const diceElements = document.querySelectorAll('.dice');
const scoreFieldWrap = document.querySelector('.field-wrap');
const scoreField = document.querySelector('.score-field');
const errorText = document.querySelector('.error-text');

if (getFromStorage('winners') !== null) {
  winners = JSON.parse(getFromStorage('winners'));
}

const player1 = createPlayer(getPlayerName('Введите имя первого игрока'), winners);
const player2 = createPlayer(getPlayerName('Введите имя второго игрока'), winners);

const players = [player1, player2];

const initGame = () => {
  scoreFieldWrap.style.display = "block";
  document.querySelector('#name-0').textContent = players[0].name;
  document.querySelector('#name-1').textContent = players[1].name;
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  hideDices(diceElements);
  players[0].resetScore();
  players[1].resetScore();
  current = 0;
  finishScore = 100;
};

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  let dice1 = getRandom();
  let dice2 = getRandom();

  diceElements[0].src = `images/dice-${dice1}.png`;
  diceElements[1].src = `images/dice-${dice2}.png`;
  showDices(diceElements);
  const playerName = players[activePlayer].name;

  if (dice1 === dice2 || dice1 === RESET_VALUE || dice2 === RESET_VALUE) {
    changePlayer();
    
  } else {
    current += (dice1 + dice2);
    document.getElementById('current-'+activePlayer).textContent = current;

    if (players[activePlayer].getScore() + current >= finishScore) {
      alert(`Player ${playerName} won!!!`);
      players[activePlayer].winsNumber++;

      if (!findGamer(winners, playerName) && playerName.indexOf('Player') === -1) {
        winners.push(players[activePlayer]);
      }

      setToStorage('winners', JSON.stringify(winners));
    }
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  hideDices(diceElements);
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

document.querySelector('.btn-show').addEventListener('click', function() {
  alert(showWinners(winners));
});
