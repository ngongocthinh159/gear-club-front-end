import { capitalizeTheFirstLetterOfFirstWord } from '../commons/utils.js';

function renderProductDetailSignificant(significantDOMElement, product) {
  significantDOMElement.innerHTML = `
    <div class="row">
      ${getHighlightsHTMLs(product.highlights)}
    </div>
  `;
}

function getHighlightsHTMLs(highlights) {
  const HTMLs = [];
  for (const name in highlights) {
    const highlightsName = name;
    const highlightsDetail = highlights[highlightsName];

    HTMLs.push(`
      <div class="col l-4 m-4 c-12">
        <div class="prod-detail-significant__item">
          <div
            class="prod-detail-significant__item-title gradient-text-primary-color-light"
          >
            ${highlightsName}
          </div>
          <div class="prod-detail-significant__item-subtitle">
            ${capitalizeTheFirstLetterOfFirstWord(highlightsDetail)}
          </div>
        </div>
      </div>
    `);
  }

  return HTMLs.join('');
}

export { renderProductDetailSignificant };
