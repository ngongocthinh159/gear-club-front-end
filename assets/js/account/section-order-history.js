import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getToken } from '../commons/utils.js';
import { request } from '../commons/fetch.js';


function renderSectionOrderHistory(secAccountMainDOMNode, stateChangeNode) {
  const loadingClass = stateChangeNode.classList[0] + '--loading';
  stateChangeNode.classList.add(loadingClass);

  // Fetch data about order history, then update UI
  const options = {
    headers: {
      Authorization: getToken(),
    },
  };
  request(API.getUserInformationAPI(), options, (result) => {
    secAccountMainDOMNode.innerHTML = `
      ${JSON.stringify(result)}
    `;

    stateChangeNode.classList.remove(loadingClass);
  });
}

export { renderSectionOrderHistory };
