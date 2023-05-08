import { request } from '../fetch.js';
import { API } from '../restful-api.js';
import { numberWithCommas } from '../utils.js';

function renderSearchContainer(headerDOMNode) {
  const searchContainerDOMElement = headerDOMNode.querySelector(
    '.header__search-container'
  );
  searchContainerDOMElement.innerHTML = `
    <div
      class="header__search-container-overlay"
      data-search-toggler
    ></div>

    <div class="header__search-container-main">
      <button
        class="header__search-container-close-btn"
        data-search-toggler
      >
        <i class="bi bi-x"></i>
      </button>

      <div class="header__search-input-wrapper">
        <input
          type="search"
          class="header__search-input"
          placeholder="Tìm kiếm sản phẩm..."
        />
        <span class="header__search-input-icon"><i class="bi bi-search"></i></span>
      </div>
      

      <ul class="header__search-type-list d-none">
        <li
          class="header__search-type-item header__search-type-item--active"
          data-search-type-toggler
        >
          Sản phẩm
        </li>
        <li
          class="header__search-type-item"
          data-search-type-toggler
        >
          Danh mục
        </li>
      </ul>





      <!--- Render search result here -->
      <ul class="header__search-result-list"></ul>





      <div class="header__search-result-loading">
        <ul class="header__search-type-list" style="display = 'none';">
          <li class="header__search-type-item">
            <div
              class="skeleton"
              style="width: 100px; height: 30px"
            ></div>
          </li>
          <li class="header__search-type-item">
            <div
              class="skeleton"
              style="width: 100px; height: 30px"
            ></div>
          </li>
        </ul>
        <ul class="header__search-result-list">
          <li class="header__search-result-item">
            <div class="skeleton" style="width: 100%; height: 96px"></div>
          </li>
          <li class="header__search-result-item">
            <div class="skeleton" style="height: 96px"></div>
          </li>
          <li class="header__search-result-item">
            <div class="skeleton" style="height: 96px"></div>
          </li>
          <li class="header__search-result-item">
            <div class="skeleton" style="height: 96px"></div>
          </li>
          <li class="header__search-result-item">
            <div class="skeleton" style="height: 96px"></div>
          </li>
        </ul>
      </div>
    </div>
  `;

  // Handle events
  handleSearchContainerEvents(headerDOMNode);
}

function handleSearchContainerEvents(headerDOMNode) {
  const searchTogglers = headerDOMNode.querySelectorAll(
    '[data-search-toggler]'
  );
  const searchContainer = headerDOMNode.querySelector(
    '.header__search-container'
  );

  searchTogglers.forEach((searchToggler) => {
    searchToggler.addEventListener('click', (e) => {
      searchContainer.classList.toggle('header__search-container--active');
    });
  });

  // Handle input searching
  const resultList = headerDOMNode.querySelector('.header__search-result-list');
  const searchInput = headerDOMNode.querySelector('.header__search-input');
  let prevTimeout = null;
  const DELAY_SEARCH_TIME = 500;
  searchInput.addEventListener('input', (e) => {
    searchInput.classList.remove('header__search-input--search-done');
    if (!e.target.value) {
      searchInput.classList.remove('header__search-input--searching');
      searchInput.classList.remove('header__search-input--search-done');
      if (prevTimeout) clearTimeout(prevTimeout);
      return;
    } else {
      searchInput.classList.add('header__search-input--searching');
    }

    if (prevTimeout) clearTimeout(prevTimeout);
    prevTimeout = setTimeout(() => {
      // TODO: implement fetch data (implement data for each search type)
      // If there is no product => Display text
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          search: searchInput.value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      };
      request(
        'http://localhost:8080/api/product/search-by-string',
        options,
        (products) => {
          resultList.innerHTML = `
          ${products
            .map((product) => {
              return `
              <li class="header__search-result-item">
                <a href="../../../product-detail.html?productId=${
                  product.id
                }" class="header__search-result-item-link">
                  <img
                    class="header__search-result-item-img"
                    src="${product.images[0]}"
                    alt="Product image"
                  />

                  <div
                    class="header__search-result-item-info header__search-result-item-info--price"
                  >
                    <h3 class="header__search-result-item-title">
                      ${product.name}
                    </h3>
                    <span class="header__search-result-item-price"
                      >${numberWithCommas(product.price)}đ</span
                    >
                    <span class="header__search-result-item-quantity"
                      >6 sản phẩm</span
                    >
                  </div>
                </a>
              </li>
            `;
            })
            .join('')}
        `;

          // Done fetch data => Update UI
          searchInput.classList.remove('header__search-input--searching');
          searchInput.classList.add('header__search-input--search-done');
        }
      );
    }, DELAY_SEARCH_TIME);
  });

  // Handle search type change
  const searchTypeTogglers = [
    ...headerDOMNode.querySelectorAll('[data-search-type-toggler]'),
  ];
  searchTypeTogglers.forEach((searchTypeToggler) => {
    searchTypeToggler.addEventListener('click', () => {
      if (
        !searchTypeToggler.classList.contains(
          'header__search-type-item--active'
        )
      ) {
        // Find the current search type active and remove active state
        searchTypeTogglers
          .find((searchTypeToggler) =>
            searchTypeToggler.classList.contains(
              'header__search-type-item--active'
            )
          )
          .classList.remove('header__search-type-item--active');

        // Enabel active state of the just clicked type
        searchTypeToggler.classList.add('header__search-type-item--active');
        var event = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        searchInput.dispatchEvent(event);
      }
    });
  });

  // Handle search icon click
  const searchIcon = headerDOMNode.querySelector('.header__search-input-icon');
  searchIcon.addEventListener('click', () => {
    triggerSearch(headerDOMNode);
  });
}

/**
 * Search icon triggers searching for products
 * @param {*} headerDOMNode
 * @returns
 */
function triggerSearch(headerDOMNode) {
  const resultList = headerDOMNode.querySelector('.header__search-result-list');
  const searchInput = headerDOMNode.querySelector('.header__search-input');

  searchInput.classList.remove('header__search-input--search-done');
  if (!searchInput.value) {
    searchInput.classList.remove('header__search-input--searching');
    searchInput.classList.remove('header__search-input--search-done');
    return;
  } else {
    searchInput.classList.add('header__search-input--searching');
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify({
      search: searchInput.value,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  };
  request(
    'http://localhost:8080/api/product/search-by-string',
    options,
    (products) => {
      resultList.innerHTML = `
          ${products
            .map((product) => {
              return `
              <li class="header__search-result-item">
                <a href="../../../product-detail.html?productId=${
                  product.id
                }" class="header__search-result-item-link">
                  <img
                    class="header__search-result-item-img"
                    src="${product.images[0]}"
                    alt="Product image"
                  />

                  <div
                    class="header__search-result-item-info header__search-result-item-info--price"
                  >
                    <h3 class="header__search-result-item-title">
                      ${product.name}
                    </h3>
                    <span class="header__search-result-item-price"
                      >${numberWithCommas(product.price)}đ</span
                    >
                    <span class="header__search-result-item-quantity"
                      >6 sản phẩm</span
                    >
                  </div>
                </a>
              </li>
            `;
            })
            .join('')}
        `;

      // Done fetch data => Update UI
      setTimeout(() => {
        searchInput.classList.remove('header__search-input--searching');
        searchInput.classList.add('header__search-input--search-done');
      }, 300);
    }
  );
}

export { renderSearchContainer };
