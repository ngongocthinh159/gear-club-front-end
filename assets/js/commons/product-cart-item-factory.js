import { getToken, numberWithCommas } from '../commons/utils.js';
import { slugify } from '../commons/utils.js';
import { fetchData, request } from './fetch.js';
import { API } from './restful-api.js';

const CURRENCY = '₫';
const ANIMATION_LOADING_DELAY = 0;
const UPDATE_DELAY = 500;

function getProductCartItemFactory() {
  return {
    buildItem: function (itemOptions) {
      const slug =
        itemOptions?.productDetail?.name !== undefined
          ? slugify(itemOptions.productDetail.name)
          : '';

      const cartItem = document.createElement('li');
      cartItem.className = `cart-item 
                            ${
                              itemOptions?.additionalClasses?.cartItem !==
                              undefined
                                ? itemOptions.additionalClasses.cartItem
                                : ''
                            }
      `;

      cartItem.innerHTML = `
        <img
          src="${
            itemOptions?.productDetail?.images[0] !== undefined
              ? itemOptions.productDetail.images[0]
              : ''
          }"
          alt="Product image"
          class="cart-item__img 
                ${
                  itemOptions?.additionalClasses?.cartItemImage !== undefined
                    ? itemOptions.additionalClasses.cartItemImage
                    : ''
                }
                "
        />

        <div class="cart-item__body 
                    ${
                      itemOptions?.additionalClasses?.cartItemBody !== undefined
                        ? itemOptions.additionalClasses.cartItemBody
                        : ''
                    }
                    "
        >
          <div class="cart-item__info 
                      ${
                        itemOptions?.additionalClasses?.cartItemInfo !==
                        undefined
                          ? itemOptions.additionalClasses.cartItemInfo
                          : ''
                      }
                      "
          >
            <a href="
                    ${
                      itemOptions?.productDetail?.id !== undefined
                        ? `/product-detail.html?slug=${slug}&productId=${itemOptions.productDetail.id}`
                        : ''
                    }
                    " 
              class="cart-item__name 
                    ${
                      itemOptions?.additionalClasses?.cartItemName !== undefined
                        ? itemOptions.additionalClasses.cartItemName
                        : ''
                    }
                    "
              >
              ${
                itemOptions?.productDetail?.name !== undefined
                  ? itemOptions.productDetail.name
                  : ''
              }
            </a>
            <div class="cart-item__price-wrapper 
                        ${
                          itemOptions?.additionalClasses
                            ?.cartItemPriceWrapper !== undefined
                            ? itemOptions.additionalClasses.cartItemPriceWrapper
                            : ''
                        }
                        "
            >
              <span class="cart-item__total-price-wrapper 
                          ${
                            itemOptions?.additionalClasses
                              ?.cartItemTotalPriceWrapper !== undefined
                              ? itemOptions.additionalClasses
                                  .cartItemTotalPriceWrapper
                              : ''
                          }
                          "
              >
                <span class="cart-item__total-price-num 
                            ${
                              itemOptions?.additionalClasses
                                ?.cartItemTotalPriceNum !== undefined
                                ? itemOptions.additionalClasses
                                    .cartItemTotalPriceNum
                                : ''
                            }
                            "
                >${numberWithCommas(
                  itemOptions.productDetail.currentQuantity *
                    itemOptions.productDetail.price
                )}</span><span class="cart-item__currency">${CURRENCY}</span>
              </span>
              <span class="cart-item__product-price-wrapper
                          ${
                            itemOptions?.additionalClasses
                              ?.cartItemProductPriceWrapper !== undefined
                              ? itemOptions.additionalClasses
                                  .cartItemProductPriceWrapper
                              : ''
                          }
                          "
              >
                <span class="cart-item__product-price-num 
                            ${
                              itemOptions?.additionalClasses
                                ?.cartItemProductPriceNum !== undefined
                                ? itemOptions.additionalClasses
                                    .cartItemProductPriceNum
                                : ''
                            }
                            "
                >${
                  itemOptions?.productDetail?.price !== undefined
                    ? numberWithCommas(itemOptions.productDetail.price)
                    : ''
                }</span><span class="cart-item__currency">${CURRENCY}</span>
              </span>
            </div>
            <span class="cart-item__total-quantity 
                        ${
                          itemOptions?.additionalClasses
                            ?.cartItemTotalQuantity !== undefined
                            ? itemOptions.additionalClasses
                                .cartItemTotalQuantity
                            : ''
                        }
                        "
            >
              Còn lại: ${
                itemOptions?.productDetail?.totalQuantity !== undefined
                  ? itemOptions.productDetail.totalQuantity
                  : ''
              }
            </span>
          </div>

          <div class="cart-item__control 
                      ${
                        itemOptions?.additionalClasses?.cartItemControl !==
                        undefined
                          ? itemOptions.additionalClasses.cartItemControl
                          : ''
                      }  
                      "
          >
            <div class="cart-item__quantity-wrapper 
                        ${
                          itemOptions?.additionalClasses
                            ?.cartItemQuantityWrapper !== undefined
                            ? itemOptions.additionalClasses
                                .cartItemQuantityWrapper
                            : ''
                        } 
                        "
            >
              <button class="cart-item__quantity-control-btn cart-item__quantity-decrease-btn 
                            ${
                              itemOptions.productDetail.currentQuantity <= 1
                                ? 'cart-item__quantity-control-btn--disabled'
                                : ''
                            } 
                            ${
                              itemOptions?.additionalClasses
                                ?.cartItemDecreaseBtn !== undefined
                                ? itemOptions.additionalClasses
                                    .cartItemDecreaseBtn
                                : ''
                            }
                            "
              >
                <i class="bi bi-dash"></i>
              </button>
              
              <span class="cart-item__quantity-num
                          ${
                            itemOptions?.additionalClasses
                              ?.cartItemQuantityNum !== undefined
                              ? itemOptions.additionalClasses
                                  .cartItemQuantityNum
                              : ''
                          }
                          "
              >
                ${
                  itemOptions?.productDetail?.currentQuantity !== undefined
                    ? itemOptions.productDetail.currentQuantity
                    : ''
                }
              </span>

              <button class="cart-item__quantity-control-btn cart-item__quantity-increase-btn 
                            ${
                              itemOptions.productDetail.currentQuantity >=
                              itemOptions.productDetail.totalQuantity
                                ? 'cart-item__quantity-control-btn--disabled'
                                : ''
                            } 
                            ${
                              itemOptions?.additionalClasses
                                ?.cartItemIncreaseBtn !== undefined
                                ? itemOptions.additionalClasses
                                    .cartItemIncreaseBtn
                                : ''
                            }
                            "
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <button class="cart-item__remove-btn 
                          ${
                            itemOptions?.additionalClasses
                              ?.cartItemRemoveBtn !== undefined
                              ? itemOptions.additionalClasses.cartItemRemoveBtn
                              : ''
                          }
                          "
            >Bỏ</button>
          </div>

          <!-- Loading animation -->
          <div class="cart-item__loading">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>              
          </div>
        </div>
      `;

      // Increase/decrease/remove btns event handler
      const decreaseBtn = cartItem.querySelector(
        '.cart-item__quantity-decrease-btn'
      );
      const increaseBtn = cartItem.querySelector(
        '.cart-item__quantity-increase-btn'
      );
      const removeBtn = cartItem.querySelector('.cart-item__remove-btn');

      const decreaseHandler =
        itemOptions?.decreaseBtnEventHandler !== undefined
          ? itemOptions.decreaseBtnEventHandler
          : defaultDecreaseHandler;
      decreaseBtn.addEventListener('click', () => {
        decreaseHandler(
          itemOptions.productDetail.id,
          itemOptions.productDetail.totalQuantity,
          cartItem,
          itemOptions.productDetail.price,
          itemOptions.listTotalPriceDOMNode
        );
      });

      const increaseHandler =
        itemOptions?.increaseBtnEventHandler !== undefined
          ? itemOptions.increaseBtnEventHandler
          : defaultIncreaseHandler;
      increaseBtn.addEventListener('click', () => {
        increaseHandler(
          itemOptions.productDetail.id,
          itemOptions.productDetail.totalQuantity,
          cartItem,
          itemOptions.productDetail.price,
          itemOptions.listTotalPriceDOMNode
        );
      });

      const removeHandler =
        itemOptions?.removeBtnEventHandler !== undefined
          ? itemOptions.removeBtnEventHandler
          : defaultRemoveHandler;
      removeBtn.addEventListener('click', () => {
        removeHandler(
          itemOptions.productDetail.id,
          cartItem,
          itemOptions.productDetail.price,
          itemOptions.listTotalPriceDOMNode
        );
      });

      return cartItem;
    },
    buildListItems: function (options) {
      const listTotalPriceDOMNode = document.createElement('span');
      let listTotalPrice = 0;
      listTotalPriceDOMNode.className = `cart-list-items__list-total-price 
        ${
          options?.additionalClasses?.cartListTotalPrice !== undefined
            ? options.additionalClasses.cartListTotalPrice
            : ''
        }
      `;

      const listCartItems = document.createElement('ul');
      listCartItems.className = `cart-list-items 
                                ${
                                  options?.additionalClasses?.cartListItems !==
                                  undefined
                                    ? options.additionalClasses.cartListItems
                                    : ''
                                }
      `;

      // Create each cart item => append to list
      options.products.forEach((product) => {
        const itemOptions = {
          productDetail: {
            id: product.id,
            images: product.images,
            name: product.name,
            totalQuantity: product.totalQuantity,
            currentQuantity: product.currentQuantity,
            price: product.price,
          },
          additionalClasses: options.additionalClasses,
          decreaseBtnEventHandler: options.decreaseBtnEventHandler,
          increaseBtnEventHandler: options.increaseBtnEventHandler,
          removeBtnEventHandler: options.removeBtnEventHandler,
          listTotalPriceDOMNode: listTotalPriceDOMNode,
        };

        const cartItem = this.buildItem(itemOptions);
        listCartItems.appendChild(cartItem);

        listTotalPrice += product.currentQuantity * product.price;
      });

      // Get initial total price
      listTotalPriceDOMNode.innerHTML = numberWithCommas(listTotalPrice);

      // Attach add new cart item function to the list
      listCartItems.addNewCartItem = addNewCartItem;

      return [listCartItems, listTotalPriceDOMNode];
    },
  };
}

