const BASE_URL = '';

BASE_URL + '/upadate/id';

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
  getAddProductToCartAPI(productId, quantity) {
    return BASE_URL + 'add path name';
  },
  getShoppingCartAPI() {
    return BASE_URL + 'get shopping cart';
  },
  getUserInformationAPI() {
    return BASE_URL + 'user information';
  },
  getupdateUserInformationAPI() {
    return BASE_URL + 'update user information';
  },
};

export { API };
