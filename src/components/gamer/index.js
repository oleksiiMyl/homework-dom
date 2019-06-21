import { findGamer, getGamer } from "../iterations";

function Gamer(name, score, winsNumber) {
  this.name = name;
  this.score = score;
  this.winsNumber = winsNumber;
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

let playerNumber = 1;

const getPlayerName = (title) => {
  const name = prompt(title, '');

  if (name === null || name === '') {
    return `Player${playerNumber++}`;
  }
  return name;
};

const createPlayer = (inputName, arr) => {
  if (findGamer(arr, inputName)) {
    const gamer = getGamer(arr, inputName);
    Object.setPrototypeOf(gamer, Gamer.prototype);
    return gamer;
  }
  return new Gamer(inputName, 0, 0);
};

export {
  getPlayerName,
  createPlayer
};