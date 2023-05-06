import { fetchData } from '../commons/fetch.js';
import { getProductCardFactory } from '../commons/product-card-factory.js';
import { API } from '../commons/restful-api.js';

function renderAlsoLike(alsoLikeDOMNode, currentProduct) {
  alsoLikeDOMNode.innerHTML = `
    <div class="grid wide">
      <h3 class="prod-detail__also-like-heading">Có thể bạn sẽ thích</h3>

      <div class="row"></div>
    </div>
  `;

  const row = alsoLikeDOMNode.querySelector('.row');

  fetchData(API.getAlsoLikeProducts(currentProduct.category), (result) => {
    let products = result.products;
    console.log(products);
    shuffleArray(products);
    products = products.slice(0, 4);

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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { renderAlsoLike };
