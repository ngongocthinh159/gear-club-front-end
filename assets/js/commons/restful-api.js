const BASE_URL = '';

BASE_URL + "/upadate/id";

const API = {
  getIncreaseProductQuantityInCartAPI(productId) {
    return BASE_URL + 'increase path name';
  },
  getDecreaseProductQuantityInCartAPI(productId) {
    return BASE_URL + 'decrease path name';
  },
  getRemoveProductInCartAPI(productId) {
    return BASE_URL + 'remove path name';
  },
};

export { API };