function defaultDecreaseHandler(
  productId,
  totalQuantity,
  cartItem,
  productPrice,
  listTotalPriceDOMNode
) {
  // Loading state
  cartItem.classList.add('cart-item--loading');

  // Call increase API first, then update UI
  const options = {
    method: 'PUT',
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      productId: productId,
    }),
  };
  request(API.getDecreaseProductQuantityInCartAPI(), options, (result) => {
    if (result.status === 'bad') {
      cartItem.classList.add('cart-item--loading');
      return;
    }

    // Code to update UI
    const decreaseBtn = cartItem.querySelector(
      '.cart-item__quantity-decrease-btn'
    );
    const increaseBtn = cartItem.querySelector(
      '.cart-item__quantity-increase-btn'
    );
    const quantityNumDOMNode = cartItem.querySelector(
      '.cart-item__quantity-num'
    );
    const itemTotalPriceNum = cartItem.querySelector(
      '.cart-item__total-price-num'
    );

    const nextCurrentQuantity = Number(quantityNumDOMNode.innerHTML) - 1;

    // Toggle UI
    if (nextCurrentQuantity <= 1) {
      decreaseBtn.classList.add('cart-item__quantity-control-btn--disabled');
    } else {
      decreaseBtn.classList.remove('cart-item__quantity-control-btn--disabled');
    }
    if (nextCurrentQuantity >= totalQuantity) {
      increaseBtn.classList.add('cart-item__quantity-control-btn--disabled');
    } else {
      increaseBtn.classList.remove('cart-item__quantity-control-btn--disabled');
    }

    // Decrease quantity
    quantityNumDOMNode.innerHTML = `
      ${nextCurrentQuantity}
    `;

    // Change item total price
    itemTotalPriceNum.innerText = `${numberWithCommas(
      nextCurrentQuantity * productPrice
    )}`;

    // Change the list total price
    if (listTotalPriceDOMNode) {
      const nextListTotalPrice =
        Number(listTotalPriceDOMNode.innerHTML.replaceAll('.', '')) -
        productPrice;
      listTotalPriceDOMNode.innerHTML = `
        ${numberWithCommas(nextListTotalPrice)}
      `;
    }

    // Done loading state
    setTimeout(() => {
      cartItem.classList.remove('cart-item--loading');
    }, ANIMATION_LOADING_DELAY);
  });
}

