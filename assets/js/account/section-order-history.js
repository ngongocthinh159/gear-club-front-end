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
  let cartCount = 0;
  const orderItems = [];
  request(API.getUserInformationAPI(), options, (result) => {
    stateChangeNode.classList.remove(loadingClass);

    secAccountMainDOMNode.innerHTML = `
      <h1 class="sec-account__order-history-heading"><i class="bi bi-receipt"></i>Lịch sử mua hàng</h1>

      <ul class="sec-account__order-history-list"></ul>
    `;
    const orderList = document.querySelector(
      '.sec-account__order-history-list'
    );

    // Get all carts except the last
    const carts = result.shoppingCart.slice(0, result.shoppingCart.length - 1);
    const totalCart = carts.length;

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
            (<span class="sec-account__order-history-item-status-text"></span>)
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
            cartCount++;

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
            timeDOMNode.innerHTML = `${timeUnix}`;

            // Status
            const status = cart[-2];
            const statusText = orderItem.querySelector(
              '.sec-account__order-history-item-status-text'
            );
            if (status === 2) {
              statusText.innerHTML = 'Chờ xử lý';
              orderItem.style = '--status-color: var(--danger-color);'
            }
            if (status === 3) {
              statusText.innerHTML = 'Thành công';
              orderItem.style = '--status-color: var(--success-color);';

            }
            if (status === 4) {
              statusText.innerHTML = 'Đã bị huỷ';
              orderItem.style = '--status-color:  var(--error-color);';
            }


            // Append orderItem into orderItems list => Until all cart has been fetch
            // => Render
            orderItems.push(orderItem);
            if (cartCount === totalCart) {
              // Sort by date
              orderItems.sort((item1, item2) => {
                const time1 = item1.querySelector(
                  '.sec-account__order-history-item-time'
                );

                const time2 = item2.querySelector(
                  '.sec-account__order-history-item-time'
                );

                if (Number(time1.innerHTML) < Number(time2.innerHTML)) {
                  return 1;
                }
                if (Number(time1.innerHTML) > Number(time2.innerHTML)) {
                  return -1;
                }

                return 0;
              });

              for (const orderItem of orderItems) {
                // Convert time
                orderItem.querySelector(
                  '.sec-account__order-history-item-time'
                ).innerHTML = timeConverter(
                  Number(
                    orderItem.querySelector(
                      '.sec-account__order-history-item-time'
                    ).innerHTML
                  )
                );
                orderList.appendChild(orderItem);
              }
            }
          }
        });
      }
    });
  });
}

export { renderSectionOrderHistory };
