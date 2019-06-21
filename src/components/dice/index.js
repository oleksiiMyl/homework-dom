const hideDices = (arr) => {
  arr.forEach(function (el) {
    el.style.display = 'none'
  })
};

const showDices = (arr) => {
  arr.forEach(function (el) {
    el.style.display = 'block'
  })
};

const getRandom = () => Math.floor(Math.random() * 6) + 1;

export {
  hideDices,
  showDices,
  getRandom
};