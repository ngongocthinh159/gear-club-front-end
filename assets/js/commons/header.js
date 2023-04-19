function handleHeaderEvents(headerDOMNode) {
  // Handle UI toggle
  const pannel1Togglers = headerDOMNode.querySelectorAll(
    '[data-pannel-1-toggler]'
  );
  const pannel2Togglers = headerDOMNode.querySelectorAll(
    '[data-pannel-2-toggler]'
  );
  const pannel3Openers = headerDOMNode.querySelectorAll(
    '[data-pannel-3-opener]'
  );
  const pannel3Closers = headerDOMNode.querySelectorAll(
    '[data-pannel-3-closer]'
  );
  const allPannelsCloseBtn = headerDOMNode.querySelector(
    '[data-all-pannels-close]'
  );
  const navContainerOverlay = headerDOMNode.querySelector(
    '.header__nav-container-overlay'
  );
  const pannel1 = headerDOMNode.querySelector('#nav-pannel-1');
  const pannel2 = headerDOMNode.querySelector('#nav-pannel-2');
  const pannel3 = headerDOMNode.querySelector('#nav-pannel-3');
  const searchTogglers = headerDOMNode.querySelectorAll(
    '[data-search-toggler]'
  );
  const searchContainer = headerDOMNode.querySelector(
    '.header__search-container'
  );
  pannel1Togglers.forEach((pannel1Toggler) => {
    pannel1Toggler.addEventListener('click', () => {
      pannel1.classList.toggle('header__nav-pannel--active');
    });
  });

  pannel2Togglers.forEach((pannel2Toggler) => {
    pannel2Toggler.addEventListener('click', () => {
      pannel2.classList.toggle('header__nav-pannel--active');
    });
  });

  pannel3Openers.forEach((pannel3Opener) => {
    pannel3Opener.addEventListener('click', () => {
      if (!pannel3.classList.contains('header__nav-pannel--active')) {
        pannel3.classList.add('header__nav-pannel--active');

        // TODO: Rerender the content inside pannel 3
      }
    });
  });

  pannel3Closers.forEach((pannel3Closer) => {
    pannel3Closer.addEventListener('click', (e) => {
      pannel3.classList.remove('header__nav-pannel--active');
    });
  });

  allPannelsCloseBtn.addEventListener('click', () => {
    pannel1.classList.remove('header__nav-pannel--active');
    pannel2.classList.remove('header__nav-pannel--active');
    pannel3.classList.remove('header__nav-pannel--active');
  });

  navContainerOverlay.addEventListener('click', () => {
    allPannelsCloseBtn.click();
  });

  searchTogglers.forEach((searchToggler) => {
    searchToggler.addEventListener('click', (e) => {
      searchContainer.classList.toggle('header__search-container--active');
    });
  });

  // When windows resize from tablet -> PC, remove active of pannel 1
  let prevWidth = Number.POSITIVE_INFINITY;
  window.addEventListener('resize', (e) => {
    if (prevWidth < 1023 && window.innerWidth >= 1023) {
      pannel1.classList.remove('header__nav-pannel--active');
    }

    prevWidth = window.innerWidth;
  });

  // Handle input searching
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

/**
 * Create a <header class="header"></header> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleHeaderEvents() to handle all related events
 * @param {DOM Element} headerDOMNode
 */
function renderHeader(headerDOMNode) {
  // Update DOM
  headerDOMNode.innerHTML = `
    <div class="grid wide">
        <div class="header-wrapper">
          <button class="header__burger-btn" data-pannel-1-toggler>
            <i class="bi bi-list"></i>
          </button>

          <a href="./index.html" class="header__logo-link">
            <img
              src="./assets/imgs/logo.avif"
              alt="Gear Club logo"
              class="header__logo-img"
            />
          </a>

          <div class="header__nav-container">
            <div class="header__nav-container-overlay"></div>

            <div class="header__nav-header">
              <button class="header__nav-close-btn" data-all-pannels-close>
                <i class="bi bi-x"></i>
              </button>
            </div>

            <div class="header__nav-body">
              <div id="nav-pannel-1" class="header__nav-pannel">
                <ul class="header__nav-list">
                  <li class="header__nav-item header__nav-item--hide-on-pc">
                    <a href="" class="header__nav-item-link">Tài khoản</a>
                  </li>
                  <li class="header__nav-item" data-pannel-2-toggler>
                    Sản phẩm<i
                      class="header__nav-item-icon-down-chevon bi bi-chevron-down"
                    ></i
                    ><i
                      class="header__nav-item-icon-right-chevon bi bi-chevron-right"
                    ></i>
                  </li>
                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">Dịch vụ</a>
                  </li>
                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">Tin tức</a>
                  </li>
                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">Tích điểm</a>
                  </li>
                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">Liên hệ</a>
                  </li>
                </ul>
              </div>

              <div id="nav-pannel-2" class="header__nav-pannel">
                <ul class="header__nav-list">
                  <button class="header__nav-back-btn" data-pannel-2-toggler>
                    <i class="header__nav-back-btn-icon bi bi-chevron-left"></i
                    >Sản phẩm
                  </button>

                  <li class="header__nav-item" data-pannel-3-opener>
                    Bundle<i
                      class="header__nav-item-icon-right-chevon bi bi-chevron-right"
                    ></i>
                  </li>
                  <li class="header__nav-item" data-pannel-3-opener>
                    Chuột<i
                      class="header__nav-item-icon-right-chevon bi bi-chevron-right"
                    ></i>
                  </li>
                  <li class="header__nav-item" data-pannel-3-opener>
                    Bàn phím cơ<i
                      class="header__nav-item-icon-right-chevon bi bi-chevron-right"
                    ></i>
                  </li>
                  <li class="header__nav-item" data-pannel-3-opener>
                    Lót chuột<i
                      class="header__nav-item-icon-right-chevon bi bi-chevron-right"
                    ></i>
                  </li>
                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">Tai nghe</a>
                  </li>
                </ul>
              </div>

              <div id="nav-pannel-3" class="header__nav-pannel">
                <ul class="header__nav-list">
                  <button class="header__nav-back-btn" data-pannel-3-closer>
                    <i class="header__nav-back-btn-icon bi bi-chevron-left"></i
                    >Bundle
                  </button>

                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">
                      <img
                        src="./assets/imgs/home/item-img-header-mock.avif"
                        alt=""
                        class="header__nav-item-img"
                      />
                      Bundle cho chuột
                    </a>
                  </li>

                  <li class="header__nav-item">
                    <a href="" class="header__nav-item-link">
                      <img
                        src="./assets/imgs/home/item-img-header-mock.avif"
                        alt=""
                        class="header__nav-item-img"
                      />
                      Bundle cho chuột
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ul class="header__side-nav-list">
            <li class="header__side-nav-item" data-search-toggler>
              <i class="fa-solid fa-magnifying-glass"></i>
            </li>
            <li class="header__side-nav-item">
              <a href="" class="header__side-nav-link"
                ><i class="fa-regular fa-user"></i
              ></a>
            </li>
            <li class="header__side-nav-item">
              <a href="" class="header__side-nav-link"
                ><i class="header__side-nav-icon bi bi-bag-heart"></i
              ></a>
            </li>

            <div class="header__search-container">
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
                          src="./assets/imgs/home/item-img-header-mock.avif"
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
                          src="./assets/imgs/home/item-img-header-mock.avif"
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
                        style="width: 100px; height: 40px"
                      ></div>
                    </li>
                    <li class="header__search-type-item">
                      <div
                        class="skeleton"
                        style="width: 100px; height: 40px"
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
            </div>
          </ul>
        </div>
      </div>
  `;

  // Handle event
  handleHeaderEvents(headerDOMNode);
}

export { renderHeader };
