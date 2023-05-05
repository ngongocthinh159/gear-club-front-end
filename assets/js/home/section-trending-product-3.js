import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';

const MAX_NUMBER_OF_PRODUCTS = 5;

function handleSectionTrendingProduct3Events(trendProd3DOMNode) {}

/**
 * Create a <section class="trend-prod-3"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionTrendingProduct3Events() to handle all related events
 * @param {DOM Element} trendProd3DOMNode
 */
function renderSectionTrendingProduct3(trendProd3DOMNode) {
  // Fetch products in collection trending 1, then update UI
  const HTMLs = [];
  fetchData(API.getTrendingCollectionByNameAPI('Trend3'), (result) => {
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
          <li class="trend-prod-3__item trend-prod-3__item-${currentIndex + 1}">
            <a href="./product-detail.html?productId=${
              product.id
            }" class="trend-prod-3__item-link">
              <img
                src="${productImage}"
                alt="Product banner image"
                class="trend-prod-3__item-img"
              />
              <h3 class="trend-prod-3__item-title">
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
          trendProd3DOMNode.innerHTML = `
            <div class="container-1600">
              <ul class="trend-prod-3__product-list">
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
  handleSectionTrendingProduct3Events(trendProd3DOMNode);
}

export { renderSectionTrendingProduct3 };
