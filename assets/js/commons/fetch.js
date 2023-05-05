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
}

function request(URL, options, callback) {
  fetch(URL, options)
    .then((results) => results.json())
    .then((data) => callback(data))
    .catch((e) => console.log(e));
}

export { fetchData, request };
