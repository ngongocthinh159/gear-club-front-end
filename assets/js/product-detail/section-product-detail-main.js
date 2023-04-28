import { numberWithCommas } from '../commons/utils.js';

function renderProductDetailMain(mainDOMElement, product) {
  mainDOMElement.innerHTML = `
    <div class="row">
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
            <div class="prod-detail-main__carousel-main-img-wrapper-2">
              <img
                src="${product?.images[0]}"
                alt="Product image"
                class="prod-detail-main__carousel-main-img"
              />
            </div>
          </div>
        </div>
      </div>




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
                    class="prod-detail-main__prod-quantity-decrease-btn"
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
            class="btn btn-primary prod-detail-main__add-cart-btn 
                  ${product.quantity === 0 ? 'btn-disabled' : ''}"
          ></button>
        </div>
      </div>
    </div>
  `;

  // Event handler
}

export { renderProductDetailMain };
