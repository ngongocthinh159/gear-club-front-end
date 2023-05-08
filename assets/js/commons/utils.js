function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeTheFirstLetterOfFirstWord(string) {
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      newString += string[i].toUpperCase();
    } else {
      newString += string[i];
    }
  }
  return newString;
}

function slugify(str) {
  const slug = str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return slug;
}

/**
 * @param {*} searchString window.location.search as input
 * @returns [[key1, value1], [key2, value2],...]
 */
function getKeyValueStringsFromURLSearch(searchString) {
  const res = [];
  const search = searchString.slice(1);

  const keyValueStrings = search.split('&');
  keyValueStrings.forEach((keyValueString) => {
    const temp = keyValueString.split('=');
    const key = temp[0];
    const value = temp[1];

    res.push([key, value]);
  });

  return res;
}

// Bearer token storage
function storeToken(token) {
  localStorage.setItem('SavedToken', 'Bearer ' + token);
}

function getToken() {
  return localStorage.getItem('SavedToken');
}

function removeToken() {
  localStorage.removeItem('SavedToken');
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const spinningAnimation = [
  { transform: 'translate(1px, 1px) rotate(0deg)' },
  { transform: 'translate(-1px, -2px) rotate(-1deg)' },
  { transform: 'translate(-3px, 0px) rotate(1deg)' },
  { transform: 'translate(3px, 2px) rotate(0deg)' },
  { transform: 'translate(1px, -1px) rotate(1deg)' },
  { transform: 'translate(-1px, 2px) rotate(-1deg)' },
  { transform: 'translate(-3px, 1px) rotate(0deg)' },
  { transform: 'translate(3px, 1px) rotate(-1deg)' },
  { transform: 'translate(-1px, -1px) rotate(1deg)' },
  { transform: 'translate(1px, 2px) rotate(0deg)' },
  { transform: 'translate(1px, -2px) rotate(-1deg)' },
];

const spinningAnimationTiming = {
  duration: 500,
  iterations: 1,
};

export {
  numberWithCommas,
  getRandomIntInRange,
  capitalizeTheFirstLetterOfFirstWord,
  slugify,
  getKeyValueStringsFromURLSearch,
  storeToken,
  getToken,
  removeToken,
  getRandomInt,
  spinningAnimation,
  spinningAnimationTiming,
};
