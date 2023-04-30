import { numberWithCommas } from '../commons/utils.js';
import { slugify } from '../commons/utils.js';

const CURRENCY = '₫';

function getProductCartItemFactory(options) {
  const slug =
    options?.productDetail?.name !== undefined
      ? slugify(options.productDetail.name)
      : '';

  return {
    buildItem: () => {
      const cartItem = document.createElement('li');
      cartItem.className = `cart-item 
                            ${
                              options?.additionalClasses?.cartItem !== undefined
                                ? options.additionalClasses.cartItem
                                : ''
                            }
      `;

      cartItem.innerHTML = `
        <img
          src="${
            options?.productDetail?.images[0] !== undefined
              ? options.productDetail.images[0]
              : ''
          }"
          alt="Product image"
          class="cart-item__img 
                ${
                  options?.additionalClasses?.cartItemImage !== undefined
                    ? options.additionalClasses.cartItemImage
                    : ''
                }
                "
        />

        <div class="cart-item__body 
                    ${
                      options?.additionalClasses?.cartItemBody !== undefined
                        ? options.additionalClasses.cartItemBody
                        : ''
                    }
                    "
        >
          <div class="cart-item__info 
                      ${
                        options?.additionalClasses?.cartItemInfo !== undefined
                          ? options.additionalClasses.cartItemInfo
                          : ''
                      }
                      "
          >
            <a href="
                    ${
                      options?.productDetail?.id !== undefined
                        ? `/product-detail.html?slug=${slug}&productId=${options.productDetail.id}`
                        : ''
                    }
                    " 
              class="cart-item__name 
                    ${
                      options?.additionalClasses?.cartItemName !== undefined
                        ? options.additionalClasses.cartItemName
                        : ''
                    }
                    "
              >
              ${
                options?.productDetail?.name !== undefined
                  ? options.productDetail.name
                  : ''
              }
            </a>
            <div class="cart-item__price-wrapper 
                        ${
                          options?.additionalClasses?.cartItemPriceWrapper !==
                          undefined
                            ? options.additionalClasses.cartItemPriceWrapper
                            : ''
                        }
                        "
            >
              <span class="cart-item__total-price 
                          ${
                            options?.additionalClasses?.cartItemTotalPrice !==
                            undefined
                              ? options.additionalClasses.cartItemTotalPrice
                              : ''
                          }
                          "
              >
                ${numberWithCommas(
                  options.productDetail.currentQuanity *
                    options.productDetail.price
                )}${CURRENCY}
              </span>
              <span class="cart-item__product-price 
                          ${
                            options?.additionalClasses?.cartItemProductPrice !==
                            undefined
                              ? options.additionalClasses.cartItemProductPrice
                              : ''
                          }
                          "
              >
                ${
                  options?.productDetail?.price !== undefined
                    ? numberWithCommas(options.productDetail.price)
                    : ''
                }${CURRENCY}
              </span>
            </div>
            <span class="cart-item__total-quantity 
                        ${
                          options?.additionalClasses?.cartItemTotalQuantity !==
                          undefined
                            ? options.additionalClasses.cartItemTotalQuantity
                            : ''
                        }
                        "
            >
              Còn lại: ${
                options?.productDetail?.totalQuantity !== undefined
                  ? options.productDetail.totalQuantity
                  : ''
              }
            </span>
          </div>

          <div class="cart-item__control 
                      ${
                        options?.additionalClasses?.cartItemControl !==
                        undefined
                          ? options.additionalClasses.cartItemControl
                          : ''
                      }  
                      "
          >
            <div class="cart-item__quantity-wrapper 
                        ${
                          options?.additionalClasses
                            ?.cartItemQuantityWrapper !== undefined
                            ? options.additionalClasses.cartItemQuantityWrapper
                            : ''
                        } 
                        "
            >
              <button class="cart-item__quantity-control-btn cart-item__quantity-decrease-btn 
                            ${
                              options?.additionalClasses
                                ?.cartItemDecreaseBtn !== undefined
                                ? options.additionalClasses.cartItemDecreaseBtn
                                : ''
                            }
                            "
              >
                <i class="bi bi-dash"></i>
              </button>
              
              <span class="cart-item__quantity-num
                          ${
                            options?.additionalClasses?.cartItemQuantityNum !==
                            undefined
                              ? options.additionalClasses.cartItemQuantityNum
                              : ''
                          }
                          "
              >
                ${
                  options?.productDetail?.currentQuanity !== undefined
                    ? options.productDetail.currentQuanity
                    : ''
                }
              </span>

              <button class="cart-item__quantity-control-btn cart-item__quantity-increase-btn 
                            ${
                              options?.additionalClasses
                                ?.cartItemIncreaseBtn !== undefined
                                ? options.additionalClasses.cartItemIncreaseBtn
                                : ''
                            }
                            "
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <button class="cart-item__remove-btn 
                          ${
                            options?.additionalClasses?.cartItemRemoveBtn !==
                            undefined
                              ? options.additionalClasses.cartItemRemoveBtn
                              : ''
                          }
                          "
            >Bỏ</button>
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
        options?.decreaseBtnEventHandler !== undefined
          ? options.decreaseBtnEventHandler
          : defaultDecreaseHandler;
      decreaseBtn.addEventListener('click', () => {
        decreaseHandler();
      });

      const increaseHandler =
        options?.increaseBtnEventHandler !== undefined
          ? options.increaseBtnEventHandler
          : defaultIncreaseHandler;
      increaseBtn.addEventListener('click', () => {
        increaseHandler();
      });

      const removeHandler =
        options?.removeBtnEventHandler !== undefined
          ? options.removeBtnEventHandler
          : defaultRemoveHandler;
      removeBtn.addEventListener('click', () => {
        removeHandler();
      });

      return cartItem;
    },
  };
}

function defaultDecreaseHandler() {}

function defaultIncreaseHandler() {}

function defaultRemoveHandler() {}

const options = {
  productDetail: {
    id: 1,
    images: ['123', '234'],
    name: 'abc',
    totalQuantity: 8,
    currentQuanity: 1,
    price: 12345,
  },
  additionalClasses: {
    cartItem: '2',
    cartItemImg: '2',
    cartItemBody: '2',
    cartItemInfo: '2',
    cartItemName: '2',
    cartItemPriceWrapper: '2',
    cartItemTotalPrice: '2',
    cartItemProductPrice: '2',
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

export { getProductCartItemFactory };
