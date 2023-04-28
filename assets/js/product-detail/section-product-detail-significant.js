import { capitalizeTheFirstLetterOfFirstWord } from '../commons/utils.js';

function renderProductDetailSignificant(significantDOMElement, product) {
  significantDOMElement.innerHTML = `
    <div class="row">
      ${product.significants
        .map((significant) => {
          return `
          <div class="col l-4 m-4 c-12">
            <div class="prod-detail-significant__item">
              <div
                class="prod-detail-significant__item-title gradient-text-primary-color-light"
              >
                ${significant?.title}
              </div>
              <div class="prod-detail-significant__item-subtitle">
                ${capitalizeTheFirstLetterOfFirstWord(significant?.content)}
              </div>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>
  `;
}

export { renderProductDetailSignificant };
