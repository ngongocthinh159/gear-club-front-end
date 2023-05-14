import { fetchData, request } from '../commons/fetch.js';
import { getProductCartItemFactory } from '../commons/product-cart-item-factory.js';
import { API } from '../commons/restful-api.js';
import { getToken } from '../commons/utils.js';

const CURRENCY = '₫';
const COUNTRY_CURRENCY = 'VND';

function renderSCartSection(sCartDOMNode) {
  sCartDOMNode.innerHTML = `
    <div class="grid wide">
      <div class="s-cart__header">
        <h1 class="s-cart__heading">Giỏ hàng</h1>
        <h2 class="s-cart__sub-heading">Bạn được giao hàng miễn phí</h2>
      </div>

      <div class="row">
        <div class="col l-8 m-12 c-12">
          <div class="s-cart__table">
            <div class="s-cart__table-header">
              <span class="s-cart__table-header-title">Sản phẩm</span>
              <span class="s-cart__table-header-title">Số lượng</span>
              <span class="s-cart__table-header-title">Tổng</span>
            </div>

            <div class="s-cart__table-body">
              
            </div>
          </div>
        </div>
        <div class="col l-4 m-12 c-12">
          <div class="s-cart__summary">
            <div class="s-cart__shipping-price-wrapper">
              <span class="s-cart__shipping-price-text">Phí ship</span>
              <span class="s-cart__shipping-price-num">0${CURRENCY}</span>
            </div>

            <div class="s-cart__list-total-price-wrapper">
              <span class="s-cart__list-total-price-text">Tổng</span>

              <span class="s-cart__list-total-price-num-wrapper">
                ${COUNTRY_CURRENCY}
              </span>
            </div>

            <div class="s-cart__shipping-text">
              Đã bao gồm thuế;
              <a href="./shipping.html" class="s-cart__shipping-link">Phí ship</a>
              sẽ được tính khi thanh toán
            </div>

            <button class="s-cart__payment-btn btn btn-primary btn-icon btn-icon-leading"><i class="bi bi-credit-card"></i>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const sCartTableBody = sCartDOMNode.querySelector('.s-cart__table-body');

  // Fetch cart data, then update UI
  const options = {
    headers: {
      Authorization: getToken(),
    },
  };
  request(API.getCurrentCartAPI(), options, (cart) => {
    const products = cart.productList;

    // Data transformation
    products.forEach((product) => {
      product.currentQuantity = product.paymentQuantity;
      product.totalQuantity = product.quantity;
    });

    // Create new cart list
    const listOptions = {
      products: products,
      additionalClasses: {
        cartListItems: 's-cart__cart-list',

        cartItemBody: 's-cart__cart-item-body',
        cartItemName: 's-cart__cart-item-name',
        cartItemTotalPriceWrapper: 's-cart__total-price-wrapper',
        cartItemControl: 's-cart__cart-item-control',
      },
    };

    const [cartList, listTotalPriceDOMNode] =
      getProductCartItemFactory().buildListItems(listOptions);

    // Move position of the item's total price
    const cartItemBodys = cartList.querySelectorAll('.cart-item__body');
    cartItemBodys.forEach((cartItemBody) => {
      const totalPriceWrapper = cartItemBody.querySelector(
        '.cart-item__total-price-wrapper'
      );

      cartItemBody.appendChild(totalPriceWrapper);
    });

    // Move position of list's total price
    const totalPriceWrapper = sCartDOMNode.querySelector(
      '.s-cart__list-total-price-num-wrapper'
    );
    totalPriceWrapper.prepend(listTotalPriceDOMNode);

    sCartTableBody.appendChild(cartList);

    // Handle events
    handleEvents(sCartDOMNode);
  });
}

function handleEvents(sCartDOMNode) {
  const paymentBtn = sCartDOMNode.querySelector('.s-cart__payment-btn');

  paymentBtn.addEventListener('click', () => {
    const cartItems = sCartDOMNode.querySelectorAll('.cart-item');

    // If there is nothing in cart => Show toast
    if (cartItems.length === 0) {
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
    window.location.href = '../../../payment.html';
  });
}

export { renderSCartSection };
