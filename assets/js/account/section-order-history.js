import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';

function renderSectionOrderHistory(secAccountMainDOMNode, stateChangeNode) {
  const loadingClass = stateChangeNode.classList[0] + '--loading';
  stateChangeNode.classList.add(loadingClass);

  // Fetch data about order history, then update UI
  fetchData('get order history', () => {
    secAccountMainDOMNode.innerHTML = `
      123
    `;

    stateChangeNode.classList.remove(loadingClass);
  });
}

export { renderSectionOrderHistory };
