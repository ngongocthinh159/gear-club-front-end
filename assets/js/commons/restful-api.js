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
  getPaymentAPI() {
    return BASE_URL + '/api/customer/cart/payment';
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
  updateProduct() {
    return BASE_URL + '/api/product/';
  },
  getProductByName() {
    return BASE_URL + '/api/product/search-by-string';
  },

  // Collection
  getAllTrendingCollection() {
    return BASE_URL + '/api/collection/all';
  },
  getTrendingCollectionByNameAPI(collectionName) {
    return BASE_URL + '/api/collection/' + collectionName;
  },
  updateCollection() {
    return BASE_URL + '/api/collection/';
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

  // Admin
  getAllCartsAPI() {
    return BASE_URL + '/api/customer/all-cart';
  },
  getCartByCustomerIdAndCartPosition(customerId, cartPosition) {
    return (
      BASE_URL +
      `/api/customer/cart?customerId=${customerId}&cartPosition=${cartPosition}`
    );
  },
  getCartAcceptAPI() {
    return BASE_URL + '/api/customer/cart/accept-cart';
  },
  getCartDeclineAPI() {
    return BASE_URL + '/api/customer/cart/decline-cart';
  },
};

export { API };
