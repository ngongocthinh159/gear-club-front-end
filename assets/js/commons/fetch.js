import { products, user } from '../mock-data/mock-data.js';

const MOCK_DELAY_TIME = 300;

/**
 *
 * @param {string} URL : The url to fetch that return JSON
 * @param {function} callback : The callback that will be called after fetch successfully
 */
function fetchData(URL, callback) {
  fetch(URL)
    .then((results) => results.json())
    .then((data) => callback(data))
    .catch((e) => console.log(e));

  // if (URL === 'get one product') {
  //   setTimeout(() => {
  //     callback(products[0]);
  //   }, MOCK_DELAY_TIME);

  //   return;
  // }

  // if (URL === 'get shopping cart') {
  //   setTimeout(() => {
  //     callback(products.slice(0, 3));
  //   }, MOCK_DELAY_TIME);

  //   return;
  // }

  // if (URL === 'get also like products') {
  //   setTimeout(() => {
  //     callback(products.slice(6, 10));
  //   }, MOCK_DELAY_TIME);

  //   return;
  // }

  // if (URL === 'user information') {
  //   setTimeout(() => {
  //     callback(user);
  //   }, MOCK_DELAY_TIME);

  //   return;
  // }

  // setTimeout(() => {
  //   callback(products);
  // }, MOCK_DELAY_TIME);
}

export { fetchData };
