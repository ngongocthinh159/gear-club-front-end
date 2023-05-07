import { getToken, numberWithCommas } from '../commons/utils.js';
import { slugify } from '../commons/utils.js';
import { fetchData, request } from './fetch.js';
import { API } from './restful-api.js';
import { renderCartContainer } from './header/header-cart-container.js';

const CURRENCY = '₫';
const LOADING_DELAY_ANIMATION_TIME = 1000;

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
          class="btn btn-primary btn-icon btn-icon-leading product-card__add-cart-btn 
                ${
                  options?.additionalClasses?.productCardAddBtn !== undefined
                    ? options.additionalClasses.productCardAddBtn
                    : ''
                }
                " 
          data-product-id="${
            options?.productDetail?.id !== undefined
              ? options.productDetail.id
              : ''
          }" 
          data-add-to-cart-btn
        >
          <i class="bi bi-cart-plus"></i><span>Thêm</span>
          <div class="product-card__add-btn-loading circle-loading">
          </div>
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
        handlerFunction(options, 1, productCard);
      });

      return productCard;
    },
  };
}

function defaultAddBtnEventHandler(options, addingQuantity, stateChangeNode) {
  // Toast options
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

  // If the node is still in loading state => abort the action
  const isInLoadingState = [...stateChangeNode.classList].find((className) => {
    return className.includes('--loading');
  });
  if (isInLoadingState) return;

  // If the node is not in loading state => start loading
  stateChangeNode.classList.add(stateChangeNode.classList[0] + '--loading');

  // Call add new product to cart API first, then update UI
  const token = getToken();
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  const productId = options.productDetail.id;
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      productId: productId,
      quantity: addingQuantity,
    }),
  };
  request(API.getAddProductToCartAPI(), requestOptions, (result) => {
    // Done loading state
    setTimeout(() => {
      stateChangeNode.classList.remove(
        stateChangeNode.classList[0] + '--loading'
      );
    }, LOADING_DELAY_ANIMATION_TIME);

    // If the product cannot be added
    if (result.status === 'bad') {
      // If duplicate => Show toast
      if (result.message === 'duplicated') {
        toastr['error']('Sản phẩm đã tồn tại trong giỏ hàng', 'Lỗi');
      }
      return;
    }

    // Added successfully => Rerender cart container
    const headerDOMNode = document.querySelector('header.header');
    renderCartContainer(headerDOMNode);

    // Show toast
    toastr['success'](
      'Một sản phẩm mới vừa được thêm vào rỏ hàng',
      'Thành công'
    );
  });
}

const options = {
  productDetail: {
    id: 1,
    images: ['123', '234'],
    name: 'abc',
    totalQuantity: 8,
    price: 12345,
  },
  additionalClasses: {
    productCard: '2',
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

export { getProductCardFactory, defaultAddBtnEventHandler };