function defaultIncreaseHandler(
  productId,
  totalQuantity,
  cartItem,
  productPrice,
  listTotalPriceDOMNode
) {
  // Loading state
  cartItem.classList.add('cart-item--loading');

  // Call increase API first, then update UI
  const options = {
    method: 'PUT',
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      productId: productId,
    }),
  };

  request(API.getIncreaseProductQuantityInCartAPI(), options, (result) => {
    if (result.status === 'bad') {
      cartItem.classList.add('cart-item--loading');
      return;
    }

    // Code to update UI
    const decreaseBtn = cartItem.querySelector(
      '.cart-item__quantity-decrease-btn'
    );
    const increaseBtn = cartItem.querySelector(
      '.cart-item__quantity-increase-btn'
    );
    const quantityNumDOMNode = cartItem.querySelector(
      '.cart-item__quantity-num'
    );
    const itemTotalPriceNum = cartItem.querySelector(
      '.cart-item__total-price-num'
    );

    const nextCurrentQuantity = Number(quantityNumDOMNode.innerHTML) + 1;

    // Toggle UI
    if (nextCurrentQuantity <= 1) {
      decreaseBtn.classList.add('cart-item__quantity-control-btn--disabled');
    } else {
      decreaseBtn.classList.remove('cart-item__quantity-control-btn--disabled');
    }
    if (nextCurrentQuantity >= totalQuantity) {
      increaseBtn.classList.add('cart-item__quantity-control-btn--disabled');
    } else {
      increaseBtn.classList.remove('cart-item__quantity-control-btn--disabled');
    }

    // Increase quantity
    quantityNumDOMNode.innerHTML = `
      ${nextCurrentQuantity}
    `;

    // Change item total price
    itemTotalPriceNum.innerText = `${numberWithCommas(
      nextCurrentQuantity * productPrice
    )}`;

    // Change the list total price
    if (listTotalPriceDOMNode) {
      const nextListTotalPrice =
        Number(listTotalPriceDOMNode.innerHTML.replaceAll('.', '')) +
        productPrice;
      listTotalPriceDOMNode.innerHTML = `
        ${numberWithCommas(nextListTotalPrice)}
      `;
    }

    // Done loading state
    setTimeout(() => {
      cartItem.classList.remove('cart-item--loading');
    }, ANIMATION_LOADING_DELAY);
  });
}

