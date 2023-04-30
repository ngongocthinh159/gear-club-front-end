function renderNavList(headerDOMNode) {
  const navListDOMNode = headerDOMNode.querySelector(
    '.header__nav-container'
  );
  navListDOMNode.innerHTML = `
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
            <a href="./contact.html" class="header__nav-item-link">Liên hệ</a>
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
                src="./assets/imgs/home/mock-product.webp"
                alt=""
                class="header__nav-item-img"
              />
              Bundle cho chuột
            </a>
          </li>

          <li class="header__nav-item">
            <a href="" class="header__nav-item-link">
              <img
                src="./assets/imgs/home/mock-product.webp"
                alt=""
                class="header__nav-item-img"
              />
              Bundle cho chuột
            </a>
          </li>
        </ul>
      </div>
    </div>
  `;

  // Handle events
  handleMainNavEvents(headerDOMNode);
}

function handleMainNavEvents(headerDOMNode) {
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

  // When windows resize from tablet -> PC, remove active of pannel 1
  let prevWidth = Number.POSITIVE_INFINITY;
  window.addEventListener('resize', (e) => {
    if (prevWidth < 1023 && window.innerWidth >= 1023) {
      pannel1.classList.remove('header__nav-pannel--active');
    }

    prevWidth = window.innerWidth;
  });
}

export { renderNavList };
