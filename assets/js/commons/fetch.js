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

    return;
  } 
  
  if (URL === 'get shopping cart') {
    setTimeout(() => {
      callback(products.slice(0, 8));
    }, 500);

    return;
  }

  if (URL === 'get also like products') {
    setTimeout(() => {
      callback(products.slice(6, 10));
    }, 500);

    return;
  }
  
  setTimeout(() => {
    callback(products);
  }, 500);
}

export { fetchData };
