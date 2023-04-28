import { fetchData } from '../commons/fetch.js';
import { renderProductDetailMain } from '../product-detail/section-product-detail-main.js';
import { renderProductDetailInfo } from '../product-detail/section-product-detail-info.js';
import { renderProductDetailSignificant } from '../product-detail/section-product-detail-significant.js';

function renderProductDetail(prodDetailDOMElement) {
  prodDetailDOMElement.innerHTML = `
    <div class="grid wide">
      <!-- Main -->
      <div class="prod-detail-main"></div>

      <!-- Information & Detail -->
      <div class="prod-detail-info-and-detail"></div>

      <!-- Significant attributes -->
      <div class="prod-detail-significant"></div>
    </div>
  `;

  // Fetch data then put it into each section
  fetchData('get one product', (product) => {
    const mainDOMElement =
      prodDetailDOMElement.querySelector('.prod-detail-main');
    renderProductDetailMain(mainDOMElement, product);

    const infoDOMElement = prodDetailDOMElement.querySelector(
      '.prod-detail-info-and-detail'
    );
    renderProductDetailInfo(infoDOMElement, product);

    const significantDOMElement = prodDetailDOMElement.querySelector(
      '.prod-detail-significant'
    );
    renderProductDetailSignificant(significantDOMElement, product);
  });
}





export { renderProductDetail };
