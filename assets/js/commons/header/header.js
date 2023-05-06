import { renderNavList } from './header-nav-list.js';
import { renderSearchContainer } from './header-search-container.js';
import { renderCartContainer } from './header-cart-container.js';

/**
 * Create a <header class="header"></header> DOM element inside HTML,
 * then pass this DOM element into this function to render header
 * This function also call handleHeaderEvents() to handle all related events
 * @param {DOM Element} headerDOMNode
 * @param {boolean} isTransparentTop true if the header background color is transparent at TOP
 */
function renderHeader(headerDOMNode, isTransparentTop = false) {
  // Frame of header DOM
  headerDOMNode.innerHTML = `
    <div class="grid wide">
      <div class="header-wrapper">
        <button class="header__burger-btn" data-pannel-1-toggler>
          <i class="bi bi-list"></i>
        </button>

        <a href="./index.html" class="header__logo-link">
          <img
            src="./assets/imgs/logo.png"
            alt="Gear Club logo"
            class="header__logo-img"
          />
        </a>



        <!--- Render center nav -->
        <div class="header__nav-container"></div>



        <!--- Render side nav -->
        <ul class="header__side-nav-list">
          <li class="header__side-nav-item" data-search-toggler>
            <i class="fa-solid fa-magnifying-glass"></i>
          </li>

          <li class="header__side-nav-item">
            <a href="/account.html" class="header__side-nav-link"
              ><i class="fa-regular fa-user"></i
            ></a>
          </li>

          <li class="header__side-nav-item" data-cart-toggler>
            <a class="header__side-nav-link"
              ><i class="header__side-nav-icon bi bi-bag-heart"></i
            ></a>
          </li>


          <!--- Render search container -->
          <div class="header__search-container"></div>


          <!--- Render cart container -->
          <div class="header__cart-container-wrapper"></div>
        </ul>
      </div>
    </div>
  `;

  // // Render main nav list
  // renderNavList(headerDOMNode);

  // // Render search container
  // renderSearchContainer(headerDOMNode);

  // // Render cart container
  renderCartContainer(headerDOMNode);

  // // Handle general events
  handleGeneralHeaderEvents(headerDOMNode, isTransparentTop);
}

function handleGeneralHeaderEvents(headerDOMNode, isTransparentTop = false) {
  // Handle scroll top to change color of header (isTransparentTop = true)
  // Creating sticky header logic with js
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 48 /* Sub-header height */) {
      headerDOMNode.style.backgroundColor = 'rgb(39, 39, 39)';
      headerDOMNode.style.boxShadow =
        'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px';
      headerDOMNode.style.top = `0px`;
    } else {
      if (isTransparentTop) headerDOMNode.style.backgroundColor = 'transparent';
      headerDOMNode.style.boxShadow = 'none';
      headerDOMNode.style.top = `${48 - window.scrollY}px`;
    }
  });
}

export { renderHeader };
