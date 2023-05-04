import { fetchData } from '../commons/fetch.js';
import { renderProductDetailMain } from '../product-detail/section-product-detail-main.js';
import { renderProductDetailInfo } from '../product-detail/section-product-detail-info.js';
import { renderProductDetailSignificant } from '../product-detail/section-product-detail-significant.js';
import { renderAlsoLike } from './section-also-like.js';
import { API } from '../commons/restful-api.js';
import { getKeyValueStringsFromURLSearch } from '../commons/utils.js';

function renderProductDetail(prodDetailDOMNode) {
  prodDetailDOMNode.innerHTML = `
    <div class="grid wide">
      <!-- Main -->
      <div class="prod-detail-main"></div>

      <!-- Information & Detail -->
      <div class="prod-detail-info-and-detail"></div>

      <!-- Significant attributes -->
      <div class="prod-detail-significant"></div>
    </div>
  `;

  // Get product id form URL
  let productId = null;
  const keyValuePairs = getKeyValueStringsFromURLSearch(window.location.search);
  keyValuePairs.forEach((keyValuePair) => {
    const key = keyValuePair[0];
    const value = keyValuePair[1];

    if (key === 'productId') {
      productId = value;
    }
  });
  if (!productId) return;

  // Fetch data then put it into each section
  fetchData(API.getProductByIdAPI(productId), (product) => {
    const mainDOMElement = prodDetailDOMNode.querySelector('.prod-detail-main');
    renderProductDetailMain(mainDOMElement, product);

    const infoDOMElement = prodDetailDOMNode.querySelector(
      '.prod-detail-info-and-detail'
    );
    renderProductDetailInfo(infoDOMElement, product);

    const significantDOMElement = prodDetailDOMNode.querySelector(
      '.prod-detail-significant'
    );
    renderProductDetailSignificant(significantDOMElement, product);

    const alsoLikeDOMNode = document.querySelector('.prod-detail__also-like');
    renderAlsoLike(alsoLikeDOMNode, product);
  });
}

export { renderProductDetail };