function defaultRemoveHandler(
  productId,
  cartItem,
  productPrice,
  listTotalPriceDOMNode
) {
  // Loading state
  cartItem.classList.add('cart-item--loading');

  // Call increase API first, then update UI
  const options = {
    method: 'PUT',
    headers: {
      Authorization: getToken(),
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      productId: productId,
    }),
  };
  request(API.getRemoveProductInCartAPI(), options, (result) => {
    if (result.status === 'bad') {
      cartItem.classList.add('cart-item--loading');
      return;
    }

    // Code to update UI
    const quantityNumDOMNode = cartItem.querySelector(
      '.cart-item__quantity-num'
    );

    const currentQuantity = Number(quantityNumDOMNode.innerHTML);

    // Change the list total price
    if (listTotalPriceDOMNode) {
      const nextListTotalPrice =
        Number(listTotalPriceDOMNode.innerHTML.replaceAll('.', '')) -
        productPrice * currentQuantity;
      listTotalPriceDOMNode.innerHTML = `
        ${numberWithCommas(nextListTotalPrice)}
      `;
    }

    cartItem.remove();
  });
}

function addNewCartItem(options, addingQuantity) {
  // This: the cart item list => Cart item list call this function
  // This function is called when user add product in product card
  // or in product detail page
  const listTotalPriceDOMNode = document.querySelector(
    '.cart-list-items__list-total-price'
  );

  // Create new cart item, then append to list
  const itemOptions = {
    productDetail: {
      id: options.productDetail.id,
      images: options.productDetail.images,
      name: options.productDetail.name,
      totalQuantity: options.productDetail.totalQuantity,
      currentQuantity: addingQuantity,
      price: options.productDetail.price,
    },
    additionalClasses: options.additionalClasses,
    listTotalPriceDOMNode: listTotalPriceDOMNode,
  };
  const cartItem = getProductCartItemFactory().buildItem(itemOptions);
  this.appendChild(cartItem);

  // Update total price
  if (listTotalPriceDOMNode) {
    const nextListTotalPrice =
      Number(listTotalPriceDOMNode.innerHTML.replaceAll('.', '')) +
      itemOptions.productDetail.price *
        itemOptions.productDetail.currentQuantity;
    listTotalPriceDOMNode.innerHTML = `
        ${numberWithCommas(nextListTotalPrice)}
      `;
  }
}

