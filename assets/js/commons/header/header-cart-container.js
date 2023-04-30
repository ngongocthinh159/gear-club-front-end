import { fetchData } from '../fetch.js';
import { getProductCartItemFactory } from '../product-cart-item-factory.js';

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

      <div class="header__cart-body">
        <ul class="header__cart-list"></ul>
      </div>

      <div class="header__cart-footer">
        <div class="header-cart-footer__price-wrapper">
          <span class="header-cart-footer__price-text">Tổng</span>
          <span class="header-cart-footer__price-num">5.878.000 VND</span>
        </div>

        <div class="header-cart-footer__shipping-text">
          Đã bao gồm thuế;
          <a href="" class="header-cart-footer__shipping-link">Phí ship</a>
          sẽ được tính khi thanh toán
        </div>

        <div class="header-cart-footer__control">
          <a href="./cart.html" class="header-cart-footer__payment-btn btn btn-dark">
            Giỏ hàng
          </a>
          <button class="header-cart-footer__payment-btn btn btn-primary btn-icon btn-icon-leading">
            <i class="bi bi-credit-card"></i>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  `;

  // Handel events
  handleCartContainerEvents(headerDOMNode);

  // Fetch shopping cart product => Render
  fetchData('get shopping cart', (products) => {
    const cartListUl = headerDOMNode.querySelector('.header__cart-list');

    products.forEach((product) => {
      const options = {
        productDetail: {
          id: product.id,
          images: product.images,
          name: product.name,
          totalQuantity: product.quantity,
          currentQuanity: 3,
          price: product.price,
        },
        additionalClasses: {
          cartItemProductPrice: 'd-none',
        },
      };
      const cartItem = getProductCartItemFactory(options).buildItem();
      cartListUl.appendChild(cartItem);
    });
  });
}

function handleCartContainerEvents(headerDOMNode) {
  const cartTogglers = headerDOMNode.querySelectorAll('[data-cart-toggler]');
  const cartContainer = headerDOMNode.querySelector(
    '.header__cart-container-wrapper'
  );

  cartTogglers.forEach((cartToggler) => {
    cartToggler.addEventListener('click', () => {
      if (window.location.pathname === '/cart.html') {
        window.location.reload();
        return;
      }

      cartContainer.classList.toggle('header__cart-container-wrapper--active');
    });
  });
}

export { renderCartContainer };
