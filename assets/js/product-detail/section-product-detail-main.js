import { numberWithCommas } from '../commons/utils.js';
import { defaultAddBtnEventHandler } from '../commons/product-card-factory.js';

function renderProductDetailMain(mainDOMElement, product) {
  mainDOMElement.innerHTML = `
    <div class="row">
      <!-- Main left -->
      <div class="col l-7 m-12 c-12">
        <div class="prod-detail-main__carousel">
          <div class="prod-detail-main__carousel-list-wrapper">
            <ul class="prod-detail-main__carousel-list">
              ${product.images
                .map((image, index) => {
                  return `
                  <li
                    class="prod-detail-main__carousel-item 
                          ${
                            index === 0
                              ? 'prod-detail-main__carousel-item--active'
                              : ''
                          }"
                    data-image-index="${index}"
                  >
                    <img
                      src="${image}"
                      alt="Product image"
                      class="prod-detail-main__carousel-img"
                    />
                  </li>
                `;
                })
                .join('')}
            </ul>

            <div class="prod-detail-main__carousel-list-fading"></div>
          </div>

          <div class="prod-detail-main__carousel-main-img-wrapper-1">
            <div
              class="prod-detail-main__carousel-main-img-wrapper-1-overlay"
              data-zoom-toggler
            >
              <button 
                class="prod-detail-main__carousel-zoom-close-btn"
                data-zoom-toggler
              >
                <i class="bi bi-x"></i>
              </button>
            </div>

            <div class="prod-detail-main__carousel-main-img-wrapper-2">
              <img
                src="${product?.images[0]}"
                alt="Product image"
                class="prod-detail-main__carousel-main-img"
              />

              <div
                class="prod-detail-main__carousel-img-zoom-btn"
                data-zoom-toggler
              >
                <i class="bi bi-zoom-in"></i>
              </div>

              <div class="prod-detail-main__carousel-control">
                <button 
                  class="prod-detail-main__carousel-control-btn 
                        prod-detail-main__carousel-prev-btn"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>

                <button 
                  class="prod-detail-main__carousel-control-btn 
                        prod-detail-main__carousel-next-btn"
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>

              <div class="prod-detail-main__carousel-image-index-wrapper">
                <span class="prod-detail-main__carousel-image-current-index">1</span>
                <span>/</span>
                <span class="prod-detail-main__carousel-image-total-index">
                  ${product.images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Main right -->
      <div class="col l-5 m-12 c-12">
        <div class="prod-detail-main__right-container">
          <span class="prod-detail-main__prod-brand">${product?.brand}</span>
          <h3 class="prod-detail-main__prod-name">${product?.name}</h3>

          <div class="prod-detail-main__prod-price-wrapper">
            <span class="prod-detail-main__prod-price">
              ${
                product.price
                  ? numberWithCommas(product.price) + '₫'
                  : 'Wait for price updating'
              }
            </span>
            <span class="prod-detail-main__prod-star">
              5.0
              <i class="bi bi-star-fill"></i>
            </span>
          </div>

          <p class="prod-detail-main__prod-description">
            ${product?.description}
          </p>

          <span class="prod-detail-main__prod-designed-country">
            Designed in
            <span class="">${product?.designedIn}</span>
          </span>
          <span class="prod-detail-main__prod-warranty">
            Bảo hành: ${product?.warrantyPeriodInMonths} tháng đổi mới
          </span>
          
          <!-- Render control button when quantity !== 0 -->
          ${
            product.quantity === 0
              ? ''
              : `
              <div class="prod-detail-main__prod-quantity-wrapper">
                <span class="prod-detail-main__prod-quantity-text">
                  Số lượng:
                </span>
                
                <div class="prod-detail-main__prod-quantity-control">
                  <button
                    class="prod-detail-main__prod-quantity-decrease-btn
                          prod-detail-main__prod-quantity-btn--disabled
                    "
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                  <span class="prod-detail-main__prod-quantity-num">1</span>
                  <button
                    class="prod-detail-main__prod-quantity-increase-btn"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            `
          }

          <div class="prod-detail-main__prod-quantity-status 
                      ${
                        product.quantity === 0
                          ? 'prod-detail-main__prod-quantity-status--soldout'
                          : ''
                      }"
          >
            <div
              class="prod-detail-main__prod-quantity-status-available"
            >
              <i class="bi bi-check-circle-fill"></i>
              Còn lại ${product?.quantity} sản phẩm
            </div>
            <div class="prod-detail-main__prod-quantity-status-soldout">
              <i class="bi bi-exclamation-diamond-fill"></i>
              Hết hàng
            </div>
          </div>

          <button
            class="prod-detail-main__add-cart-btn btn btn-primary 
                  ${product.quantity === 0 ? 'btn-disabled' : ''}"
          >
            <div class="prod-detail-main__add-cart-btn-loading circle-loading"></div>
          </button>
        </div>
      </div>
    </div>
  `;

  // Event handler
  handleEvent(mainDOMElement, product);
}

