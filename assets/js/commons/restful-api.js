const BASE_URL = 'http://localhost:8080';

BASE_URL + '/upadate/id';

const API = {
  // Authentication
  getRegisterAPI() {
    return BASE_URL + '/api/auth/register';
  },
  getAuthenticateAPI() {
    return BASE_URL + '/api/auth/authenticate';
  },

  // User
  getUserInformationAPI() {
    return BASE_URL + '/api/customer/personal-information';
  },

  // Product
  getAllProductAPI() {
    return BASE_URL + '/api/product/all';
  },
  getFilteredProductAPI(currentURL) {
    // Build path name
    let pathName = '/api/product/filter/';
    const pathNameFromCurrentURL = currentURL.split('?')[1]; // pageNum=1&itemsPerPage=16&availability=true

    pathName += pathNameFromCurrentURL;
    return BASE_URL + pathName;
  },
  getProductByIdAPI(productId) {
    return BASE_URL + '/api/product/' + productId;
  },
  getAlsoLikeProducts(currentProductCategory) {
    return (
      BASE_URL + '/api/product/filter/' + `categories=${currentProductCategory}`
    );
  },

  // Collection
  getAllTrendingCollection() {
    return BASE_URL + '/api/collection/all';
  },
  getTrendingCollectionByNameAPI(collectionName) {
    return BASE_URL + '/api/collection/' + collectionName;
  },

  // Shopping cart
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
  getupdateUserInformationAPI() {
    return BASE_URL + 'update user information';
  },
};

export { API };
