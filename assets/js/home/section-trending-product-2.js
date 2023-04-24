function handleSectionTrendingProduct2Events(trendProd2DOMNode) {
  // Carousel next/prev btn
  const prevBtn = trendProd2DOMNode.querySelector(
    '.trend-prod-2__carousel-prev-btn'
  );
  const nextBtn = trendProd2DOMNode.querySelector(
    '.trend-prod-2__carousel-next-btn'
  );
  const carouselItems = [
    ...trendProd2DOMNode.querySelectorAll('.trend-prod-2__carousel-item'),
  ];
  prevBtn.addEventListener('click', (e) => {
    // Get current active index, and turn off active item
    let activeIndex = null;
    carouselItems.forEach((carouselItem, index) => {
      if (
        carouselItem.classList.contains('trend-prod-2__carousel-item--active')
      ) {
        activeIndex = index;
      }
      carouselItem.classList.remove('trend-prod-2__carousel-item--active');
    });

    // Active the prev index
    if (activeIndex === 0) activeIndex = carouselItems.length - 1;
    else activeIndex--;

    carouselItems[activeIndex].classList.add(
      'trend-prod-2__carousel-item--active'
    );
  });
  nextBtn.addEventListener('click', (e) => {
    // Get current active index, and turn off active item
    let activeIndex = null;
    carouselItems.forEach((carouselItem, index) => {
      if (
        carouselItem.classList.contains('trend-prod-2__carousel-item--active')
      ) {
        activeIndex = index;
      }
      carouselItem.classList.remove('trend-prod-2__carousel-item--active');
    });

    // Active the next index
    if (activeIndex === carouselItems.length - 1) activeIndex = 0;
    else activeIndex++;
    carouselItems[activeIndex].classList.add(
      'trend-prod-2__carousel-item--active'
    );
  });
}

/**
 * Create a <section class="trend-prod-2"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTrendingProduct2Events() to handle all related events
 * @param {DOM Element} trendProd2DOMNode
 */
function renderSectionTrendingProduct2(trendProd2DOMNode) {
  trendProd2DOMNode.innerHTML = `
    <div class="container-1600">
      <h3 class="trend-prod-2__heading">Pulsar x Bruce Lee</h3>

      <div class="row">
        <div class="col l-6 m-6 c-12">
          <div class="trend-prod-2__item-container">
            <a href="" class="trend-prod-2__item-link">
              <div
                class="trend-prod-2__item-img-wrapper trend-prod-2__item-1"
              >
                <img
                  src="./assets/imgs/home/mock-product-3.webp"
                  alt="Product image"
                  class="trend-prod-2__item-img"
                />
                <span class="trend-prod-2__item-label"></span>
              </div>
            </a>
          </div>
        </div>
        <div class="col l-6 m-6 c-12">
          <div class="trend-prod-2__item-container trend-prod-2__item-2">
            <div class="trend-prod-2__carousel-wrapper">
              <ul class="trend-prod-2__carousel-list">
                <li class="trend-prod-2__carousel-item trend-prod-2__carousel-item--active product-card">
                  <a href="" class="trend-prod-2__carousel-item-link product-card__link">
                    <div class="trend-prod-2__carousel-item-img-wrapper product-card__img-wrapper">
                      <img
                        class="trend-prod-2__carousel-item-img product-card__img product-card__main-img"
                        src="./assets/imgs/home/mock-product-2.webp"
                        alt="Hot product image"
                      />

                      <img
                        class="trend-prod-2__carousel-item-img product-card__img product-card__hover-img"
                        src="./assets/imgs/home/mock-product.webp"
                        alt="Hot product image"
                      />
                    </div>

                    <p class="trend-prod-2__carousel-item-name product-card__name">
                      Chuột không dây siêu nhẹ Pulsar X2 Wireless X RandomfrankP (Limited
                      Edition)
                    </p>
                  </a>

                  <button
                    class="trend-prod-2__carousel-item-add-cart-btn btn btn-primary product-card__add-cart-btn"
                    data-product-id
                    data-add-to-cart-btn
                  >
                    + Thêm
                  </button>

                  <div class="trend-prod-2__carousel-item-sold-out product-card__sold-out">Hết hàng</div>

                  <p class="trend-prod-2__carousel-item-price product-card__price">2.499.000đ</p>
                </li>

                <li class="trend-prod-2__carousel-item product-card">
                  <a href="" class="trend-prod-2__carousel-item-link product-card__link">
                    <div class="trend-prod-2__carousel-item-img-wrapper product-card__img-wrapper">
                      <img
                        class="trend-prod-2__carousel-item-img product-card__img product-card__main-img"
                        src="./assets/imgs/home/mock-product-3.webp"
                        alt="Hot product image"
                      />

                      <img
                        class="trend-prod-2__carousel-item-img product-card__img product-card__hover-img"
                        src="./assets/imgs/home/mock-product.webp"
                        alt="Hot product image"
                      />
                    </div>

                    <p class="trend-prod-2__carousel-item-name product-card__name">
                      Chuột không dây siêu nhẹ Pulsar X2 Wireless X RandomfrankP (Limited
                      Edition)
                    </p>
                  </a>

                  <button
                    class="trend-prod-2__carousel-item-add-cart-btn btn btn-primary product-card__add-cart-btn"
                    data-product-id
                    data-add-to-cart-btn
                  >
                    + Thêm
                  </button>

                  <div class="trend-prod-2__carousel-item-sold-out product-card__sold-out">Hết hàng</div>

                  <p class="trend-prod-2__carousel-item-price product-card__price">2.499.000đ</p>
                </li>
              </ul>

              <div class="trend-prod-2__carousel-control">
                <button class="trend-prod-2__carousel-prev-btn"></button>
                <button class="trend-prod-2__carousel-next-btn"></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col l-6 m-6 c-12">
          <div class="trend-prod-2__item-container">
            <a href="" class="trend-prod-2__item-link">
              <div
                class="trend-prod-2__item-img-wrapper trend-prod-2__item-3"
              >
                <img
                  src="./assets/imgs/home/mock-product-3.webp"
                  alt="Product image"
                  class="trend-prod-2__item-img"
                />
                <span class="trend-prod-2__item-label">Lót chuột vải</span>
              </div>
            </a>
          </div>
        </div>
        <div class="col l-6 m-6 c-12">
          <div class="trend-prod-2__item-container">
            <a href="" class="trend-prod-2__item-link">
              <div
                class="trend-prod-2__item-img-wrapper trend-prod-2__item-3"
              >
                <img
                  src="./assets/imgs/home/mock-product-3.webp"
                  alt="Product image"
                  class="trend-prod-2__item-img"
                />
                <span class="trend-prod-2__item-label">Lót chuột cứng</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Handle events
  handleSectionTrendingProduct2Events(trendProd2DOMNode);
}

export { renderSectionTrendingProduct2 };
