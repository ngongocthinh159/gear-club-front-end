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

      <input
        type="search"
        class="header__search-input"
        placeholder="Tìm kiếm sản phẩm..."
      />

      <div class="header__search-result-wrapper">
        <ul class="header__search-type-list">
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
        <ul class="header__search-result-list">
          <li class="header__search-result-item">
            <a href="" class="header__search-result-item-link">
              <img
                class="header__search-result-item-img"
                src="./assets/imgs/home/mock-product.webp"
                alt=""
              />

              <div
                class="header__search-result-item-info header__search-result-item-info--price"
              >
                <h3 class="header__search-result-item-title">
                  Chuột không dây siêu nhẹ Lamzu Atlantis Mini
                </h3>
                <span class="header__search-result-item-price"
                  >2.499.999đ</span
                >
                <span class="header__search-result-item-quantity"
                  >6 sản phẩm</span
                >
              </div>
            </a>
          </li>
          <li class="header__search-result-item">
            <a href="" class="header__search-result-item-link">
              <img
                class="header__search-result-item-img"
                src="./assets/imgs/home/mock-product.webp"
                alt=""
              />

              <div
                class="header__search-result-item-info header__search-result-item-info--price"
              >
                <h3 class="header__search-result-item-title">
                  Chuột không dây siêu nhẹ Lamzu Atlantis Mini
                </h3>
                <span class="header__search-result-item-price"
                  >2.499.999đ</span
                >
                <span class="header__search-result-item-quantity"
                  >6 sản phẩm</span
                >
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div class="header__search-result-loading">
        <ul class="header__search-type-list">
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
  const searchInput = headerDOMNode.querySelector(
    '.header__search-input'
  );
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

      searchInput.classList.remove('header__search-input--searching');
      searchInput.classList.add('header__search-input--search-done');
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
}

export { renderSearchContainer };
