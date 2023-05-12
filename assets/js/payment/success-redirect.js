import { request } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getToken } from '../commons/utils.js';

function changeInDatabase() {
  // Else proceed the payment
  const token = getToken();
  if (!token) {
    window.location.replace('/');
    return;
  }

  const options = {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
  };
  request(API.getPaymentAPI(), options, (result) => {
    window.location.replace('/');
    return;
  });
}

export { changeInDatabase };
