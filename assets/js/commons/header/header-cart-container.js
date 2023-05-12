import { fetchData, request } from '../fetch.js';
import { getProductCartItemFactory } from '../product-cart-item-factory.js';
import { API } from '../restful-api.js';
import { getToken } from '../utils.js';

const COUNTRY_CURRENCY = 'VND';

function renderCartContainer(headerDOMNode) {
  const cartContainerWrapperDOMElement = headerDOMNode.querySelector(
    '.header__cart-container-wrapper'
  );
  cartContainerWrapperDOMElement.innerHTML = `
    <div class="header__cart-overlay" data-cart-toggler></div>

    <div class="header__cart-container">
      <div class="header__cart-header">
        <div class="header__cart-heading-wrapper">
          <h3 class="header__cart-heading">Giỏ hàng</h3>
          <button class="header__cart-close-btn" data-cart-toggler>
            <i class="header__cart-close-btn-icon bi bi-x"></i>
          </button>
        </div>

        <span class="header__cart-free-shipping-text"
          >Bạn được giao hàng miễn phí</span
        >
        <div class="header__cart-header-separator"></div>
      </div>




      <!-- Render cart list inside cart body -->
      <div class="header__cart-body"></div>




      <div class="header__cart-footer">
        <div class="header-cart-footer__price-wrapper">
          <span class="header-cart-footer__price-text">Tổng</span>
          <div class="header-cart-footer__price-num-wrapper">
            
            <span class="header-cart-footer__country-currency">${COUNTRY_CURRENCY}</span>
          </div>
        </div>

        <div class="header-cart-footer__shipping-text">
          Đã bao gồm thuế;
          <a href="" class="header-cart-footer__shipping-link">Phí ship</a>
          sẽ được tính khi thanh toán
        </div>

        <div class="header-cart-footer__control">
          <a href="./cart.html" class="header-cart-footer__cart-btn btn btn-dark">
            Giỏ hàng
          </a>
          <button href="./payment.html" class="header-cart-footer__payment-btn btn btn-primary btn-icon btn-icon-leading">
            <i class="bi bi-credit-card"></i>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  `;

  // Handel events
  handleCartContainerEvents(headerDOMNode);

  const cartBody = headerDOMNode.querySelector('.header__cart-body');
  const priceNumWrapper = headerDOMNode.querySelector(
    '.header-cart-footer__price-num-wrapper'
  );

  // Fetch current cart => Render
  const token = getToken();
  if (!token) {
    return;
  }
  const options = {
    headers: {
      Authorization: token,
    },
  };
  request(API.getCurrentCartAPI(), options, (cart) => {
    const products = cart.productList;

    // Data transformation then transfer to list options
    products.forEach((product) => {
      product.totalQuantity = product.quantity;
      product.currentQuantity = product.paymentQuantity;
    });

    // Get the list of cart items
    const options = {
      products: products,
      additionalClasses: {
        cartListItems: 'header__cart-list',
        cartItemProductPriceWrapper: 'd-none',
      },
    };
    const [cartListItems, listTotalPriceDOMNode] =
      getProductCartItemFactory().buildListItems(options);

    // Append total price node to total price wrapper
    priceNumWrapper.prepend(listTotalPriceDOMNode);

    cartBody.appendChild(cartListItems);
  });
}

function handleCartContainerEvents(headerDOMNode) {
  // Handle toggle UI
  const cartTogglers = headerDOMNode.querySelectorAll('[data-cart-toggler]');
  const cartContainer = headerDOMNode.querySelector(
    '.header__cart-container-wrapper'
  );

  cartTogglers.forEach((cartToggler) => {
    cartToggler.onclick = () => {
      if (window.location.pathname === '/cart.html') {
        window.location.reload();
        return;
      }

      cartContainer.classList.toggle('header__cart-container-wrapper--active');
    };
  });

  // Handle payment btn click
  const paymentBtn = headerDOMNode.querySelector(
    '.header-cart-footer__payment-btn'
  );
  paymentBtn.addEventListener('click', () => {
    const cartItems = headerDOMNode.querySelector('.cart-item');

    // If there is nothing in cart => Show toast
    if (!cartItems) {
      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        onclick: null,
        showDuration: '300',
        hideDuration: '1000',
        timeOut: '3000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut',
      };

      toastr['error'](
        'Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán',
        'Lỗi'
      );

      return;
    }

    // There is at least 1 in cart => Go to payment page
    window.location.href = '/payment.html';
  });
}

export { renderCartContainer };
