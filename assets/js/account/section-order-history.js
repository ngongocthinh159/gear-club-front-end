import { API } from '../commons/restful-api.js';
import { getToken, timeConverter } from '../commons/utils.js';
import { request } from '../commons/fetch.js';
import { getProductCartItemFactory } from '../commons/product-cart-item-factory.js';

function renderSectionOrderHistory(secAccountMainDOMNode, stateChangeNode) {
  const loadingClass = stateChangeNode.classList[0] + '--loading';
  stateChangeNode.classList.add(loadingClass);

  // Update main dom node to display order list
  secAccountMainDOMNode.innerHTML = `
      <h1 class="sec-account__order-history-heading"><i class="bi bi-receipt"></i>Lịch sử mua hàng</h1>

      <ul class="sec-account__order-history-list"></ul>
    `;
  const orderList = document.querySelector('.sec-account__order-history-list');

  // Fetch data about order history, then update UI
  const options = {
    headers: {
      Authorization: getToken(),
    },
  };
  request(API.getAllPurchasedCartsOfACustomerAPI(), options, (carts) => {
    stateChangeNode.classList.remove(loadingClass);

    // Sort descending order by payment time
    carts.sort((cart1, cart2) => {
      if (cart1.cartPaymentTime > cart2.cartPaymentTime) return -1;
      if (cart1.cartPaymentTime < cart2.cartPaymentTime) return 1;
      return 0;
    })

    carts.forEach(cart => {
      const orderItem = document.createElement('li');
      orderItem.className =
        'sec-account__order-history-item';
      orderItem.innerHTML = `
        <div class ="sec-account__order-history-item-header">
          <span class="sec-account__order-history-item-header-text">Đơn hàng:
            <span class="sec-account__order-history-item-time"></span>
            (<span class="sec-account__order-history-item-status-text"></span>)
          </span>
          <span class="sec-account__order-history-item-header-price-wrapper">
            <span class="sec-account__order-history-item-header-price-text">Tổng: </span>
            <span class="sec-account__order-history-item-header-price-num"> </span>
            <span class="sec-account__order-history-item-header-price-currency"> VND</span>
          </span>
        </div>

        <div class ="sec-account__order-history-item-list-wrapper"></div>

        <span class="sec-account__order-history-item-control"></span>
      `;

      const productList = cart.productList;
      if (productList.length > 1) {
        orderItem.classList.add('sec-account__order-history-item--collapsed');
        const itemControl = orderItem.querySelector(
          '.sec-account__order-history-item-control'
        );
        itemControl.addEventListener('click', () => {
          if (orderItem.classList.contains('sec-account__order-history-item--collapsed')) {
            orderItem.classList.remove(
              'sec-account__order-history-item--collapsed'
            );
            orderItem.classList.add(
              'sec-account__order-history-item--expanded'
            );
          } else {
            orderItem.classList.remove(
              'sec-account__order-history-item--expanded'
            );
            orderItem.classList.add(
              'sec-account__order-history-item--collapsed'
            );
          }
        })
      }

      // Data transformation then transfer to list options
      productList.forEach((product) => {
        product.totalQuantity = product.quantity;
        product.currentQuantity = product.paymentQuantity;
        product.images = [product.image];
      });

      // Get the list of cart items
      const options = {
        products: productList,
        additionalClasses: {
          cartListItems: 'sec-account__order-history-item-list',
          cartItemProductPriceWrapper: 'd-none',
          cartItemDecreaseBtn: 'd-none',
          cartItemIncreaseBtn: 'd-none',
          cartItemRemoveBtn: 'd-none',
          cartItemTotalQuantity: 'd-none',
        },
      };

      // Append listItems into orderItemListWrapper
      const [cartListItems, listTotalPriceDOMNode] =
        getProductCartItemFactory().buildListItems(options);

      const itemListWrapper = orderItem.querySelector(
        '.sec-account__order-history-item-list-wrapper'
      );
      itemListWrapper.appendChild(cartListItems);

      // Append total price
      const totalPriceNum = orderItem.querySelector(
        '.sec-account__order-history-item-header-price-num'
      );
      totalPriceNum.appendChild(listTotalPriceDOMNode);

      // Append time
      const timeUnix = cart.cartPaymentTime;
      const timeDOMNode = orderItem.querySelector(
        '.sec-account__order-history-item-time'
      );
      timeDOMNode.innerHTML = `${timeConverter(timeUnix)}`;

      // Status
      const status = cart.cartStatus;
      const statusText = orderItem.querySelector(
        '.sec-account__order-history-item-status-text'
      );
      if (status === 2) {
        statusText.innerHTML = 'Chờ xử lý';
        orderItem.style = '--status-color: var(--danger-color);';
      }
      if (status === 3) {
        statusText.innerHTML = 'Thành công';
        orderItem.style = '--status-color: var(--success-color);';
      }
      if (status === 4) {
        statusText.innerHTML = 'Đã bị huỷ';
        orderItem.style = '--status-color:  var(--error-color);';
      }

      orderList.appendChild(orderItem);
    })
  })
}

export { renderSectionOrderHistory };
