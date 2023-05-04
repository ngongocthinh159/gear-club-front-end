import { capitalizeTheFirstLetterOfFirstWord } from '../commons/utils.js';

function renderProductDetailInfo(infoDOMElement, product) {
  infoDOMElement.innerHTML = `
    <div class="row">
      <div class="col l-6 m-12 c-12">
        <div class="prod-detail-info">
          <h4 class="prod-detail-info__subtitle">
            ${capitalizeTheFirstLetterOfFirstWord(product?.name)}
          </h4>
          <h3
            class="prod-detail-info__title gradient-text-primary-color-light"
          >
            ${capitalizeTheFirstLetterOfFirstWord(product?.title)}
          </h3>
          <p class="prod-detail-info__description">
            ${capitalizeTheFirstLetterOfFirstWord(product?.intro)}
          </p>
        </div>
      </div>

      <div class="col l-6 m-12 c-12">
        <div class="prod-detail-detail">
          <ul class="prod-detail-detail__list">
            ${getFeaturesHTMLs(product.features)}
          </ul>
        </div>
      </div>
    </div>
  `;

  // Event handling
}

function getFeaturesHTMLs(features) {
  const HTMLs = [];
  for (const name in features) {
    const featureName = name;
    const featureDetail = features[featureName];
    
    HTMLs.push(`
      <li class="prod-detail-detail__item">
        <span class="prod-detail-detail__item-title"
          >${featureName}</span
        >
        <span class="prod-detail-detail__item-detail"
          >${featureDetail}</span
        >
      </li>
    `);
  }

  return HTMLs.join('');
}

export { renderProductDetailInfo };
