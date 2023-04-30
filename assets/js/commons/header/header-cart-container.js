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
        <ul class="header__cart-list">
          <li class="header__cart-item">
            <img
              src="./assets/imgs/home/mock-product-2.webp"
              alt="Product image"
              class="header__cart-item-img"
            />

            <div class="header__cart-item-body">
              <div class="header__cart-item-infor">
                <a href="" class="header__cart-item-name">
                  Chuột không dây siêu nhẹ Pulsar X2 Wireless Aim Trainer
                  Pack (Limited Edition)
                </a>
                <span class="header__cart-item-total-price"
                  >2.499.000đ</span
                >
                <span class="header__cart-item-total-quantity"
                  >Còn lại: 8</span
                >
              </div>

              <div class="header__cart-item-control">
                <input
                  type="number"
                  name=""
                  id=""
                  class="header__cart-item-quantity-input"
                />
                <button class="header__cart-item-remove-btn" data-cart-toggler>Bỏ</button>
              </div>
            </div>
          </li>

          <li class="header__cart-item">
            <img
              src="./assets/imgs/home/mock-product-2.webp"
              alt="Product image"
              class="header__cart-item-img"
            />

            <div class="header__cart-item-body">
              <div class="header__cart-item-infor">
                <a href="" class="header__cart-item-name">
                  Chuột không dây siêu nhẹ Pulsar X2 Wireless Aim Trainer
                  Pack (Limited Edition)
                </a>
                <span class="header__cart-item-total-price"
                  >2.499.000đ</span
                >
                <span class="header__cart-item-total-quantity"
                  >Còn lại: 8</span
                >
              </div>

              <div class="header__cart-item-control">
                <input
                  type="number"
                  name=""
                  id=""
                  class="header__cart-item-quantity-input"
                />
                <button class="header__cart-item-remove-btn" data-cart-toggler>Bỏ</button>
              </div>
            </div>
          </li>
        </ul>
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
}

function handleCartContainerEvents(headerDOMNode) {
  const cartTogglers = headerDOMNode.querySelectorAll('[data-cart-toggler]');
  const cartContainer = headerDOMNode.querySelector(
    '.header__cart-container-wrapper'
  );

  cartTogglers.forEach((cartToggler) => {
    cartToggler.addEventListener('click', (e) => {
      e.stopPropagation();
      cartContainer.classList.toggle('header__cart-container--active');
    });
  });
  cartTogglers.forEach((cartToggler) => {
    cartToggler.addEventListener('click', () => {
      cartContainer.classList.toggle('header__cart-container-wrapper--active');
    });
  });
}

export { renderCartContainer };
