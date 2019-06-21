const findGamer = (arr, name) => arr.some(gamer => gamer.name === name);

const getGamer = (arr, name) => arr.find(gamer => gamer.name === name);

const showWinners = arr => {
  let res = '';

  arr.sort((a, b) => b.winsNumber - a.winsNumber);
  arr.forEach(function (el) {
    res += `${el.name} wins ${el.winsNumber} times\n`;
  });

  return res;
};

export {
  findGamer,
  getGamer,
  showWinners,
};