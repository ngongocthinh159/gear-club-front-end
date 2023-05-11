import { request } from '../commons/fetch.js';
import { getProductCartItemFactory } from '../commons/product-cart-item-factory.js';
import { API } from '../commons/restful-api.js';
import { getAdminToken } from '../commons/utils.js';

function renderOrderDetail() {
  // Refs
  const listWrapper = document.querySelector('.order-detail__list-wrapper');
  const totalPrice = document.querySelector(
    '.order-detail__item-header-price-num'
  );
  const customerSummaryWrapper = document.querySelector(
    '.order-detail__customer-summary-wrapper'
  );
  const orderStatus = document.querySelector('.order-detail__order-status');
  const orderControl = document.querySelector('.order-detail__order-control');
  const declineBtn = document.querySelector('.order-detail__decline-btn');
  const acceptBtn = document.querySelector('.order-detail__accept-btn');

  // Get customerId and cartPosition
  const keyValuePairs = window.location.search.slice(1).split('&');
  const customerId = keyValuePairs[0].split('=')[1];
  const cartPosition = keyValuePairs[1].split('=')[1];

  const token = getAdminToken();
  if (!token) {
  }

  const options = {
    headers: {
      Authorization: getAdminToken(),
    },
  };
  request(
    API.getCartByCustomerIdAndCartPosition(customerId, cartPosition),
    options,
    (cart) => {
      const products = cart.productList;

      // Data transformation then transfer to list options
      products.forEach((product) => {
        product.currentQuantity = product.paymentQuantity;
        product.images = [product.image];
      });

      // Get the list of cart items
      const options = {
        products: products,
        additionalClasses: {
          cartListItems: 'order-detail__item',
          cartItemName: 'order-detail__item-name',
          cartItemProductPriceWrapper: 'd-none',
          cartItemDecreaseBtn: 'd-none',
          cartItemIncreaseBtn: 'd-none',
          cartItemRemoveBtn: 'd-none',
          cartItemTotalQuantity: 'd-none',
          cartItemQuantityNum: 'order-detail__item-quantity-num',
          cartItemBody: 'order-detail__item-body',
          cartItemControl: 'order-detail__item-control',
          cartItemInfo: 'order-detail__item-info',
          cartItemTotalPriceWrapper: 'order-detail__item-total-price-wrapper',
        },
      };

      // Append listItems into orderItemListWrapper
      const [cartListItems, listTotalPriceDOMNode] =
        getProductCartItemFactory().buildListItems(options);

      listWrapper.appendChild(cartListItems);

      // Append total price
      totalPrice.appendChild(listTotalPriceDOMNode);

      // Customer summary
      customerSummaryWrapper.innerHTML = `
        <div>
          ID khách hàng: ${cart.customerId}
        </div>
        <div>
          Tên khách hàng: ${cart.customerFirstName} ${cart.customerLastName}
        </div>
        <div>
          Email liên lạc: ${cart.customerEmail}
        </div>
        <div>
          Số điện thoại: ${cart.customerPhone}
        </div>
        <div style="margin-bottom: 24px;">
          Địa chỉ: ${cart.customerAddress}
        </div>
      `;

      // Order status
      if (cart.cartStatus === 2) {
        orderStatus.innerHTML = `
          Đang chờ xử lý
        `;
        orderStatus.style = '--status-color: var(--danger-color)';
        orderControl.classList.remove('d-none');
      }

      if (cart.cartStatus === 3) {
        orderStatus.innerHTML = `
          Đã chấp nhận
        `;
        orderStatus.style = '--status-color: var(--success-color)';
      }

      if (cart.cartStatus === 4) {
        orderStatus.innerHTML = `
          Đã huỷ
        `;
        orderStatus.style = '--status-color: var(--error-color)';
      }

      // Handle oder detail control
      declineBtn.addEventListener('click', () => {
        declineBtn.classList.add('btn-disabled');

        const options = {
          method: 'PUT',
          body: JSON.stringify({
            customerId: customerId,
            cartPosition: cartPosition,
          }),
          headers: {
            Authorization: getAdminToken(),
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
        request(API.getCartDeclineAPI(), options, (result) => {
          if (result.message === 'cart_declined') {
            window.location.replace('/admin/order.html');
            return;
          }

          declineBtn.classList.remove('btn-disabled');
        });
      });

      acceptBtn.addEventListener('click', () => {
        acceptBtn.classList.add('btn-disabled');

        const options = {
          method: 'PUT',
          body: JSON.stringify({
            customerId: customerId,
            cartPosition: cartPosition,
          }),
          headers: {
            Authorization: getAdminToken(),
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
        request(API.getCartAcceptAPI(), options, (result) => {
          if (result.message === 'cart_accepted') {
            window.location.replace('/admin/order.html');
            return;
          }
        });

        acceptBtn.classList.remove('btn-disabled');
      });
    }
  );
}
renderOrderDetail();
