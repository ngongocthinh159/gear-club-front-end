import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getProductCardFactory } from '../commons/product-card-factory.js';

/**
 * Create a <section class="trend-prod-2"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTrendingProduct2Events() to handle all related events
 * @param {DOM Element} trendProd2DOMNode
 */
function renderSectionTrendingProduct2(trendProd2DOMNode) {
  // Fetch products in collection trending 2, then update UI
  const productList = [];
  const productBannerImages = [];

  fetchData(API.getTrendingCollectionByNameAPI('Trend2'), (result) => {
    const products = result.productList;
    const totalNumberOfProducts = Object.keys(products).length;
    let index = 0;
    let count = 0;

    for (const productId in products) {
      const productImage = products[productId];
      const currentIndex = index;

      // Fetch each product data
      fetchData(API.getProductByIdAPI(productId), (product) => {
        productList[currentIndex] = product;
        productBannerImages[currentIndex] = productImage;

        count++;
        if (count === totalNumberOfProducts) {
          trendProd2DOMNode.innerHTML = `
            <div class="container-1600">

              <!--- First product -->
              <h3 class="trend-prod-2__heading">${productList[0].vendorName}</h3>

              <div class="row">
                <div class="col l-6 m-6 c-12">
                  <div class="trend-prod-2__item-container">
                    <a href="/product-detail.html?productId=${
                      productList[0].id
                    }" class="trend-prod-2__item-link">
                      <div
                        class="trend-prod-2__item-img-wrapper trend-prod-2__item-1"
                      >
                        <img
                          src="${productBannerImages[0]}"
                          alt="Product image"
                          class="trend-prod-2__item-img"
                        />
                        <span class="trend-prod-2__item-label"></span>
                      </div>
                    </a>
                  </div>
                </div>





                <!--- All carousel products -->
                <div class="col l-6 m-6 c-12">
                  <div class="trend-prod-2__item-container trend-prod-2__item-2">
                    <div class="trend-prod-2__carousel-wrapper">

                      <!--- Product cards render inside here -->
                      <ul class="trend-prod-2__carousel-list"></ul>

                      <div class="trend-prod-2__carousel-control">
                        <button class="trend-prod-2__carousel-prev-btn"></button>
                        <button class="trend-prod-2__carousel-next-btn"></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>





              <!--- Last 2 products -->
              <div class="row">
                <div class="col l-6 m-6 c-12">
                  <div class="trend-prod-2__item-container">
                    <a href="/product-detail.html?productId=${
                      productList[totalNumberOfProducts - 1].id
                    }" class="trend-prod-2__item-link">
                      <div
                        class="trend-prod-2__item-img-wrapper trend-prod-2__item-3"
                      >
                        <img
                          src="${
                            productBannerImages[totalNumberOfProducts - 1]
                          }"
                          alt="Product image"
                          class="trend-prod-2__item-img"
                        />
                        <span class="trend-prod-2__item-label">${
                          productList[totalNumberOfProducts - 1].name
                        }</span>
                      </div>
                    </a>
                  </div>
                </div>


                <div class="col l-6 m-6 c-12">
                  <div class="trend-prod-2__item-container">
                    <a href="/product-detail.html?productId=${
                      productList[totalNumberOfProducts - 2].id
                    }" class="trend-prod-2__item-link">
                      <div
                        class="trend-prod-2__item-img-wrapper trend-prod-2__item-3"
                      >
                        <img
                          src="${
                            productBannerImages[totalNumberOfProducts - 2]
                          }"
                          alt="Product image"
                          class="trend-prod-2__item-img"
                        />
                        <span class="trend-prod-2__item-label">${
                          productList[totalNumberOfProducts - 1].name
                        }</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;

          // Get product cards
          const carouselList = document.querySelector(
            '.trend-prod-2__carousel-list'
          );
          for (let i = 1; 1 <= i && i <= totalNumberOfProducts - 3; i++) {
            const options = {
              productDetail: {
                id: productList[i].id,
                images: productList[i].images,
                name: productList[i].name,
                totalQuantity: productList[i].quantity,
                price: productList[i].price,
              },
              additionalClasses: {
                productCard: 'trend-prod-2__carousel-item',
                productCardLink: '',
                productCardImgWrapper: '',
                productCardMainImg: '',
                productCardHoverImg: '',
                productCardName: '',
                productCardAddBtn: '',
                productCardSoldout: '',
                productCardPrice: '',
              },
            };

            if (i === 1) {
              options.additionalClasses.productCard =
                'trend-prod-2__carousel-item trend-prod-2__carousel-item--active';
            }

            const card = getProductCardFactory(options).buildCardElement();

            carouselList.appendChild(card);
          }

          // Handle events
          handleSectionTrendingProduct2Events(trendProd2DOMNode);
        }
      });

      index++;
    }
  });
}

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

export { renderSectionTrendingProduct2 };