function handleEvent(mainDOMElement, product) {
  // Handle image click (change main image)
  const imageWrapperItems = [
    ...mainDOMElement.querySelectorAll('.prod-detail-main__carousel-item'),
  ];
  const mainImage = mainDOMElement.querySelector(
    '.prod-detail-main__carousel-main-img'
  );
  imageWrapperItems.forEach((imageWrapperItem) => {
    imageWrapperItem.addEventListener('click', (e) => {
      if (
        imageWrapperItem.classList.contains(
          'prod-detail-main__carousel-item--active'
        )
      ) {
        return;
      }

      for (let item of imageWrapperItems) {
        item.classList.remove('prod-detail-main__carousel-item--active');
      }

      imageWrapperItem.classList.add('prod-detail-main__carousel-item--active');

      // Update image
      mainImage.src = imageWrapperItem.querySelector(
        '.prod-detail-main__carousel-img'
      ).src;

      // Update Active Index Text
      updateActiveIndexText(mainDOMElement);
    });
  });

  // Handle zoom toggler
  const zoomTogglers = mainDOMElement.querySelectorAll('[data-zoom-toggler]');
  const mainImageWrapper = mainDOMElement.querySelector(
    '.prod-detail-main__carousel-main-img-wrapper-1'
  );
  zoomTogglers.forEach((zoomToggler) => {
    zoomToggler.addEventListener('click', (e) => {
      // If target is close btn or icon of close btn => Stop propagation to not toggle twice
      if (
        e.target.classList.contains(
          'prod-detail-main__carousel-zoom-close-btn'
        ) ||
        e.target.classList.contains('bi-x')
      ) {
        e.stopPropagation();
      }

      mainImageWrapper.classList.toggle(
        'prod-detail-main__carousel-main-img-wrapper-1--zoom'
      );
    });
  });

  // Handle next/prev image button clicks
  handlePrevNextBtnsClick(mainDOMElement);

  // Handle increase/decrease quantity
  handleQuantityBtnsClick(mainDOMElement, product.quantity);

  // Handle add btn click
  hanleAddBtnClick(mainDOMElement, product);
}

