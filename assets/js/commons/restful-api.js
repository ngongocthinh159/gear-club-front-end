const BASE_URL = 'http://localhost:8080';

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
  getUpdateUserInformationAPI() {
    return BASE_URL + '/api/customer/update-personal-information';
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
  getIncreaseProductQuantityInCartAPI() {
    return BASE_URL + '/api/customer/cart/increase-qty';
  },
  getDecreaseProductQuantityInCartAPI() {
    return BASE_URL + '/api/customer/cart/reduce-qty';
  },
  getRemoveProductInCartAPI() {
    return BASE_URL + '/api/customer/cart/remove-item';
  },
  getAddProductToCartAPI(productId, quantity) {
    return BASE_URL + '/api/customer/cart/add-item';
  },
  getPaymentAPI() {
    return BASE_URL + '/api/customer/cart/payment';
  },
};

export { API };
