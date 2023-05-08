import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getProductCardFactory } from '../commons/product-card-factory.js';

function handleSectionUnderTopEvents(underTopDOMNode) {}

/**
 * Create a <section class="under-top"></section> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleSectionUnderTopEvents() to handle all related events
 * @param {DOM Element} underTopDOMNode
 */
function renderSectionUnderTop(underTopDOMNode) {
  underTopDOMNode.innerHTML = `
    <div class="grid wide">
      <ul class="under-top__category-list">
        <div class="row">
          <div class="col l-3 m-4 c-6">
            <li class="under-top__category-item">
              <a
                href="./collections.html?categories=keyboard"
                class="under-top__category-item-link"
              >
                <img
                  class="under-top__category-item-img"
                  src="./assets/imgs/home/under-top-category-1.png"
                  alt="Product category"
                />
                <p class="under-top__category-name">Bàn phím cơ</p>
              </a>
            </li>
          </div>

          <div class="col l-3 m-4 c-6">
            <li class="under-top__category-item">
              <a
                href="./collections.html?categories=mouse"
                class="under-top__category-item-link"
              >
                <img
                  class="under-top__category-item-img"
                  src="./assets/imgs/home/under-top-category-2.png"
                  alt="Product category"
                />
                <p class="under-top__category-name">Chuột</p>
              </a>
            </li>
          </div>
          <div class="col l-3 m-4 c-6">
            <li class="under-top__category-item">
              <a
                href="./collections.html?categories=pad"
                class="under-top__category-item-link"
              >
                <img
                  class="under-top__category-item-img"
                  src="./assets/imgs/home/under-top-category-3.png"
                  alt="Product category"
                />
                <p class="under-top__category-name">Lót chuột</p>
              </a>
            </li>
          </div>
          <div class="col l-3 m-4 c-6">
            <li class="under-top__category-item">
              <a href="../../../collections.html" class="under-top__category-item-link">
                <img
                  class="under-top__category-item-img"
                  src="./assets/imgs/home/under-top-category-4.png"
                  alt="Product category"
                />
                <p class="under-top__category-name">Tất cả sản phẩm</p>
              </a>
            </li>
          </div>
        </div>
      </ul>

      <div class="under-top__brand-container">
        <h3 class="under-top__brand-heading">Các thương hiệu phân phối</h3>

        <ul class="under-top__brand-list">
          <div class="row">
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=filco"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-1.png"
                    alt="Brand 1"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=finalmouse"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-2.png"
                    alt="Brand 2"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=realforce"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-3.png"
                    alt="Brand 3"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=lamzu"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-4.png"
                    alt="Brand 4"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=pulsar"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-5.png"
                    alt="Brand 5"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=ninjutso"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-6.png"
                    alt="Brand 6"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=glorious"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-7.png"
                    alt="Brand 7"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=lethal"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-8.png"
                    alt="Brand 8"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=skypad"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-9.png"
                    alt="Brand 9"
                /></a>
              </li>
            </div>
            <div class="col l-2-4 m-4 c-6">
              <li class="under-top__brand-item">
                <a
                  href="./collections.html?brands=razer"
                  class="under-top__brand-item-link"
                  ><img
                    class="under-top__brand-item-img"
                    src="./assets/imgs/home/under-top-brand-10.png"
                    alt="Brand 10"
                /></a>
              </li>
            </div>
          </div>
        </ul>
      </div>

      <div class="under-top__hot-products-container">
        <div class="under-top__hot-products-heading-wrapper">
          <h3 class="under-top__hot-products-heading">
            Sản phẩm ngẫu nhiên
          </h3>

          <a
            href="./collections.html"
            class="under-top__hot-products-view-more-btn"
          >
            Tất cả sản phẩm<i class="bi bi-chevron-right"></i>
          </a>
        </div>

        <ul class="under-top__hot-list">
          <div class="row"></div>
        </ul>
      </div>
    </div>
  `;

  // Handle events
  handleSectionUnderTopEvents(underTopDOMNode);

  // Fetch random list
  const row = underTopDOMNode.querySelector('.under-top__hot-list .row');
  fetchData(API.getAllProductAPI(), (products) => {
    shuffleArray(products);
    products = products.slice(0, 5);

    products.forEach((product) => {
      const col = document.createElement('div');
      col.className = 'col l-2-4 m-4 c-6';

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

export { renderSectionUnderTop };
