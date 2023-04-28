import { capitalizeTheFirstLetterOfFirstWord } from '../commons/utils.js';

function renderProductDetailInfo(infoDOMElement, product) {
  infoDOMElement.innerHTML = `
    <div class="row">
      <div class="col l-6 m-12 c-12">
        <div class="prod-detail-info">
          <h4 class="prod-detail-info__subtitle">
            ${capitalizeTheFirstLetterOfFirstWord(
              product?.information?.subtitle
            )}
          </h4>
          <h3
            class="prod-detail-info__title gradient-text-primary-color-light"
          >
            ${capitalizeTheFirstLetterOfFirstWord(product?.information?.title)}
          </h3>
          <p class="prod-detail-info__description">
            ${capitalizeTheFirstLetterOfFirstWord(
              product?.information?.description
            )}
          </p>
        </div>
      </div>

      <div class="col l-6 m-12 c-12">
        <div class="prod-detail-detail">
          <ul class="prod-detail-detail__list">
            ${product?.detail
              .map((detail) => {
                return `
                <li class="prod-detail-detail__item">
                  <span class="prod-detail-detail__item-title"
                    >${detail.title}</span
                  >
                  <span class="prod-detail-detail__item-detail"
                    >${detail.content}</span
                  >
                </li>
              `;
              })
              .join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  // Event handling
}

export { renderProductDetailInfo };
