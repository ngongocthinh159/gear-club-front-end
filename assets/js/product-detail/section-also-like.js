import { fetchData } from '../commons/fetch.js';
import { getProductCardFactory } from '../commons/product-card-factory.js';

function renderAlsoLike(alsoLikeDOMNode) {
  alsoLikeDOMNode.innerHTML = `
    <div class="grid wide">
      <h3 class="prod-detail__also-like-heading">Có thể bạn sẽ thích</h3>

      <div class="row"></div>
    </div>
  `;

  const row = alsoLikeDOMNode.querySelector('.row');

  fetchData('get also like products', (products) => {
    products.forEach((product) => {
      const col = document.createElement('div');
      col.className = 'col l-3 m-6 c-12';

      const options = {
        productDetail: {
          id: product.id,
          images: product.images,
          name: product.name,
          totalQuantity: product.quantity,
          price: product.price,
        },
      };
      const productCard = getProductCardFactory(options).buildCardElement();

      col.appendChild(productCard);
      row.appendChild(col);
    });
  });
}

export { renderAlsoLike };
