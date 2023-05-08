import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getToken } from '../commons/utils.js';
import { request } from '../commons/fetch.js';
import { getProductCartItemFactory } from '../commons/product-cart-item-factory.js';
import { timeConverter } from '../commons/utils.js';

function renderSectionOrderHistory(secAccountMainDOMNode, stateChangeNode) {
  const loadingClass = stateChangeNode.classList[0] + '--loading';
  stateChangeNode.classList.add(loadingClass);

  // Fetch data about order history, then update UI
  const options = {
    headers: {
      Authorization: getToken(),
    },
  };
  request(API.getUserInformationAPI(), options, (result) => {
    secAccountMainDOMNode.innerHTML = `
      <h1 class="sec-account__order-history-heading"><i class="bi bi-receipt"></i>Lịch sử mua hàng</h1>

      <ul class="sec-account__order-history-list"></ul>
    `;
    const orderList = document.querySelector(
      '.sec-account__order-history-list'
    );

    // Get all carts
    const carts = result.shoppingCart.slice(0, result.shoppingCart.length - 1);

    // If user not yet place any order
    if (carts.length === 0) {
      secAccountMainDOMNode.innerHTML = `
        <div class="sec-account__no-order">
          <img src="../../../assets/imgs/account/keyboard.png">

          <span class="sec-account__no-order-text">Bạn vẫn chưa đặt hàng</span>

          <a href="../../../collections.html" class="btn btn-primary">Tiếp tục mua hàng</a>
        </div>
      `;

      return;
    }
    
    // If there is at least one order => Fetch data for each order => Render
    carts.forEach((cart) => {
      const orderItem = document.createElement('li');
      orderItem.className = 'sec-account__order-history-item';
      orderItem.innerHTML = `
        <div class ="sec-account__order-history-item-header">
          <span class="sec-account__order-history-item-header-text">Đơn hàng:
            <span class="sec-account__order-history-item-time"></span>
          </span>
          <span class="sec-account__order-history-item-header-price-wrapper">
            <span class="sec-account__order-history-item-header-price-text">Tổng: </span>
            <span class="sec-account__order-history-item-header-price-num"> </span>
            <span class="sec-account__order-history-item-header-price-currency"> VND</span>
          </span>
        </div>

        <div class ="sec-account__order-history-item-list-wrapper"></div>
      `;

      let totalProducts = 0;
      Object.keys(cart).forEach((key) => {
        if (key > 0) {
          totalProducts++;
        }
      });

      const cartProduct = [];
      let count = 0;
      for (const productId in cart) {
        if (productId < 0) {
          continue;
        }

        fetchData(API.getProductByIdAPI(productId), (product) => {
          cartProduct.push(product);

          count++;
          // Done fetch all products of 1 cart => Append
          if (count === totalProducts) {
            // Data transformation then transfer to list options
            cartProduct.forEach((product) => {
              product.totalQuantity = product.quantity;
              product.currentQuantity = cart[product.id];
            });

            // Get the list of cart items
            const options = {
              products: cartProduct,
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
            const timeUnix = cart[-3];
            const timeDOMNode = orderItem.querySelector(
              '.sec-account__order-history-item-time'
            );
            timeDOMNode.innerHTML = `${timeConverter(timeUnix)}`;

            // Append orderItem into listOrderItem
            orderList.appendChild(orderItem);
          }
        });
      }
    });

    stateChangeNode.classList.remove(loadingClass);
  });
}

export { renderSectionOrderHistory };
