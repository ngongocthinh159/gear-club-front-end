import { fetchData, request } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import {
  getToken,
  removeToken,
  spinningAnimation,
  spinningAnimationTiming,
} from '../commons/utils.js';
import { getProductCartItemFactory } from '../commons/product-cart-item-factory.js';
import { initialize, checkStatus, handleSubmit } from './checkout.js';

function renderSectionPayment(sectionPaymentDOMNode) {
  sectionPaymentDOMNode.innerHTML = `
    <div class="grid wide">
      <div class="row">
        <div class="col l-7 m-12 c-12 order-left">
          <div class="sec-payment__left-container">
            
          </div>
        </div>





        <div class="col l-5 m-12 c-12 order-right">
          <div class="sec-payment__right-container">
            <label for="summary-toggler" class="sec-payment__summary-label">
              <i class="bi bi-cart"></i>
              <span class="summary-show"
                >Hiện tổng quan đơn hàng<i class="bi bi-chevron-down"></i
              ></span>
              <span class="summary-hide">Ẩn tổng quan đơn hàng<i class="bi bi-chevron-up"></i></span>
            </label>
            <input type="checkbox" id="summary-toggler" hidden checked />

            <div class="sec-payment__summary">
              <div class="sec-payment__summary-wrapper">



                <!--- Product list render here -->
                <div class="sec-payment__prod-list-wrapper"></div>



                <div class="sec-payment__sub-total-wrapper">
                  <span class="sec-payment__sub-total-text">Tổng phụ</span>
                  <span class="sec-payment__sub-total-num-wrapper">
                    <span class="sec-payment__sub-total-num"
                      ></span
                    >
                    <span class="sec-payment__sub-total-num-currency"
                      >₫</span
                    >
                  </span>
                </div>

                <div class="sec-payment__shipping-wrapper">
                  <span class="sec-payment__sub-shipping-left-text"
                    >Vận chuyển <i class="bi bi-truck"></i
                  ></span>
                  <span class="sec-payment__sub-shipping-right-text"
                    >Miễn phí</span
                  >
                </div>

                <div class="sec-payment__total-wrapper">
                  <span class="sec-payment__total-text">Tổng</span>
                  <span class="sec-payment__total-num-wrapper">
                    <span class="sec-payment__total-num-country-currency"
                      >VND</span
                    >

                    <!--- Total price render herer -->
                    <span class="sec-payment__total-num"></span>

                    <span class="sec-payment__total-num-currency">₫</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Get current cart => Render personal information first
  // Having current cart => Then render summary
  // renderSummary() is called inside renderPersonalInformation(), after it done
  renderPersonalInformation(sectionPaymentDOMNode);
}

function renderSummary(sectionPaymentDOMNode, cart) {
  const productListWrapper = sectionPaymentDOMNode.querySelector(
    '.sec-payment__prod-list-wrapper'
  );
  const totalPrice = sectionPaymentDOMNode.querySelector(
    '.sec-payment__total-num'
  );
  const subTotalNum = sectionPaymentDOMNode.querySelector(
    '.sec-payment__sub-total-num'
  );

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
      cartListItems: 'sec-payment__prod-list',
      cartItemProductPriceWrapper: 'd-none',
      cartItemTotalQuantity: 'd-none',
      cartItemDecreaseBtn: 'd-none',
      cartItemIncreaseBtn: 'd-none',
      cartItemRemoveBtn: 'd-none',
    },
  };
  const [cartListItems, listTotalPriceDOMNode] =
    getProductCartItemFactory().buildListItems(options);

  // Append total price node to total price wrapper
  totalPrice.appendChild(listTotalPriceDOMNode);
  subTotalNum.innerHTML = listTotalPriceDOMNode.innerHTML;

  productListWrapper.appendChild(cartListItems);
}

function renderPersonalInformation(sectionPaymentDOMNode) {
  const token = getToken();
  if (!token) {
    window.location.replace('/login.html');
    return;
  }

  // Fetch user information
  const options = {
    headers: {
      Authorization: token,
    },
  };
  const leftContainer = sectionPaymentDOMNode.querySelector(
    '.sec-payment__left-container'
  );
  request(API.getCurrentCartAPI(), options, (cart) => {
    leftContainer.innerHTML = `
      <a href="/" class="sec-payment__logo-link">
        <img
          src="./assets/imgs/logo-colored.png"
          alt="Gearclub logo"
          class="sec-payment__logo-img"
        />
      </a>

      <div class="sec-payment__breadcrumb">
        <a href="./cart.html" class="sec-payment__breadcrumb-link">
          <span class="sec-payment__breadcrumb-item">Giỏ hàng</span>
        </a>

        <span class="sec-payment__breadcrumb-separator">
          <i class="bi bi-chevron-right"></i>
        </span>

        <span id="breadcrumb-item-info" class="sec-payment__breadcrumb-item sec-payment__breadcrumb-item--active">Thông tin</span>

        <span class="sec-payment__breadcrumb-separator">
          <i class="bi bi-chevron-right"></i>
        </span>

        <span
          id="breadcrumb-item-payment"
          class="sec-payment__breadcrumb-item"
        >
          Thanh toán
        </span>
      </div>

      <div class="sec-payment__account">
        <h3 class="sec-payment__heading">Thông tin liên hệ</h3>
        <span class="sec-payment__account-first-name">
          ${cart.customerFirstName}
        </span>
        <span class="sec-payment__account-last-name">
          ${cart.customerLastName}
        </span>
        <span class="sec-payment__account-email"
          >(${cart.customerEmail})</span
        >
        <button class="sec-payment__logout-btn">Đăng xuất</button>
      </div>
      
      <div class="sec-payment__left-main">
        <div class="sec-payment__shipping">
          <h3 class="sec-payment__heading">Phương thức giao hàng</h3>

          <div class="sec-payment__shipping-type-wrapper">
            <input
              type="radio"
              name="shipping-type"
              id="shipping-type-cod"
              checked
              class="sec-payment__shipping-type-input"
            />
            <label
              for="shipping-type-cod"
              class="sec-payment__shipping-type-label"
              ><i class="bi bi-truck"></i>Vận chuyển COD</label
            >
          </div>
        </div>

        <div class="sec-payment__account-info">
          <h3 class="sec-payment__heading">
            Địa chỉ giao hàng
            <a
              href="./account.html?showPersonalInformation=true"
              class="sec-payment__edit-btn"
            >
              (bổ sung thông tin)</a
            >
          </h3>

          <div class="row">
            <div class="col l-6 m-12 c-12">
              <div
                class="custom-input-wrapper sec-payment__custom-input-wrapper"
              >
                <input
                  id="name"
                  placeholder=" "
                  name="name"
                  type="text"
                  class="custom-input__input-text"
                  value="${cart.customerFirstName}"
                  readonly
                />
                <span class="custom-input__input-label">Tên</span>
              </div>
            </div>
            <div class="col l-6 m-12 c-12">
              <div
                class="custom-input-wrapper sec-payment__custom-input-wrapper"
              >
                <input
                  id="name"
                  placeholder=" "
                  name="name"
                  type="text"
                  class="custom-input__input-text"
                  value="${cart.customerLastName}"
                  readonly
                />
                <span class="custom-input__input-label">Họ</span>
              </div>
            </div>

            <div class="col l-12 m-12 c-12">
              <div
                class="custom-input-wrapper sec-payment__custom-input-wrapper ${
                  cart.customerAddress === null ||
                  cart.customerAddress === undefined ||
                  cart.customerAddress === ''
                    ? 'custom-input-wrapper--error'
                    : ''
                }"
              >
                <input
                  id="name"
                  placeholder=" "
                  name="name"
                  type="text"
                  class="custom-input__input-text"
                  value="${
                    cart.customerAddress === null ||
                    cart.customerAddress === undefined ||
                    cart.customerAddress === ''
                      ? 'Cần bổ sung'
                      : cart.customerAddress
                  }"
                  readonly
                />
                <span class="custom-input__input-label"
                  >Địa chỉ giao hàng</span
                >
              </div>
            </div>

            <div class="col l-6 m-12 c-12">
              <div
                class="custom-input-wrapper sec-payment__custom-input-wrapper ${
                  cart.customerPhone === null ||
                  cart.customerPhone === undefined ||
                  cart.customerPhone === ''
                    ? 'custom-input-wrapper--error'
                    : ''
                }"
              >
                <input
                  id="name"
                  placeholder=" "
                  name="name"
                  type="text"
                  class="custom-input__input-text"
                  value="${
                    cart.customerPhone === null ||
                    cart.customerPhone === undefined ||
                    cart.customerPhone === ''
                      ? 'Cần bổ sung'
                      : cart.customerPhone
                  }"
                  readonly
                />
                <span class="custom-input__input-label"
                  >Số điện thoại</span
                >
              </div>
            </div>

            <div class="col l-6 m-12 c-12">
              <div
                class="custom-input-wrapper sec-payment__custom-input-wrapper"
              >
                <input
                  id="name"
                  placeholder=" "
                  name="name"
                  type="text"
                  class="custom-input__input-text"
                  value="${cart.customerEmail}"
                  readonly
                />
                <span class="custom-input__input-label"
                  >Email</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="sec-payment__control">
          <button class="sec-payment__back-cart-btn">
            <i class="bi bi-chevron-left"></i> Quay lại
          </button>
          <button class="btn btn-primary sec-payment__go-payment-btn">
            Đi đến thanh toán
          </button>
        </div>      
      </div>



      <div class="sec-payment__credit-card-info d-none">
        <h3 class="sec-payment__heading">Thông tin thẻ</h3>

        <form id="payment-form">
          <div id="link-authentication-element">
            <!--Stripe.js injects the Link Authentication Element-->
          </div>
          <div id="payment-element">
            <!--Stripe.js injects the Payment Element-->
          </div>
          <button id="submit" class="submit-btn">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
          </button>
          <div id="payment-message" class="hidden"></div>
        </form>

        <div class="sec-payment__control">
          <button class="sec-payment__back-info-btn">
            <i class="bi bi-chevron-left"></i> Thông tin
          </button>
        </div>
      </div>
    `;

    // Event handlers
    const cartBackBtn = sectionPaymentDOMNode.querySelector(
      '.sec-payment__back-cart-btn'
    );
    const goPaymentBtn = sectionPaymentDOMNode.querySelector(
      '.sec-payment__go-payment-btn'
    );
    const logoutBtn = sectionPaymentDOMNode.querySelector(
      '.sec-payment__logout-btn'
    );
    const backInfoBtn = sectionPaymentDOMNode.querySelector(
      '.sec-payment__back-info-btn'
    );
    const leftMainDOMNode = sectionPaymentDOMNode.querySelector(
      '.sec-payment__left-main'
    );
    const creditCartInfo = sectionPaymentDOMNode.querySelector(
      '.sec-payment__credit-card-info'
    );
    const paymentForm = sectionPaymentDOMNode.querySelector('#payment-form');
    const breadcrumbInfo = sectionPaymentDOMNode.querySelector(
      '#breadcrumb-item-info'
    );
    const breadcrumbPayment = sectionPaymentDOMNode.querySelector(
      '#breadcrumb-item-payment'
    );

    cartBackBtn.addEventListener('click', () => {
      window.history.go(-1);
      return false;
    });
    logoutBtn.addEventListener('click', () => {
      removeToken();
      window.location.replace('/');
    });
    goPaymentBtn.addEventListener('click', () => {
      // If still have error inputs
      const errorInputs = sectionPaymentDOMNode.querySelectorAll(
        '.custom-input-wrapper--error'
      );
      if (!(errorInputs.length === 0)) {
        errorInputs.forEach((errorInput) => {
          errorInput.animate(spinningAnimation, spinningAnimationTiming);
        });

        return;
      }

      // Render card input
      leftMainDOMNode.classList.add('d-none');
      creditCartInfo.classList.remove('d-none');
      breadcrumbInfo.classList.remove('sec-payment__breadcrumb-item--active');
      breadcrumbPayment.classList.add('sec-payment__breadcrumb-item--active');
    });
    backInfoBtn.addEventListener('click', () => {
      leftMainDOMNode.classList.remove('d-none');
      creditCartInfo.classList.add('d-none');
      breadcrumbInfo.classList.add('sec-payment__breadcrumb-item--active');
      breadcrumbPayment.classList.remove(
        'sec-payment__breadcrumb-item--active'
      );
    });

    paymentForm.onsubmit = handleSubmit;

    // After render personal information done => Render summary
    renderSummary(sectionPaymentDOMNode, cart);

    // Initialize stripe
    initialize();
    checkStatus();
  });
}

export { renderSectionPayment };
