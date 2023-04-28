import { products } from '../mock-data/mock-data.js';

/**
 *
 * @param {string} URL : The url to fetch that return JSON
 * @param {function} callback : The callback that will be called after fetch successfully
 */
function fetchData(URL, callback) {
  // fetch(URL)
  //   .then((results) => results.json())
  //   .then((data) => callback(data))
  //   .catch((e) => console.log(e));

  if (URL === 'get one product') {
    setTimeout(() => {
      callback(products[0]);
    }, 500);
  } else {
    setTimeout(() => {
      callback(products);
    }, 500);
  }
}

export { fetchData };