function handlePrevNextBtnsClick(mainDOMElement) {
  const carouselControlBtns = [
    ...mainDOMElement.querySelectorAll(
      '.prod-detail-main__carousel-control-btn'
    ),
  ];
  const carouselItems = [
    ...mainDOMElement.querySelectorAll('.prod-detail-main__carousel-item'),
  ];

  carouselControlBtns.forEach((carouselControlBtn) => {
    carouselControlBtn.addEventListener('click', () => {
      // Get current active index
      const activeItem = mainDOMElement.querySelector(
        '.prod-detail-main__carousel-item--active'
      );
      let activeIndex = Number(activeItem.dataset.imageIndex);

      // Get next active index
      let nextActiveIndex = -1;
      if (
        carouselControlBtn.classList.contains(
          'prod-detail-main__carousel-next-btn'
        )
      ) {
        nextActiveIndex =
          activeIndex === carouselItems.length - 1 ? 0 : ++activeIndex;
      } else {
        nextActiveIndex =
          activeIndex === 0 ? carouselItems.length - 1 : --activeIndex;
      }

      // Active the next active item
      carouselItems.forEach((carouselItem, index) => {
        if (index !== nextActiveIndex) {
          carouselItem.classList.remove(
            'prod-detail-main__carousel-item--active'
          );
        } else {
          carouselItem.classList.add('prod-detail-main__carousel-item--active');
        }
      });

      // Display active image
      const mainImage = mainDOMElement.querySelector(
        '.prod-detail-main__carousel-main-img'
      );
      mainImage.src = mainDOMElement
        .querySelector('.prod-detail-main__carousel-item--active')
        .querySelector('.prod-detail-main__carousel-img').src;

      // update Active Index Text
      updateActiveIndexText(mainDOMElement);
    });
  });
}

// Update active index of carousel
function updateActiveIndexText(mainDOMElement) {
  const activeItem = mainDOMElement.querySelector(
    '.prod-detail-main__carousel-item--active'
  );
  const currentIndexElement = mainDOMElement.querySelector(
    '.prod-detail-main__carousel-image-current-index'
  );

  currentIndexElement.innerHTML = Number(activeItem.dataset.imageIndex) + 1;
}

function handleQuantityBtnsClick(mainDOMElement, quantity) {
  const decreaseBtn = mainDOMElement.querySelector(
    '.prod-detail-main__prod-quantity-decrease-btn'
  );
  const increaseBtn = mainDOMElement.querySelector(
    '.prod-detail-main__prod-quantity-increase-btn'
  );
  const quantityElement = mainDOMElement.querySelector(
    '.prod-detail-main__prod-quantity-num'
  );

  decreaseBtn.addEventListener('click', () => {
    let currentQuantity = Number(quantityElement.innerHTML);
    let nextQuantity = currentQuantity === 1 ? 1 : --currentQuantity;

    if (nextQuantity === 1) {
      decreaseBtn.classList.add(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    } else {
      decreaseBtn.classList.remove(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    }

    if (nextQuantity === quantity) {
      increaseBtn.classList.add(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    } else {
      increaseBtn.classList.remove(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    }

    quantityElement.innerHTML = nextQuantity;
  });

  increaseBtn.addEventListener('click', () => {
    let currentQuantity = Number(quantityElement.innerHTML);
    let nextQuantity =
      currentQuantity === quantity ? quantity : ++currentQuantity;

    if (nextQuantity === 1) {
      decreaseBtn.classList.add(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    } else {
      decreaseBtn.classList.remove(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    }

    if (nextQuantity === quantity) {
      increaseBtn.classList.add(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    } else {
      increaseBtn.classList.remove(
        'prod-detail-main__prod-quantity-btn--disabled'
      );
    }

    quantityElement.innerHTML = nextQuantity;
  });
}

/**
 * The main logic is in the defaultAddBtnEventHandler() function in product card factory file
 * @param {*} mainDOMElement
 * @param {*} product
 */
function hanleAddBtnClick(mainDOMElement, product) {
  const addBtn = mainDOMElement.querySelector(
    '.prod-detail-main__add-cart-btn'
  );

  addBtn.addEventListener('click', () => {
    const addingQuantity = Number(
      mainDOMElement.querySelector('.prod-detail-main__prod-quantity-num')
        .innerText
    );

    const options = {
      productDetail: {
        id: product.id,
        images: product.images,
        name: product.name,
        totalQuantity: product.quantity,
        price: product.price,
      },
      additionalClasses: {
        cartItemProductPriceWrapper: 'd-none',
      },
    };

    defaultAddBtnEventHandler(options, addingQuantity, addBtn);
  });
}

export { renderProductDetailMain };
