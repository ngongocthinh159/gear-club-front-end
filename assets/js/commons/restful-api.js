// BASE_URL in production
// let BASE_URL = 'http://54.254.163.226:8080';
let BASE_URL = 'https://gearclub.duckdns.org:8443';

// BASE_URL in development
if (
  window.location.href.includes('localhost') ||
  window.location.href.includes('127.0.0.1')
) {
  BASE_URL = 'http://localhost:8080';
}

const API = {
  // Authentication
  getRegisterAPI() {
    return BASE_URL + '/api/auth/register';
  },
  getAuthenticateAPI() {
    return BASE_URL + '/api/auth/authenticate';
  },
  getAuthenticateAdminAPI() {
    return BASE_URL + '/api/auth/authenticate/admin';
  },

  // User
  getAllUser() {
    return BASE_URL + '/api/customer/all';
  },
  searchUser() {
    return BASE_URL + '/api/customer/search-by-string';
  },
  getUserInformationAPI() {
    return BASE_URL + '/api/customer/personal-information';
  },
  getUpdateUserInformationAPI() {
    return BASE_URL + '/api/customer/update-personal-information';
  },
  getAllPurchasedCartsOfACustomerAPI() {
    return BASE_URL + '/api/customer/purchased-carts/all';
  },
  getCurrentCartAPI() {
    return BASE_URL + '/api/customer/cart/current';
  },
  getCreatePaymentIntentAPI() {
    return BASE_URL + '/api/customer/cart/create-payment';
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
    return BASE_URL + '/api/admin/all-cart';
  },
  getCartByCustomerIdAndCartPosition(customerId, cartPosition) {
    return (
      BASE_URL +
      `/api/admin/cart?customerId=${customerId}&cartPosition=${cartPosition}`
    );
  },
  getCartAcceptAPI() {
    return BASE_URL + '/api/admin/cart/accept-cart';
  },
  getCartDeclineAPI() {
    return BASE_URL + '/api/admin/cart/decline-cart';
  },
  getAllCustomerAPI() {
    return BASE_URL + '/api/admin/all-customers';
  },
  getUpdateCustomerAPI() {
    return BASE_URL + '/api/admin/update-customer';
  },
  updateProduct() {
    return BASE_URL + '/api/product/';
  },
  getAllSoftDeleteProductsAPI() {
    return BASE_URL + '/api/product/deleted';
  },
  getRecoverProductByIdAPI(productId) {
    return BASE_URL + '/api/product/recover/' + productId;
  },
  getSoftDeleteProductByIdAPI(productId) {
    return BASE_URL + '/api/product/soft-delete/' + productId;
  },
  getSendEmailToAllSubscribersAPI() {
    return BASE_URL + '/api/admin/send-email-to-all-subscribers';
  },
  getSendEmailToOneSubscriberAPI(subscriberId) {
    return BASE_URL + '/api/admin/send-email-to-one-subscriber/' + subscriberId;
  },

  // Subscriber
  getEmailSubscribeAPI(email) {
    return BASE_URL + '/api/subscriber/' + email;
  },
  getAllSubscribersAPI() {
    return BASE_URL + '/api/subscriber/all';
  },
  getDeleteSubscribersByIdAPI(subscriberId) {
    return BASE_URL + '/api/subscriber/delete/' + subscriberId;
  }
};

export { API, BASE_URL };
