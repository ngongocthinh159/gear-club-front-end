import { numberWithCommas } from '../commons/utils.js';
import { slugify } from '../commons/utils.js';

const CURRENCY = '₫';

function getProductCardFactory(options) {
  const slug =
    options?.productDetail?.name !== undefined
      ? slugify(options.productDetail.name)
      : '';

  return {
    buildCardElement: () => {
      const productCard = document.createElement('div');
      productCard.className = `
        product-card 
        ${
          options?.productDetail?.totalQuantity === 0
            ? 'product-card--soldout'
            : ''
        } 
        ${
          options?.additionalClasses?.productCard !== undefined
            ? options.additionalClasses.productCard
            : ''
        }
      `;

      productCard.innerHTML = `
        <a href="
                ${
                  options?.productDetail?.id !== undefined
                    ? `/product-detail.html?slug=${slug}&productId=${options.productDetail.id}`
                    : ''
                }
                " 
            class="product-card__link 
                  ${
                    options?.additionalClasses?.productCardLink !== undefined
                      ? options.additionalClasses.productCardLink
                      : ''
                  }
                  "
        >
          <div class="product-card__img-wrapper 
                      ${
                        options?.additionalClasses?.productCardImgWrapper !==
                        undefined
                          ? options.additionalClasses.productCardImgWrapper
                          : ''
                      }
                      "
          >
            <img
              class="product-card__img product-card__main-img 
                      ${
                        options?.additionalClasses?.productCardMainImg !==
                        undefined
                          ? options.additionalClasses.productCardMainImg
                          : ''
                      }
                    "
              src="${
                options?.productDetail?.images[0] !== undefined
                  ? options.productDetail.images[0]
                  : ''
              }"
              alt="First product image"
            />

            <img
              class="product-card__img product-card__hover-img 
                      ${
                        options?.additionalClasses?.productCardHoverImg !==
                        undefined
                          ? options.additionalClasses.productCardHoverImg
                          : ''
                      }
                    "
              src="${
                options?.productDetail?.images[1] !== undefined
                  ? options.productDetail.images[1]
                  : ''
              }"
              alt="Second product image"
            />
          </div>

          <p class="product-card__name 
                    ${
                      options?.additionalClasses?.productCardName !== undefined
                        ? options.additionalClasses.productCardName
                        : ''
                    }
                    "
          >
            ${
              options?.productDetail?.name !== undefined
                ? options.productDetail.name
                : ''
            }
          </p>
        </a>

        <button
          class="btn btn-primary product-card__add-cart-btn 
                ${
                  options?.additionalClasses?.productCardAddBtn !== undefined
                    ? options.additionalClasses.productCardAddBtn
                    : ''
                }
                "
          data-product-id="${
            options?.productDetail?.id !== undefined
              ? options.productDetail.id
              : defaultAddBtnEventHandler
          }"
          data-add-to-cart-btn
        >
          + Thêm
        </button>

        <div class="product-card__sold-out">Hết hàng</div>

        <p class="product-card__price">
          ${
            options?.productDetail?.price !== undefined
              ? numberWithCommas(options.productDetail.price)
              : ''
          }${CURRENCY}
        </p>
      `;

      // Add btn event handler
      const addBtn = productCard.querySelector('.product-card__add-cart-btn');
      const handlerFunction =
        options?.addBtnEventHandler !== undefined
          ? options.addBtnEventHandler
          : defaultAddBtnEventHandler;

      addBtn.addEventListener('click', () => {
        handlerFunction();
      });

      return productCard;
    },
  };
}

function defaultAddBtnEventHandler() {}

const options = {
  productDetail: {
    id: 1,
    images: ['123', '234'],
    name: 'abc',
    totalQuantity: 0,
    price: 12345,
  },
  additionalClasses: {
    productCardLink: '2',
    productCardImgWrapper: '3',
    productCardMainImg: '4',
    productCardHoverImg: '5',
    productCardName: '6',
    productCardAddBtn: '7',
    productCardSoldout: '8',
    productCardPrice: '9',
  },
  addBtnEventHandler: () => {},
};

export { getProductCardFactory };
