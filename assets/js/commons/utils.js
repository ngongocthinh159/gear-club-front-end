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

export {
  numberWithCommas,
  getRandomIntInRange,
  capitalizeTheFirstLetterOfFirstWord,
};