// Options template
const listOptions = {
  products: [], // List of products + current quantity
  additionalClasses: {
    cartListItems: '2',
    cartListTotalPrice: '2',
    cartItem: '2',
    cartItemImg: '2',
    cartItemBody: '2',
    cartItemInfo: '2',
    cartItemName: '2',

    cartItemPriceWrapper: '2',
    cartItemTotalPriceWrapper: '2',
    cartItemTotalPriceNum: '2',
    cartItemProductPriceWrapper: '2',
    cartItemProductPriceNum: '2',

    cartItemTotalQuantity: '2',
    cartItemControl: '2',
    cartItemQuantityWrapper: '2',
    cartItemDecreaseBtn: '2',
    cartItemQuantityNum: '2',
    cartItemIncreaseBtn: '2',
    cartItemRemoveBtn: '2',
  },
  decreaseBtnEventHandler: () => {},
  increaseBtnEventHandler: () => {},
  removeBtnEventHandler: () => {},
};

const itemOptions = {
  productDetail: {
    id: 1,
    images: ['', ''],
    name: '1',
    totalQuantity: 8,
    currentQuantity: 1,
    price: 12345,
  },
  additionalClasses: {
    cartItem: '2',
    cartItemImg: '2',
    cartItemBody: '2',
    cartItemInfo: '2',
    cartItemName: '2',

    cartItemPriceWrapper: '2',
    cartItemTotalPriceWrapper: '2',
    cartItemTotalPriceNum: '2',
    cartItemProductPriceWrapper: '2',
    cartItemProductPriceNum: '2',

    cartItemTotalQuantity: '2',
    cartItemControl: '2',
    cartItemQuantityWrapper: '2',
    cartItemDecreaseBtn: '2',
    cartItemQuantityNum: '2',
    cartItemIncreaseBtn: '2',
    cartItemRemoveBtn: '2',
  },
  decreaseBtnEventHandler: () => {},
  increaseBtnEventHandler: () => {},
  removeBtnEventHandler: () => {},
  listTotalPriceDOMNode: {}, // A DOM node to update the value
};

export { getProductCartItemFactory };
