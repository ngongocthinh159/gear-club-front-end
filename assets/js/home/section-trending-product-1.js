import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';

const MAX_NUMBER_OF_PRODUCTS = 7;

function handleSectionTrendingProduct1Events(trendProd1DOMNode) {}

/**
 * Create a <section class="trend-prod-1"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTrendingProduct1Events() to handle all related events
 * @param {DOM Element} trendProd1DOMNode
 */
function renderSectionTrendingProduct1(trendProd1DOMNode) {
  // Fetch products in collection trending 1, then update UI
  const HTMLs = [];
  fetchData(API.getTrendingCollectionByNameAPI('Trend1'), (result) => {
    const products = result.productList;
    const totalNumberOfProducts = Object.keys(products).length;
    let index = 0;
    let count = 0;

    for (const productId in products) {
      const productImage = products[productId];
      const currentIndex = index;

      // Fetch each product data
      fetchData(API.getProductByIdAPI(productId), (product) => {
        HTMLs[currentIndex] = `
          <li class="trend-prod-1__item trend-prod-1__item-${currentIndex + 1}">
            <a href="./product-detail.html?productId=${
              product.id
            }" class="trend-prod-1__item-link">
              <img
                class="trend-prod-1__item-img"
                src="${productImage}"
                alt="Product banner"
              />
              <h3 class="trend-prod-1__item-title">
                ${product.name}
              </h3>
            </a>
          </li>
        `;

        count++;
        if (
          count === MAX_NUMBER_OF_PRODUCTS ||
          count === totalNumberOfProducts
        ) {
          trendProd1DOMNode.innerHTML = `
            <div class="container-1600">
              <ul class="trend-prod-1__product-list">
                ${HTMLs.join('')}
              </ul>
            </div>
          `;
        }
      });

      index++;
      if (index === MAX_NUMBER_OF_PRODUCTS) break;
    }
  });

  // Handle events
  handleSectionTrendingProduct1Events(trendProd1DOMNode);
}

export { renderSectionTrendingProduct1 };

`
  <li class="trend-prod-1__item trend-prod-1__item-2">
          <a href="" class="trend-prod-1__item-link">
            <img
              class="trend-prod-1__item-img"
              src="./assets/imgs/home/mock-banner-1.webp"
              alt="Product banner"
            />
            <h3 class="trend-prod-1__item-title">
              Glorious Series One Pro
            </h3>
          </a>
        </li>
        <li class="trend-prod-1__item trend-prod-1__item-3">
          <a href="" class="trend-prod-1__item-link">
            <img
              class="trend-prod-1__item-img"
              src="./assets/imgs/home/mock-banner-1.webp"
              alt="Product banner"
            />
            <h3 class="trend-prod-1__item-title">
              Glorious Series One Pro
            </h3>
          </a>
        </li>
        <li class="trend-prod-1__item trend-prod-1__item-4">
          <a href="" class="trend-prod-1__item-link">
            <img
              class="trend-prod-1__item-img"
              src="./assets/imgs/home/mock-banner-1.webp"
              alt="Product banner"
            />
            <h3 class="trend-prod-1__item-title">
              Glorious Series One Pro
            </h3>
          </a>
        </li>
        <li class="trend-prod-1__item trend-prod-1__item-5">
          <a href="" class="trend-prod-1__item-link">
            <img
              class="trend-prod-1__item-img"
              src="./assets/imgs/home/mock-banner-1.webp"
              alt="Product banner"
            />
            <h3 class="trend-prod-1__item-title">
              Glorious Series One Pro
            </h3>
          </a>
        </li>
        <li class="trend-prod-1__item trend-prod-1__item-6">
          <a href="" class="trend-prod-1__item-link">
            <img
              class="trend-prod-1__item-img"
              src="./assets/imgs/home/mock-banner-1.webp"
              alt="Product banner"
            />
            <h3 class="trend-prod-1__item-title">
              Glorious Series One Pro
            </h3>
          </a>
        </li>
        <li class="trend-prod-1__item trend-prod-1__item-7">
          <a href="" class="trend-prod-1__item-link">
            <img
              class="trend-prod-1__item-img"
              src="./assets/imgs/home/mock-banner-1.webp"
              alt="Product banner"
            />
            <h3 class="trend-prod-1__item-title">
              Glorious Series One Pro
            </h3>
          </a>
        </li>
`;
