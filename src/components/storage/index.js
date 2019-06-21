const getFromStorage = key => localStorage.getItem(key);

const setToStorage = (key, value) => localStorage.setItem(key, value);

export {
  getFromStorage,
  setToStorage
};